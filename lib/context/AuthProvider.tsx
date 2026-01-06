// lib/AuthProvider.tsx mein ye code hona chahiye
'use client'

import { SessionProvider } from "next-auth/react"

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}