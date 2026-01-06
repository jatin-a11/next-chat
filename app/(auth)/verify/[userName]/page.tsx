"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const verifySchema = z.object({
  code: z.string().length(6, 'Verification code must be 6 characters'),
});

export default function VerifyAccount() {
  const router = useRouter();
  
  // Yahan params ka type folder name se match hona chahiye [userName]
  const params = useParams<{ userName: string }>();

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "", // Controlled input error fix karne ke liye
    },
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      // URL decode zaroori hai agar username mein special characters hon
      const response = await axios.post(`/api/verify-code`, {
        username: params.userName, 
        code: data.code,
      });

      alert("Account verified successfully!");
      router.replace("/sign-in");
    } catch (error) {
      alert("Invalid code or error verifying account.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold mb-6">Verify Your Account</h1>
          <p className="mb-4 text-gray-600">
            Enter the code for <span className="font-bold">{params.userName}</span>
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input placeholder="123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}