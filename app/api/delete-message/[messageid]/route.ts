import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option"; // Path check karein
import { connectDB } from "@/lib/db/db";
import UserModel from "@/lib/model/User";
import mongoose from "mongoose";

export async function DELETE(
  request: Request,
  { params }: { params: { messageid: string } }
) {
  const messageId = params.messageid;
  await connectDB();

  // 1. Session se user nikalna zaruri hai
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session || !user) {
    return Response.json(
      { success: false, message: "Not Authenticated" },
      { status: 401 }
    );
  }

  try {
    // 2. Database update logic
    const updateResult = await UserModel.updateOne(
      { _id: user._id }, 
      { 
        $pull: { 
          messages: { _id: new mongoose.Types.ObjectId(messageId)} // Dhyan dein: Yahan '_id' hi likhna hai, 'id' nahi
        } 
      }
    );

    // 3. Agar database mein koi badlav nahi hua
    if (updateResult.modifiedCount === 0) {
      return Response.json(
        { success: false, message: "Message not found or already deleted" },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, message: "Message permanently deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete Error:", error);
    return Response.json(
      { success: false, message: "Error deleting message" },
      { status: 500 }
    );
  }
}