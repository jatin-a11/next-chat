import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option"; // Path check karein
import { connectDB } from "@/lib/db/db";
import UserModel from "@/lib/model/User";
import mongoose from "mongoose";

export const revalidate = 0; // Ye caching ko disable kar dega

export async function GET() {
  await connectDB();
  const session = await getServerSession(authOptions);
  const user = session?.user;

  // Authentication check
  if (!session || !user) {
    return Response.json({ success: false, message: "Not Authenticated" }, { status: 401 });
  }

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    // Messages fetch karne ke liye aggregation use karein
    const foundUser = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } }
    ]);

    if (!foundUser || foundUser.length === 0) {
      return Response.json({ success: true, messages: [] }, { status: 200 });
    }

    return Response.json(
      { success: true, messages: foundUser[0].messages }, 
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { success: false, message: "Error fetching messages" }, 
      { status: 500 }
    );
  }
}