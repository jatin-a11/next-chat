"use client";
import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './button'; // Path check karein

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="p-4 md:p-6 shadow-md bg-white border-b flex justify-between items-center text-black">
      <Link href="/" className="text-xl font-bold">
        Secret Message
      </Link>
      
      <div>
        {session ? (
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-sm">
              Welcome, {session.user?.userName || session.user?.email}
            </span>
            <Button variant="destructive" onClick={() => signOut()}>
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/sign-in">
            <Button className="bg-blue-600 hover:bg-blue-700">Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}