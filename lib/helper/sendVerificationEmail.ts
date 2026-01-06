import { resend } from "../resend";
import { verificationEmailTemplate } from "@/emails/verificationEmail";
import { ApiResponse } from "../types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
) : Promise<ApiResponse>{
  try {
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'verification Code',
      react: verificationEmailTemplate({ username, otp :verifyCode }),
    });
     return {success:true, message:`verification email send successfully`}
  } catch (Emailerror) {
    console.error("Error sending verification email:", Emailerror)
    return {success:false, message:`failed to send verification email`}
  }
}