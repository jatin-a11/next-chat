"use client";
import { useSession, signOut } from 'next-auth/react';
import { Button } from './button';

export default function Navbar() { // Naam 'Navbar' rakhein
  const { data: session } = useSession();
  
  return (
    <nav className="p-4 md:p-6 shadow-md bg-white border-b flex justify-between items-center">
      <h1 className="text-xl font-bold">Secret Message</h1>
      {session && (
        <Button variant="destructive" onClick={() => signOut()}>
          Logout
        </Button>
      )}
    </nav>
  );
}