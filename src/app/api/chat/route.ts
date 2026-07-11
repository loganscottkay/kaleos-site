import { NextRequest, NextResponse } from "next/server";

/* ── Simple in-memory rate limiter: 20 requests per IP per hour ── */
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

// Clean up expired entries every 10 minutes to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitStore) {
    if (now > value.resetAt) rateLimitStore.delete(key);
  }
}, 10 * 60 * 1000);

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

const SYSTEM_PROMPT = `You are Logan Kay's AI assistant on the Kaleos HQ website. Kaleos HQ is an agentic AI implementation and applied AI consulting practice, not a generic automation agency.

Core thesis: AI doesn't fail because of the technology. It fails because of the implementation. Everyone wants AI, most of it never leaves the slide deck, and Kaleos HQ is the implementation partner that gets it into production.

What Kaleos HQ does: We deploy AI systems designed around how a business actually operates. Every engagement starts with strategic assessment: mapping workflows, identifying where human judgment is essential vs where it's bottlenecking procedural work, and building a prioritized opportunity matrix. Then we build precision-scoped systems with human-in-the-loop controls, approval gates, and full audit trails. Agents do the work, humans make the calls, everything is logged.

Key differentiators: Strategy-first methodology (not tool-first). Single-outcome precision (one system, one KPI, measurable results). Absolute executive control (nothing executes without human approval). Every output logged, every action reviewable.

Engagement structure: Three tiers. Assessment (one-time deep operational analysis), Implementation (hands-on system builds deployed month over month), Strategic Partner (ongoing full-stack implementation and strategic oversight). Every engagement is scoped to the specific business, so never quote dollar amounts. If someone asks about pricing, explain that scope drives cost and the right move is a short discovery call where Logan can give them a real number.

About the firm: Kaleos HQ was founded by Logan Kay, its Founder and CEO, who designed and deployed AI systems across admissions and operations at Harvard Business School. The Kaleos HQ implementation methodology comes from that work. Shipped production systems include a multi-tenant coaching platform, a client-facing project portal, and an AI outreach engine with approval gates on every send. Kaleos HQ works with founders, CEOs, and operators running established businesses who need AI implemented strategically, not experimentally.

Tone: Confident, direct, consultative. Not salesy. Never use em dashes in your replies. Use commas, periods, or colons instead. Ask smart questions about their business before recommending anything. If someone seems like a fit, guide them toward booking a call or starting with the assessment. If they're looking for a cheap chatbot or quick hack, politely explain Kaleos HQ isn't the right fit.

When someone expresses interest, say something like: 'Sounds like we should talk. Here's how to take the next step:' and present the CTA buttons.

Book a free call links to Calendly. Email me directly opens mailto:logan@kaleoshq.com.`;

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    if (messages.length > 30) {
      return NextResponse.json({ error: "Conversation too long" }, { status: 400 });
    }

    // Easter egg
    const lastUserMsg = messages[messages.length - 1];
    if (lastUserMsg && lastUserMsg.content.trim().toLowerCase() === "chungus aioli") {
      return NextResponse.json({ content: "Congratulations you have unlocked mollick doing tricks on it" });
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

    return NextResponse.json({ content: assistantContent });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}