'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import type { CSSProperties, KeyboardEvent } from 'react'
import Image from 'next/image'
import { CALENDLY, CTA } from '@/components/NavBar'

/* Posts to /api/chat. The payload shape and the validation limits are the
   backend's; only the surface changed. Quiet launcher, black panel. */

type Role = 'user' | 'assistant'

interface Message {
  role: Role
  content: string
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content:
    "Hi, I'm Logan. If you're weighing AI for your business, tell me what you're working on and I'll give you a straight answer on whether a system is worth building.",
}

const INTEREST = /pric|cost|how much|get started|work together|work with|hire|sign up|interested|next step|ready to|let.s go|move forward|schedule|engage|proposal|quote|retainer|consult/

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

export default function TalkToLogan() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showCTA, setShowCTA] = useState(false)
  const [pastHero, setPastHero] = useState(false)

  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const turns = useRef(0)
  const sessionId = useRef<string | null>(null)

  const getSessionId = () => {
    if (!sessionId.current) sessionId.current = crypto.randomUUID()
    return sessionId.current
  }

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }, [messages])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  // The hero has its own call to action; the launcher waits until the page moves.
  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 160)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const restoreFocus = useRef(false)

  const close = useCallback(() => {
    restoreFocus.current = true
    setIsOpen(false)
  }, [])

  useEffect(() => {
    if (isOpen || !restoreFocus.current) return
    restoreFocus.current = false
    launcherRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  const send = async () => {
    if (!input.trim() || loading) return
    const userMsg: Message = { role: 'user', content: input.trim() }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setLoading(true)
    turns.current += 1
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
          session_id: getSessionId(),
        }),
      })
      const data = await res.json()
      const text: string = data.content || data.error || 'Something went wrong. Try that again?'
      setMessages((prev) => [...prev, { role: 'assistant', content: text }])
      if ((turns.current >= 3 || INTEREST.test(userMsg.content.toLowerCase())) && !showCTA) {
        setShowCTA(true)
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Something went wrong on my end. Mind trying again?' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const onTextareaKey = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      send()
    }
  }

  return (
    <>
      {!isOpen && pastHero && (
        <button
          ref={launcherRef}
          type="button"
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          className="fixed bottom-5 right-5 z-[9999] flex items-center gap-3 rounded-full border border-line bg-void py-2 pl-2 pr-5 text-left text-star shadow-[0_8px_30px_rgb(0_0_0/0.35)] transition-colors hover:border-star/40 md:bottom-6 md:right-6"
        >
          <Image
            src="/photo.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover grayscale"
          />
          <span className="text-[0.95rem]">Talk with us</span>
        </button>
      )}

      {isOpen && (
        <div onClick={close} className="ltl-in-fast fixed inset-0 z-[10000] bg-void/60" aria-hidden="true" />
      )}

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Chat with KALEOS"
          className="ltl-panel ltl-in fixed bottom-4 right-4 z-[10001] flex flex-col overflow-hidden rounded-[14px] border border-line bg-void text-star md:bottom-6 md:right-6"
        >
          <div className="flex items-center gap-4 border-b border-line px-5 py-4">
            <Image
              src="/photo.png"
              alt="Logan Kay"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover grayscale"
            />
            <div className="flex-1">
              <div className="text-body">Logan Kay</div>
              <div className="font-mono text-[0.7rem] tracking-wide text-mist">Founder, KALEOS</div>
            </div>
            <button
              onClick={close}
              aria-label="Close chat"
              className="flex h-10 w-10 items-center justify-center rounded-full text-mist hover:text-star"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-5" role="log" aria-live="polite" aria-atomic="false" data-lenis-prevent>
            {messages.map((m, i) => (
              <div
                key={i}
                className={`ltl-in-fast max-w-[85%] rounded-[12px] px-4 py-3 text-[0.95rem] leading-relaxed ${
                  m.role === 'assistant'
                    ? 'self-start border border-line text-star'
                    : 'self-end bg-star text-void'
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="flex gap-1.5 self-start px-4 py-3" aria-label="Logan is typing">
                {['0s', '0.15s', '0.3s'].map((delay) => (
                  <span
                    key={delay}
                    className="ltl-dot h-1.5 w-1.5 rounded-full bg-star"
                    style={{ '--dot-delay': delay } as CSSProperties}
                  />
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          {showCTA && (
            <div className="ltl-in-fast flex flex-wrap gap-2 border-t border-line px-5 py-4">
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn btn-star !min-h-10 text-caption">
                {CTA}
              </a>
              <a
                href="mailto:logan@kaleoshq.com?subject=Kaleos%20HQ"
                className="btn btn-ghost !min-h-10 text-caption"
              >
                Email us
              </a>
            </div>
          )}

          <div className="flex items-end gap-2 border-t border-line p-4">
            <label htmlFor="ltl-input" className="sr-only">
              Message Logan
            </label>
            <textarea
              id="ltl-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onTextareaKey}
              placeholder="Tell me about your business"
              rows={1}
              className="flex-1 resize-none rounded-[10px] border border-line bg-void-2 px-4 py-3 text-[1rem] leading-normal text-star placeholder:text-mist focus:border-star/50 focus:outline-none"
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              aria-label="Send message"
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                input.trim() ? 'bg-star text-void' : 'border border-line text-mist'
              }`}
            >
              <SendIcon />
            </button>
          </div>

          <p className="pb-3 text-center font-mono text-[0.68rem] tracking-wide text-mist">
            AI assistant. Replies reflect how Logan thinks.
          </p>
        </div>
      )}
    </>
  )
}
