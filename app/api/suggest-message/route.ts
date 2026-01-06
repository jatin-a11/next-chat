import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const result = await streamText({
      model: google('gemini-1.5-flash'), //
      prompt: "Create three short, engaging anonymous questions. Separate them with '||'.",
    });

    // Agar toDataStreamResponse error de raha hai, toh ye alternative use karein:
    return result.toTextStreamResponse(); 
  } catch (error) {
    return Response.json({ error: "Failed" }, { status: 500 });
  }
}