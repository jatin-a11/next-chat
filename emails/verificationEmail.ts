
type VerificationEmailProps = {
  username: string;
  otp: string;
};

export const verificationEmailTemplate = ({
  username,
  otp,
}: VerificationEmailProps) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Email Verification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          padding: 20px;
        }
        .container {
          max-width: 500px;
          background: #ffffff;
          margin: auto;
          padding: 20px;
          border-radius: 8px;
        }
        .otp {
          font-size: 24px;
          font-weight: bold;
          letter-spacing: 4px;
          color: #2563eb;
          text-align: center;
          margin: 20px 0;
        }
        .footer {
          font-size: 12px;
          color: #777;
          margin-top: 20px;
          text-align: center;
        }
      </style>
    </head>

    <body>
      <div class="container">
        <h2>Hello ${username},</h2>

        <p>
          Thank you for signing up. Please use the OTP below to verify your email
          address:
        </p>

        <div class="otp">${otp}</div>

        <p>
          This OTP is valid for <strong>10 minutes</strong>.  
          Do not share this code with anyone.
        </p>

        <p>
          If you did not create an account, you can safely ignore this email.
        </p>

        <div class="footer">
          © ${new Date().getFullYear()} Your App Name
        </div>
      </div>
    </body>
  </html>
  `;
};
