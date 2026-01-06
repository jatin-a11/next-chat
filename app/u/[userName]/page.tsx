"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
// Sahi tareeka:
// import { useCompletion } from "ai/react"; 
import { useCompletion } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";

export default function PublicMessagePage() {
  const params = useParams<{ userName: string }>();
  const userName = params.userName;

  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 2. AI SDK Implementation
  const { completion, complete, isLoading: isSuggesting } = useCompletion({
    api: "/api/suggest-messages",
    initialCompletion: "What is your dream job?||What is your hidden talent?||Where do you see yourself in 5 years?",
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return alert("Message cannot be empty");

    setIsLoading(true);
    try {
      const response = await axios.post("/api/send-message", {
        userName,
        content,
      });
      alert("Message sent successfully!");
      setContent("");
    } catch (error: any) {
      alert("Error: " + (error.response?.data?.message || "Failed to send"));
    } finally {
      setIsLoading(false);
    }
  };

  // 3. AI suggestion par click karne ka function
  const handleSuggestionClick = (message: string) => {
    setContent(message);
  };

  return (
    <div className="container mx-auto my-8 p-6 max-w-4xl flex flex-col items-center">
      <Card className="w-full max-w-md shadow-lg border-2">
        <CardHeader className="text-xl font-bold text-center">
          Send Anonymous Message to @{userName}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSendMessage} className="space-y-4">
            <Textarea
              placeholder="Write your secret message..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="resize-none border-gray-300 focus:border-black"
            />
            <Button type="submit" className="w-full" disabled={isLoading || !content}>
              {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
              {isLoading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Separator className="my-10 w-full max-w-2xl" />

      {/* 4. AI Suggestions Section */}
      <div className="w-full max-w-2xl space-y-4">
        <div className="flex flex-col items-center space-y-2">
          <Button 
            onClick={() => complete("")} 
            disabled={isSuggesting}
            variant="outline" 
            className="bg-blue-50 border-blue-200"
          >
            {isSuggesting ? "AI is thinking..." : "Suggest Messages by AI"}
          </Button>
          <p className="text-xs text-gray-500 italic">Click on any message below to select it.</p>
        </div>

        <Card className="border-dashed">
          <CardHeader className="py-3 px-4 font-semibold text-lg">AI Recommendations</CardHeader>
          <CardContent className="flex flex-col gap-3 p-4">
           {completion && completion.split("||").map((message: string, index: number) => (
           <Button
           key={index}
           variant="ghost"
           className="text-left h-auto py-3 px-4 border border-gray-100 hover:bg-gray-50 whitespace-normal block w-full text-sm"
           onClick={() => handleSuggestionClick(message)}
            >
           {message}
            </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}