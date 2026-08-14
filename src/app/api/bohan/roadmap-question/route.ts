import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createRateLimiter, clientIp } from '@/lib/rate-limit'

// Same verified sending domain the lead form uses.
const FROM_ADDRESS = 'Kaleos HQ Website <leads@kaleoshq.com>'
const NOTIFY_ADDRESS = 'logan@kaleoshq.com'

// 12 questions per IP per hour
const isRateLimited = createRateLimiter(12, 60 * 60 * 1000)

type QuestionPayload = {
  cardTitle: string
  cardColumn: string
  question: string
  name: string
  pageTimestamp: string
}

function validate(body: unknown): { question: QuestionPayload | null; error: string | null } {
  if (typeof body !== 'object' || body === null) {
    return { question: null, error: 'Invalid request body.' }
  }
  const b = body as Record<string, unknown>

  if (typeof b.honeypot === 'string' && b.honeypot.length > 0) {
    // Bot filled the hidden field. Pretend success, send nothing.
    return { question: null, error: null }
  }

  const question = typeof b.question === 'string' ? b.question.trim().slice(0, 2000) : ''
  const cardTitle = typeof b.cardTitle === 'string' ? b.cardTitle.trim().slice(0, 200) : ''
  const cardColumn = typeof b.cardColumn === 'string' ? b.cardColumn.trim().slice(0, 60) : ''
  const name = typeof b.name === 'string' ? b.name.trim().slice(0, 120) : ''
  const pageTimestamp = typeof b.pageTimestamp === 'string' ? b.pageTimestamp.trim().slice(0, 40) : ''

  if (!question) {
    return { question: null, error: 'A question or idea is required.' }
  }

  return {
    question: { cardTitle, cardColumn, question, name, pageTimestamp },
    error: null,
  }
}

export async function POST(req: NextRequest) {
  if (isRateLimited(clientIp(req))) {
    return NextResponse.json(
      { error: 'Too many questions from this connection. Try again in an hour.' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { question, error } = validate(body)
  if (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
  if (!question) {
    // Honeypot hit
    return NextResponse.json({ ok: true })
  }

  const receivedAt = new Date().toISOString()
  const cardTitle = question.cardTitle || 'Untitled card'

  // The Resend SDK reports API failures as a resolved { error } value, not a
  // rejection, so surface that as a failure explicitly.
  try {
    const result = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: FROM_ADDRESS,
      to: NOTIFY_ADDRESS,
      subject: `Bohan roadmap: ${cardTitle}`,
      text: [
        `Card: ${cardTitle}`,
        `Column: ${question.cardColumn || 'Unknown'}`,
        `From: ${question.name || 'Not given'}`,
        `Received: ${receivedAt}`,
        `Page time: ${question.pageTimestamp || 'Not given'}`,
        '',
        'Question or idea, exactly as submitted:',
        question.question,
      ].join('\n'),
    })
    if (result.error) {
      throw new Error(`Resend API error: ${result.error.name}: ${result.error.message}`)
    }
  } catch (err) {
    console.error('Bohan roadmap question send failed:', err)
    return NextResponse.json(
      { error: 'That could not send. Try again, or email logan@kaleoshq.com.' },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}
