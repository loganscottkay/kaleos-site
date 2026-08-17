'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import type { CSSProperties, KeyboardEvent } from 'react'
import Image from 'next/image'

type Role = 'user' | 'assistant'

interface Message {
  role: Role
  content: string
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content:
    "Hey, I'm Logan. If you're thinking about AI for your business, tell me what you're working on. I'll give you a straight answer on where it creates real leverage.",
}

const INTEREST = /pric|cost|how much|get started|work together|work with|hire|sign up|interested|next step|ready to|let.s go|move forward|schedule|engage|proposal|quote|retainer|consult/

function SendIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
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

  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const turns = useRef(0)
  const sessionId = useRef<string | null>(null)

  // Generated lazily so it is never evaluated during server rendering.
  const getSessionId = () => {
    if (!sessionId.current) sessionId.current = crypto.randomUUID()
    return sessionId.current
  }

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    })
  }, [messages])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  const restoreFocus = useRef(false)

  const close = useCallback(() => {
    restoreFocus.current = true
    setIsOpen(false)
  }, [])

  // Focus restoration has to wait for the re-render: the launcher is
  // unmounted while the panel is open, so calling focus() inside close()
  // would run against a null ref and drop focus onto <body>.
  useEffect(() => {
    if (isOpen || !restoreFocus.current) return
    restoreFocus.current = false
    launcherRef.current?.focus()
  }, [isOpen])

  // The panel is modal (it renders over a full-screen backdrop), so Escape
  // has to dismiss it.
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
      const text: string = data.content || 'Something glitched. Try that again?'
      setMessages((prev) => [...prev, { role: 'assistant', content: text }])
      if ((turns.current >= 3 || INTEREST.test(userMsg.content.toLowerCase())) && !showCTA) {
        setShowCTA(true)
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Something glitched on my end. Mind trying again?' },
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
      {!isOpen && (
        <button
          ref={launcherRef}
          type="button"
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          className="ltl-launcher fixed bottom-6 right-6 z-[9999] flex items-center gap-3 text-left rounded-card border border-white/10 bg-gradient-to-br from-navy to-navy-950 py-4 pl-4 pr-6 cursor-pointer hover:border-white/20"
        >
          <span className="relative block w-10 h-10 shrink-0">
            <Image
              src="/photo.png"
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-teal-bright border-2 border-navy-950" />
          </span>
          <span className="block">
            <span className="block text-body font-semibold text-white tracking-tight">
              Talk to Logan
            </span>
            <span className="block text-caption text-white/60 mt-1">
              Free AI consultation
            </span>
          </span>
        </button>
      )}

      {isOpen && (
        <div
          onClick={close}
          className="ltl-in-fast fixed inset-0 z-[10000] bg-ink/50 backdrop-blur-sm"
          aria-hidden="true"
        />
      )}

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Chat with Logan"
          className="ltl-panel ltl-in fixed bottom-6 right-6 z-[10001] flex flex-col rounded-card border border-white/10 bg-gradient-to-b from-navy-900 to-navy-950 overflow-hidden"
        >
          <div className="flex items-center gap-4 px-6 pt-6 pb-4 border-b border-white/10">
            <span className="relative block w-11 h-11 shrink-0">
              <Image
                src="/photo.png"
                alt=""
                width={44}
                height={44}
                className="w-11 h-11 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-teal-bright border-2 border-navy-900" />
            </span>
            <div className="flex-1">
              <div
                className="text-body font-semibold text-white"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Logan Kay
              </div>
              <div className="font-system text-caption text-white/60 mt-1">
                Founder, Kaleos HQ
              </div>
            </div>
            <button
              onClick={close}
              aria-label="Close chat"
              className="btn w-10 h-10 bg-white/6 text-white/60 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Replies arrive asynchronously, so the transcript announces itself. */}
          <div
            className="ltl-scroll flex-1 overflow-y-auto p-6 flex flex-col gap-4"
            role="log"
            aria-live="polite"
            aria-atomic="false"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`ltl-in-fast max-w-[85%] py-3 px-4 text-body leading-relaxed ${
                  m.role === 'assistant'
                    ? 'ltl-bubble-assistant bg-white/6 border border-white/10 text-white/90 self-start'
                    : 'ltl-bubble-user bg-accent-deep text-white self-end'
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 py-3 px-4 self-start" aria-label="Logan is typing">
                {['0s', '0.15s', '0.3s'].map((delay) => (
                  <span
                    key={delay}
                    className="ltl-dot w-2 h-2 rounded-full bg-white/30"
                    style={{ '--dot-delay': delay } as CSSProperties}
                  />
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          {showCTA && (
            <div className="ltl-in-fast pt-3 px-6 pb-1">
              <div className="p-3 rounded-card bg-accent/10 border border-accent/20 text-white/75 text-caption leading-relaxed mb-3">
                Sounds like we should talk! Here&apos;s how to take the next step:
              </div>
              <div className="flex gap-2 flex-wrap">
                <a
                  href="https://calendly.com/logan-kaleoshq/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary px-4 text-caption font-semibold"
                >
                  Book a Discovery Call
                </a>
                <a
                  href="mailto:logan@kaleoshq.com?subject=Interested%20in%20Kaleos&body=Hi%20Logan%2C%20I'd%20like%20to%20learn%20more%20about%20how%20Kaleos%20can%20help%20my%20business."
                  className="btn btn-ghost-dark px-4 text-caption"
                >
                  Email me directly
                </a>
              </div>
            </div>
          )}

          <div className="flex items-end gap-3 pt-4 px-6 pb-6 border-t border-white/10">
            <label htmlFor="ltl-input" className="sr-only">
              Message Logan
            </label>
            <textarea
              id="ltl-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onTextareaKey}
              placeholder="Tell me about your business..."
              rows={1}
              className="input-dark flex-1 px-4 py-3 text-body resize-none leading-normal"
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              aria-label="Send message"
              className={`btn w-11 h-11 shrink-0 ${
                input.trim()
                  ? 'bg-accent-deep text-white cursor-pointer'
                  : 'bg-white/6 text-white/60 cursor-default'
              }`}
            >
              <SendIcon />
            </button>
          </div>

          <p className="text-center font-system text-white/50 text-caption pb-3">
            AI-powered &middot; Responses reflect how Logan thinks
          </p>
        </div>
      )}
    </>
  )
}
