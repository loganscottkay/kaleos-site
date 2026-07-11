import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import Airtable from 'airtable'
import { createRateLimiter, clientIp } from '@/lib/rate-limit'

// Swap to a kaleoshq.com sender once the domain is verified in Resend
const FROM_ADDRESS = 'Kaleos HQ Website <onboarding@resend.dev>'
const NOTIFY_ADDRESS = 'logan@kaleoshq.com'

// 10 submissions per IP per hour
const isRateLimited = createRateLimiter(10, 60 * 60 * 1000)

type LeadPayload = {
  name: string
  email: string
  company: string
  companySize: string
  lookingToSolve: string[]
  desiredOutcome: string
  sourcePage: string
  honeypot?: string
}

function validate(body: unknown): { lead: LeadPayload | null; error: string | null } {
  if (typeof body !== 'object' || body === null) {
    return { lead: null, error: 'Invalid request body.' }
  }
  const b = body as Record<string, unknown>

  if (typeof b.honeypot === 'string' && b.honeypot.length > 0) {
    // Bot filled the hidden field. Pretend success, write nothing.
    return { lead: null, error: null }
  }

  const name = typeof b.name === 'string' ? b.name.trim().slice(0, 200) : ''
  const email = typeof b.email === 'string' ? b.email.trim().slice(0, 200) : ''
  const company = typeof b.company === 'string' ? b.company.trim().slice(0, 200) : ''
  const companySize = typeof b.companySize === 'string' ? b.companySize.trim().slice(0, 50) : ''
  const lookingToSolve = Array.isArray(b.lookingToSolve)
    ? b.lookingToSolve.filter((v): v is string => typeof v === 'string').map((v) => v.slice(0, 100)).slice(0, 10)
    : []
  const desiredOutcome = typeof b.desiredOutcome === 'string' ? b.desiredOutcome.trim().slice(0, 2000) : ''
  const sourcePage = typeof b.sourcePage === 'string' ? b.sourcePage.trim().slice(0, 200) : ''

  if (!name || !email || !company || lookingToSolve.length === 0) {
    return { lead: null, error: 'Name, email, company, and at least one challenge are required.' }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { lead: null, error: 'That email address does not look right.' }
  }

  return {
    lead: { name, email, company, companySize, lookingToSolve, desiredOutcome, sourcePage },
    error: null,
  }
}

export async function POST(req: NextRequest) {
  if (isRateLimited(clientIp(req))) {
    return NextResponse.json(
      { error: 'Too many submissions from this connection. Try again in an hour.' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { lead, error } = validate(body)
  if (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
  if (!lead) {
    // Honeypot hit
    return NextResponse.json({ ok: true })
  }

  const submittedAt = new Date().toISOString()
  // Airtable's "Submitted At" is a date-only field; it rejects full ISO datetimes
  const submittedDate = submittedAt.slice(0, 10)
  const challenges = lead.lookingToSolve.join(', ')

  // async wrappers so constructor/config errors reject instead of throwing
  const airtablePromise = (async () =>
    new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
      .base(process.env.AIRTABLE_BASE_ID!)('Leads')
      .create([
        {
          fields: {
            Name: lead.name,
            Email: lead.email,
            Company: lead.company,
            'Company Size': lead.companySize,
            'Looking To Solve': challenges,
            'Desired Outcome': lead.desiredOutcome,
            'Source Page': lead.sourcePage,
            'Submitted At': submittedDate,
          },
        },
      ]))()

  // The Resend SDK reports API failures as a resolved { error } value, not a
  // rejection, so surface that as a failure explicitly.
  const emailPromise = (async () => {
    const result = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: FROM_ADDRESS,
      to: NOTIFY_ADDRESS,
      replyTo: lead.email,
      subject: `New lead: ${lead.name} at ${lead.company}`,
      text: [
        `Name: ${lead.name}`,
        `Email: ${lead.email}`,
        `Company: ${lead.company}`,
        `Company size: ${lead.companySize || 'Not given'}`,
        `Looking to solve: ${challenges}`,
        `Desired outcome: ${lead.desiredOutcome || 'Not given'}`,
        `Source page: ${lead.sourcePage || 'Unknown'}`,
        `Submitted: ${submittedAt}`,
      ].join('\n'),
    })
    if (result.error) {
      throw new Error(`Resend API error: ${result.error.name}: ${result.error.message}`)
    }
    return result
  })()

  const [airtableResult, emailResult] = await Promise.allSettled([airtablePromise, emailPromise])

  if (airtableResult.status === 'rejected') {
    console.error('Airtable create failed:', airtableResult.reason)
  }
  if (emailResult.status === 'rejected') {
    console.error('Resend send failed:', emailResult.reason)
  }

  // As long as one destination captured the lead, the visitor is fine.
  if (airtableResult.status === 'rejected' && emailResult.status === 'rejected') {
    return NextResponse.json(
      { error: 'The form could not submit. Email logan@kaleoshq.com directly and you will get a reply today.' },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}
