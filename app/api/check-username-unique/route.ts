import {z} from 'zod'
import { usernameValidation } from '@/lib/schemas/signUpSchema'
import { NextRequest } from 'next/server';
import UserModel from '@/lib/model/User';
import { connectDB } from '@/lib/db/db';

// Zod schema for query param
const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request:NextRequest){


  await connectDB()

  try {
    //  1. Url se username uth aayenge
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get('username'),
    };

    // 2. Zod se validate karna
    const result = UsernameQuerySchema.safeParse(queryParam);

    if (!result.success){
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json({
        success: false,
        message: usernameErrors.length > 0 ? usernameErrors.join(', ') : 'Invalid query parameters',
      }, { status: 400 });
    }

    const { username } = result.data;

    // 3. Database mein check karna
    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return Response.json({
        success: false,
        message: 'Username is already taken',
      }, { status: 400 });
    }

    return Response.json({
      success: true,
      message: 'Username is unique',
    }, { status: 200 });


  } catch (error) {
    console.error("Error checking username", error);
    return Response.json({
      success: false,
      message: "Error checking username",
    }, { status: 500 });
  }
}