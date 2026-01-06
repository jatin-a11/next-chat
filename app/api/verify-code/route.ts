import { connectDB } from "@/lib/db/db";
import UserModel from "@/lib/model/User";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const { username, code } = await request.json();
    const decodedUsername = decodeURIComponent(username);

    // Aapke model mein 'userName' hai (Capital N), isliye yahan wahi use kiya hai
    const user = await UserModel.findOne({ userName: decodedUsername });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Code aur Expiry check
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();

      return Response.json(
        { success: true, message: "Account verified successfully" },
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
      return Response.json(
        { success: false, message: "Verification code expired. Please sign up again." },
        { status: 400 }
      );
    } else {
      return Response.json(
        { success: false, message: "Incorrect verification code" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying user", error);
    return Response.json(
      { success: false, message: "Error verifying user" },
      { status: 500 }
    );
  }
}
