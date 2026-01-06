'use client'

import React from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import { Message } from '@/lib/model/User';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface MessageCardProps {
  message: Message;
  onMessageDelete: (messageId: string) => void;
}

export default function MessageCard({ message, onMessageDelete }: MessageCardProps) {
  
  const handleDeleteConfirm = async () => {
    try {
      // Backend API ko call karein
      await axios.delete(`/api/delete-message/${message._id}`);
      onMessageDelete(message._id as string);
    } catch (error) {
      alert("Error deleting message");
    }
  };

  return (
    <Card className="relative border-2 shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="text-base font-medium break-words">
            {message.content}
          </CardTitle>

          {/* Delete Popup (Alert Dialog) */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant='destructive' size="icon" className="h-8 w-8 shrink-0">
                <X className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  message from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="text-[10px] text-muted-foreground mt-2">
          {new Date(message.createdAt).toLocaleString()}
        </div>
      </CardHeader>
    </Card>
  );
}