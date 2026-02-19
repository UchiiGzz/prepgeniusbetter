import { NextRequest, NextResponse } from 'next/server';
import { createGroq } from '@ai-sdk/groq';
import { generateText } from 'ai';

const apiKey = process.env.GROQ_API_KEY;

const groq = createGroq({
  apiKey: apiKey || '',
});

export async function POST(req: NextRequest) {
  try {
    // 1. Destructure config from the request body
    const { messages, config } = await req.json();
    const { type, level } = config || { type: 'General', level: 'Mid-Level' };

    if (!apiKey) {
      return NextResponse.json({ error: "API Key missing" }, { status: 500 });
    }

    // 2. Construct the System Prompt dynamically
    const systemPrompt = `You are an expert Interview Coach.

    INTERVIEW CONTEXT:
    - Role Level: ${level}
    - Focus Area: ${type}

    RULES:
    1. You must ask questions appropriate for a ${level} level ${type} role.
    2. Do not start with "Hello, how can I help?". Jump straight into the interview simulation.
    3. After the user answers, provide brief, constructive feedback (1-2 sentences).
    4. Then, ask the next follow-up question immediately.

    TONE:
    - Be professional and concise.
    - Treat this as a real simulation, not a chat.`;

    const { text } = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
    });

    return NextResponse.json({ reply: text });

  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: error.message || "Unknown server error" }, { status: 500 });
  }
}