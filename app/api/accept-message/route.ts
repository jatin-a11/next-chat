import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import { connectDB } from "@/lib/db/db";
import UserModel from "@/lib/model/User";

export async function GET(request: Request) { // Request parameter add kiya
  await connectDB();
  
  // Next.js mein session nikalne ka sahi tareeka
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await UserModel.findById(session.user._id);
    
    if (!user) {
      return Response.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return Response.json({ 
      success: true, 
      isAcceptingMessage: user.isAcceptingMessage // ensure field name matches model
    }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false, message: "Error fetching status" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await connectDB();
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { acceptMessages } = await request.json();
    
    const updatedUser = await UserModel.findByIdAndUpdate(
      session.user._id,
      { isAcceptingMessage: acceptMessages },
      { new: true }
    );

    return Response.json({
      success: true,
      message: "Status updated successfully",
      isAcceptingMessage: updatedUser?.isAcceptingMessage
    }, { status: 200 });
  } catch (error) {
    return Response.json({ success: false, message: "Error updating status" }, { status: 500 });
  }
}



