import { NextRequest, NextResponse } from 'next/server';
import { createGroq } from '@ai-sdk/groq';
import { generateText } from 'ai';

// 1. Check if Key exists
const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  console.error("CRITICAL: GROQ_API_KEY is missing in .env.local");
}

const groq = createGroq({
  apiKey: apiKey || '',
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!apiKey) {
      return NextResponse.json(
        { error: "Server Error: API Key not configured. Check your .env.local file." },
        { status: 500 }
      );
    }

    console.log("Received chat request...");

    const { text } = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      messages: [
        { 
          role: 'system', 
          content: `You are a world-class Interview Coach for ANY industry (Tech, Sales, Marketing, Design, HR, etc.).

          YOUR GOAL:
          Help the user master their interviews through simulation and feedback.

          RULES:
          1. If the user hasn't specified a topic (e.g., "Software Engineering"), ask them: "What type of role or topic are you interviewing for today?"
          2. Once the topic is set, simulate the interviewer for that specific field.
          3. Ask realistic questions for that field.
          4. AFTER every answer, provide constructive feedback:
             - "Good: [what they did well]"
             - "Improvement: [what was weak]"
             - "Next Question: [move the interview forward]"

          TONE:
          - Professional, adaptive, and direct.
          - Do NOT be overly technical unless they are interviewing for a technical role.
          - Do NOT assume they are a programmer.`
        },
        ...messages
      ],
    });


    return NextResponse.json({ reply: text });

  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Unknown server error" },
      { status: 500 }
    );
  }
}