import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Check karein agar shadcn use kar rahe hain

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900 text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex-col text-center">
        <h1 className="text-6xl font-bold mb-8">
          Welcome to <span className="text-blue-500">Secret Message</span>
        </h1>
        <p className="text-xl mb-12 text-gray-400">
          Send anonymous messages to your friends and get AI-powered suggestions!
        </p>
        
        <div className="flex gap-4">
          <Link href="/sign-in">
            <Button className="px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700">
              Login Now
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button variant="outline" className="px-8 py-6 text-lg border-blue-600 text-blue-500">
              Create Account
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}