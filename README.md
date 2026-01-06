Secret Message - Anonymous Feedback Platform
Ek full-stack anonymous messaging platform jahan users bina apni identity reveal kiye feedback ya messages bhej sakte hain. Isme AI ka use karke unique questions suggest karne ka feature bhi hai.

 Key Features
Anonymous Messaging: Har user ka ek unique profile link hota hai jahan koi bhi bina login kiye message bhej sakta hai.

AI-Powered Suggestions: Google Gemini API ka use karke intelligent aur engaging questions suggest karne ka feature.

User Dashboard: Ek secure area jahan users apne messages dekh sakte hain, delete kar sakte hain aur apna status manage kar sakte hain.

Message Control Toggle: Users control kar sakte hain ki wo messages receive karna chahte hain ya nahi.

Secure Auth: NextAuth (JWT) ka use karke secure login aur session management.

🛠️ Tech Stack
Framework: Next.js 15 (App Router)

Language: TypeScript

Database: MongoDB with Mongoose

Authentication: NextAuth.js

AI Integration: Vercel AI SDK & Google Gemini AI

Styling: Tailwind CSS & Shadcn UI

🚀 Getting Started
1. Repository Clone Karein
Bash

git clone https://github.com/your-username/secret-message.git
cd secret-message
2. Dependencies Install Karein
Bash

npm install
3. Environment Variables (.env)
Ek .env file banayein aur niche di gayi details bharein:

Code snippet

MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
4. Development Server Start Karein
Bash

npm run dev
Ab aapka project http://localhost:3000 par chalne lagega!

📂 Project Structure
/app/api: Saari backend API routes (delete-message, accept-message, etc.)

/components: Reusable UI components jaise Navbar aur MessageCard.

/lib: Database connection aur Mongoose models.

Bhai, aapka project ab ready hai! Kya aap chahte hain main isme deploy karne ka tarika (Vercel par) bhi add kar doon?