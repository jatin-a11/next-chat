Secret Message - AI-Powered Anonymous Feedback System
Welcome to the Secret Message platform! Ye project users ko anonymous messages receive karne aur AI ki madad se naye questions suggest karne ki facility deta hai. Isme secure dashboard aur real-time message management features hain.

🚀 Features
AI-Powered Message Suggestions: Google Gemini API ka use karke users ke liye intelligent aur engaging sawal suggest karna.

Anonymous Messaging: Bina identity reveal kiye kisi bhi user ko unke unique link par message bhejne ki suvidha.

Secure User Dashboard: NextAuth (JWT) se protected dashboard jahan users apne messages manage kar sakte hain.

Message Control Toggle: Ek click mein messages receive karna ON ya OFF karne ka feature.

Permanent Deletion: MongoDB $pull operator ka use karke secure tarike se messages ko database se delete karna.

🛠️ Tech Stack
Frontend & Backend: Next.js 15 (App Router)

Database: MongoDB with Mongoose

Authentication: NextAuth.js (JWT Strategy)

AI Integration: Google Gemini API via Vercel AI SDK

UI/UX: Tailwind CSS & Shadcn UI Components

📋 Prerequisites
Node.js (v18 or higher)

MongoDB Atlas Account

Google AI (Gemini) API Key

⚙️ Installation
Clone the Repository

Bash

git clone <your-repository-url>
cd secret-message
Install Dependencies

Bash

npm install
Environment Setup Root directory mein ek .env file banayein:

Code snippet

MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_nextauth_secret
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
NEXTAUTH_URL=http://localhost:3000
🚀 Running the Application
Bash

# Start the development server
npm run dev
Application ab http://localhost:3000 par run karegi.

📝 API Endpoints
Authentication
POST /api/auth/signin - User login

POST /api/sign-up - Register naya user

Dashboard Actions
GET /api/get-messages - User ke saare messages fetch karna

POST /api/accept-messages - Message receiving status update karna

DELETE /api/delete-message/[messageid] - Specific message delete karna

Public Actions
POST /api/send-message - Kisi user ko anonymous message bhejna

POST /api/suggest-messages - Gemini AI se suggestions lena

🔍 Troubleshooting
Middleware Redirects: Agar login ke baad dashboard nahi khul raha, toh middleware.ts mein token checking verify karein.

Module Not Found: Next.js case-sensitive hai, Navbar vs navbar import paths check karein.

MongoDB Error: Check karein ki IP Address MongoDB Atlas mein whitelisted hai ya nahi.
