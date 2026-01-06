import { NextRequest } from "next/server";
import { signUpSchema } from "@/lib/schemas/signUpSchema";
import UserModel from "@/lib/model/User";
import { connectDB } from "@/lib/db/db";
import bcryptjs from "bcryptjs";
import { sendVerificationEmail } from "@/lib/helper/sendVerificationEmail";


export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const body = signUpSchema.parse(await request.json());
    const { userName, email, password }:any = body;

    const existingUserByUsername = await UserModel.findOne({
      userName,
      isVerified: true,
    });

    if (existingUserByUsername) {
      return Response.json(
        { success: false, message: "Username already taken" },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 10);

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          { success: false, message: "Email already registered" },
          { status: 400 }
        );
      }

      // Update unverified user
      existingUserByEmail.password = await bcryptjs.hash(password, 10);
      existingUserByEmail.verifyCode = verifyCode;
      existingUserByEmail.verifyCodeExpiry = expiryDate;
      await existingUserByEmail.save();
    } else {
      // Create new user
      const newUser = new UserModel({
        userName,
        email,
        password: await bcryptjs.hash(password, 10),
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });

      await newUser.save();
    }

    const emailResponse = await sendVerificationEmail(
      userName,
      email,
      verifyCode
    );

    if (!emailResponse.success) {
      return Response.json(
        { success: false, message: emailResponse.message },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "User registered successfully. Please verify your email",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("User registration error:", error);
    return Response.json(
      { success: false, message: "Error registering user" },
      { status: 400 }
    );
  }
}
