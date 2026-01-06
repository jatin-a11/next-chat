"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useEffect, useState } from "react";
import { useDebounceValue } from 'usehooks-ts';
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";

// UI Components (Shadcn)
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

// Schemas aur Types
import { signUpSchema } from "@/lib/schemas/signUpSchema";
import { ApiResponse } from "@/lib/types/ApiResponse";

export default function SignUpPage() {
  const [userName, setUserName] = useState("");
  const [userNameMessage, setUserNameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [debouncedUserName] = useDebounceValue(userName, 500);;
  const router = useRouter();

  // 1. React Hook Form Setup
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  // 2. Real-time Username Check (Debounced)
  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (debouncedUserName) {
        setIsCheckingUsername(true);
        setUserNameMessage(""); // Purana message reset karein
        try {
          const response = await axios.get<ApiResponse>(
            `/api/check-username-unique?username=${debouncedUserName}`
          );
          setUserNameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUserNameMessage(
            axiosError.response?.data.message ?? "Error checking username"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [debouncedUserName]);

  // 3. Form Submission Logic
  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", data);
      
      // Toast ki jagah temporary alert
      alert(response.data.message || "Registration Successful!");

      // Redirect to verification page
      router.replace(`/verify/${userName}`);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message ?? "There was a problem with your signup.";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-gray-800">
            Join Mystery Message
          </h1>
          <p className="mb-4 text-gray-500">Sign up to start your anonymous adventure</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Username Field */}
            <FormField
              name="userName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john_doe"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setUserName(e.target.value);
                      }}
                      className="border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  {isCheckingUsername && <Loader2 className="animate-spin w-4 h-4 mt-1 text-blue-500" />}
                  {!isCheckingUsername && userNameMessage && (
                    <p className={`text-sm mt-1 font-medium ${userNameMessage === "Username is unique" ? "text-green-600" : "text-red-600"}`}>
                      {userNameMessage}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} className="border-gray-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-semibold">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} className="border-gray-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">
            Already a member?{' '}
            <a href="/sign-in" className="text-blue-600 hover:text-blue-800 font-bold">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}