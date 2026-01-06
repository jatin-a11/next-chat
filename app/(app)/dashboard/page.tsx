"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Message } from "@/lib/model/User";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Loader2, RefreshCcw } from "lucide-react";
import MessageCard from "@/components/ui/MessageCard";
import { useRouter } from "next/navigation"; // 1. Router import karein

export default function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [acceptMessages, setAcceptMessages] = useState(false);

  const { data: session, status } = useSession(); // 2. status bhi nikalen
  const router = useRouter();

  // 3. Security Check: Agar session nahi hai toh sign-in par bhejo
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status, router]);

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get("/api/accept-message");
      setAcceptMessages(response.data.isAcceptingMessage);
    } catch (error) {
      console.error("Error fetching status", error);
    } finally {
      setIsSwitchLoading(false);
    }
  }, []);

  const fetchMessages = useCallback(async (refresh: boolean = false) => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/get-messages");
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error("Error fetching messages", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessages();
    fetchAcceptMessage();
  }, [session, fetchAcceptMessage, fetchMessages]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post("/api/accept-message", {
        acceptMessages: !acceptMessages,
      });

      if (response.data.success) {
        setAcceptMessages(!acceptMessages);
      }
    } catch (error) {
      console.error("Toggle update failed", error);
      setAcceptMessages(acceptMessages);
    }
  };

  // 4. Loading state handling
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen gap-2">
        <Loader2 className="animate-spin" /> Loading...
      </div>
    );
  }

  // 5. Final guard: Agar unauthenticated hai toh kuch mat dikhao (router redirect handle karega)
  if (!session || !session.user) {
    return null;
  }

  const { userName } = session.user as any;
  const baseUrl = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : '';
  const profileUrl = `${baseUrl}/u/${userName}`;

  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl shadow-sm border">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">User Dashboard</h1>

      <div className="mb-6 bg-gray-50 p-4 rounded-lg border">
        <h2 className="text-sm font-semibold text-gray-500 mb-2 uppercase">Your Unique Link</h2>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={profileUrl}
            readOnly
            className="input input-bordered w-full p-2 bg-white border rounded text-sm outline-none"
          />
          <Button onClick={() => { navigator.clipboard.writeText(profileUrl); alert("Copied!"); }}>Copy</Button>
        </div>
      </div>

      <div className="mb-8 flex items-center space-x-3">
        <Switch
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />
        <span className="font-medium">
          Accept Messages: {acceptMessages ? "ON" : "OFF"}
        </span>
      </div>
      
      <Separator className="my-6" />

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Your Messages</h2>
        <Button
          variant="outline"
          size="icon"
          onClick={() => fetchMessages(true)}
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCcw className="h-4 w-4" />}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message) => (
            <MessageCard
              key={message._id as string}
              message={message}
              onMessageDelete={(id) => {
                setMessages(messages.filter((m) => m._id !== id));
              }}
            />
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-2 py-10 italic">No messages found.</p>
        )}
      </div>
    </div>
  );
}