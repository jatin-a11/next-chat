import { connectDB } from "@/lib/db/db";
import UserModel from "@/lib/model/User";

export async function POST(request: Request) {
  await connectDB();
  try {
    const { userName, content } = await request.json();

    // 1. User ko database mein dhoondein
    const user = await UserModel.findOne({ userName });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // 2. Check karein ki kya user messages accept kar raha hai
    if (!user.isAcceptingMessage) {
      return Response.json(
        { success: false, message: "User is not accepting messages" },
        { status: 403 }
      );
    }

    // 3. Pehle naya message object banayein
    const newMessage = { content, createdAt: new Date() };

    // 4. Phir use user ke messages array mein push karein
    user.messages.push(newMessage as any);
    
    // 5. Database mein save karein
    await user.save();

    return Response.json(
      { success: true, message: "Message sent successfully!" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in send-message API:", error); 
    return Response.json(
      { success: false, message: "Failed to send: " + error.message }, 
      { status: 500 }
    );
  }
}