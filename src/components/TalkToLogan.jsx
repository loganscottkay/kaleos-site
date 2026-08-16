"use client";
import { useState, useRef, useEffect } from "react";

const INITIAL_MESSAGE = { role: "assistant", content: "Hey, I'm Logan. If you're thinking about AI for your business, tell me what you're working on. I'll give you a straight answer on where it creates real leverage." };

export default function TalkToLogan() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const turns = useRef(0);
  const sessionId = useRef(crypto.randomUUID());

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); }, [messages]);
  useEffect(() => { if (isOpen && inputRef.current) inputRef.current.focus(); }, [isOpen]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);
    turns.current += 1;
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
          session_id: sessionId.current,
        }),
      });
      const data = await res.json();
      const text = data.content || "Something glitched. Try that again?";
      setMessages((prev) => [...prev, { role: "assistant", content: text }]);
      const lowerMsg = userMsg.content.toLowerCase();
      const interested = /pric|cost|how much|get started|work together|work with|hire|sign up|interested|next step|ready to|let.s go|move forward|schedule|engage|proposal|quote|retainer|consult/.test(lowerMsg);
      if ((turns.current >= 3 || interested) && !showCTA) setShowCTA(true);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Something glitched on my end. Mind trying again?" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="ltl-launcher fixed bottom-6 right-6 z-[9999] flex items-center gap-3 text-left rounded-card border border-white/10 bg-gradient-to-br from-navy to-navy-950 py-4 pl-4 pr-6 cursor-pointer transition-all duration-200 hover:border-white/20"
        >
          <div className="relative w-10 h-10 shrink-0">
            <img src="/photo.png" alt="Logan Kay" className="w-10 h-10 rounded-full object-cover" />
            <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-teal-bright border-2 border-navy-800" />
          </div>
          <div>
            <div className="text-body font-semibold text-white tracking-tight">Talk to Logan</div>
            <div className="text-caption text-white/60 mt-1">Free AI consultation</div>
          </div>
        </button>
      )}

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[10000] bg-ink/35 backdrop-blur-sm"
          style={{ animation: "ltlFadeUp .2s ease" }}
        />
      )}

      {isOpen && (
        <div
          className="ltl-panel fixed bottom-6 right-6 z-[10001] flex flex-col rounded-card border border-white/8 bg-gradient-to-b from-navy-900 to-navy-950 overflow-hidden"
          style={{ animation: "ltlFadeUp .2s cubic-bezier(.4,0,.2,1)" }}
        >
          <div className="flex items-center gap-4 px-6 pt-6 pb-4 bg-accent/6 border-b border-white/6">
            <div className="relative w-11 h-11 shrink-0">
              <img src="/photo.png" alt="Logan Kay" className="w-11 h-11 rounded-full object-cover" />
              <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-teal-bright border-2 border-navy-900" />
            </div>
            <div className="flex-1">
              <div className="text-body font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>Logan Kay</div>
              <div className="text-caption text-white/70 mt-1">Founder, Kaleos HQ</div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="w-10 h-10 rounded-control border-none bg-white/6 text-white/60 cursor-pointer flex items-center justify-center text-body"
            >
              ✕
            </button>
          </div>

          <div className="ltl-scroll flex-1 overflow-y-auto p-6 flex flex-col gap-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] py-3 px-4 text-body leading-relaxed ${
                  m.role === "assistant"
                    ? "ltl-bubble-assistant bg-white/6 border border-white/4 text-white/88 self-start"
                    : "ltl-bubble-user bg-accent-deep text-white self-end"
                }`}
                style={{ animation: "ltlFadeUp .2s ease" }}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 py-3 px-4 self-start">
                {[0, 0.15, 0.3].map((d, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-white/30"
                    style={{ animation: `ltlBounce 1.2s ease-in-out ${d}s infinite` }}
                  />
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>

          {showCTA && (
            <div className="pt-3 px-6 pb-1">
              <div className="p-3 rounded-card bg-accent/8 border border-accent/15 text-white/75 text-caption leading-relaxed mb-3">
                Sounds like we should talk! Here&apos;s how to take the next step:
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => window.open("https://calendly.com/logan-kaleoshq/30min", "_blank")}
                  className="btn btn-primary px-4 text-caption font-semibold"
                >
                  Book a Discovery Call
                </button>
                <button
                  onClick={() => window.open("mailto:logan@kaleoshq.com?subject=Interested%20in%20Kaleos&body=Hi%20Logan%2C%20I'd%20like%20to%20learn%20more%20about%20how%20Kaleos%20can%20help%20my%20business.")}
                  className="btn btn-ghost-dark px-4 text-caption"
                >
                  Email me directly
                </button>
              </div>
            </div>
          )}

          <div className="flex items-end gap-3 pt-4 px-6 pb-6 border-t border-white/6">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Tell me about your business..."
              rows={1}
              className="input-dark flex-1 px-4 py-3 text-body resize-none leading-normal"
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              aria-label="Send message"
              className={`w-11 h-11 rounded-control border-none flex items-center justify-center shrink-0 transition-all duration-200 ${
                input.trim() ? "bg-accent-deep text-white cursor-pointer" : "bg-white/6 text-white/60 cursor-default"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>

          <p className="text-center text-white/60 text-caption pb-3">AI-powered · Responses reflect how Logan thinks</p>
        </div>
      )}
    </>
  );
}
