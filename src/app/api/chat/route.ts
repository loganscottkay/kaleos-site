import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

const SYSTEM_PROMPT = `You are Logan Kay's AI assistant on the Kaleos website. Kaleos is a strategic AI implementation practice — not a generic automation agency.

Core thesis: AI doesn't fail because of the technology. It fails because of the implementation. Kaleos exists to bridge that gap.

What Kaleos does: We deploy AI systems designed around how a business actually operates. Every engagement starts with strategic assessment — mapping workflows, identifying where human judgment is essential vs where it's bottlenecking procedural work, and building a prioritized opportunity matrix. Then we build precision-scoped systems with human-in-the-loop controls, approval gates, and full audit trails.

Key differentiators: Strategy-first methodology (not tool-first). Single-outcome precision (one system, one KPI, measurable results). Absolute executive control (nothing executes without human approval). Every output logged, every action reviewable.

Engagement tiers: Assessment ($5,000+, one-time deep operational analysis), Implementation (starting at $6,500/month, 3-month minimum, hands-on system builds), Strategic Partner (starting at $15,000/month, 6-month minimum, full-stack with unlimited builds).

Logan's background: Helped spearhead AI implementation initiatives at Harvard Business School. Founder of Kaleos. Works with founders, CEOs, and operators running established businesses who need AI implemented strategically, not experimentally.

Tone: Confident, direct, consultative. Not salesy. Ask smart questions about their business before recommending anything. If someone seems like a fit, guide them toward booking a call or starting with the assessment. If they're looking for a cheap chatbot or quick hack, politely explain Kaleos isn't the right fit.

When someone expresses interest, say something like: 'Sounds like we should talk. Here's how to take the next step:' and present the CTA buttons.

Book a free call links to Calendly. Email me directly opens mailto:logan@kaleoshq.com.`;

export async function POST(req: NextRequest) {
  try {
    const { messages, session_id } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    if (messages.length > 30) {
      return NextResponse.json({ error: "Conversation too long" }, { status: 400 });
    }

    // Log the user's message
    const lastUserMsg = messages[messages.length - 1];
    if (lastUserMsg?.role === "user" && session_id) {
      getSupabase().from("chat_logs").insert({
        session_id,
        role: "user",
        message: lastUserMsg.content,
        email: null,
      }).then();
    }

    // Easter egg
    if (lastUserMsg && lastUserMsg.content.trim().toLowerCase() === "chungus aioli") {
      const easterEggReply = "Congratulations you have unlocked mollick doing tricks on it";
      if (session_id) {
        getSupabase().from("chat_logs").insert({
          session_id,
          role: "assistant",
          message: easterEggReply,
          email: null,
        }).then();
      }
      return NextResponse.json({ content: easterEggReply });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        max_tokens: 500,
        temperature: 0.7,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      console.error("OpenAI error:", data);
      return NextResponse.json({ error: "AI request failed" }, { status: 500 });
    }

    const assistantContent = data.choices[0].message.content;

    // Log the assistant's response
    if (session_id) {
      getSupabase().from("chat_logs").insert({
        session_id,
        role: "assistant",
        message: assistantContent,
        email: null,
      }).then();
    }

    return NextResponse.json({ content: assistantContent });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}