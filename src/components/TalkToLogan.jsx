"use client";
import { useState, useRef, useEffect } from "react";
const INITIAL_MESSAGE = { role: "assistant", content: "Hey, I'm Logan. If you're curious whether AI makes sense for your business, you're in the right place. Tell me what you're dealing with and I'll give you a straight answer." };
export default function TalkToLogan() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [pulse, setPulse] = useState(true);
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const turns = useRef(0);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  useEffect(() => { if (isOpen && inputRef.current) inputRef.current.focus(); }, [isOpen]);
  useEffect(() => { const t = setTimeout(() => setPulse(false), 8000); return () => clearTimeout(t); }, []);
  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);
    turns.current += 1;
    try {
      const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: updated.map((m) => ({ role: m.role, content: m.content })) }) });
      const data = await res.json();
      const text = data.content || "Something glitched. Try that again?";
      setMessages((prev) => [...prev, { role: "assistant", content: text }]);
      if (turns.current >= 3 && !showCTA) setShowCTA(true);
    } catch { setMessages((prev) => [...prev, { role: "assistant", content: "Something glitched on my end. Mind trying again?" }]); } finally { setLoading(false); }
  };
  return (<>
    <style>{`@keyframes ltlPulse{0%,100%{box-shadow:0 8px 32px rgba(13,148,136,.3)}50%{box-shadow:0 8px 48px rgba(13,148,136,.55)}}@keyframes ltlBounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-4px)}}@keyframes ltlFadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}.ltl-scroll::-webkit-scrollbar{width:4px}.ltl-scroll::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:4px}.ltl-scroll::-webkit-scrollbar-track{background:transparent}`}</style>
    {!isOpen&&(<div onClick={()=>{setIsOpen(true);setPulse(false);}} style={{position:"fixed",bottom:24,right:24,zIndex:9999,display:"flex",alignItems:"center",gap:12,background:"linear-gradient(135deg,#1B2A4A,#2a3f6e)",border:"1px solid rgba(255,255,255,.1)",borderRadius:60,padding:"14px 24px 14px 18px",cursor:"pointer",boxShadow:"0 8px 32px rgba(13,148,136,.3),0 2px 8px rgba(0,0,0,.2)",transition:"all .3s ease",animation:pulse?"ltlPulse 2s ease-in-out infinite":"none"}}><div style={{width:42,height:42,flexShrink:0,position:"relative"}}><img src="/photo.png" alt="Logan Kay" style={{width:42,height:42,borderRadius:"50%",objectFit:"cover"}}/><div style={{position:"absolute",bottom:0,right:0,width:10,height:10,borderRadius:"50%",background:"#22c55e",border:"2px solid #1B2A4A"}}/></div><div><div style={{color:"white",fontFamily:"'Inter',sans-serif",fontSize:15,fontWeight:600,letterSpacing:"-.01em"}}>Talk to Logan</div><div style={{color:"rgba(255,255,255,.55)",fontFamily:"'Inter',sans-serif",fontSize:11,marginTop:1}}>Free AI consultation</div></div></div>)}
    {isOpen&&(<div onClick={()=>setIsOpen(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.35)",backdropFilter:"blur(4px)",zIndex:10000,animation:"ltlFadeUp .2s ease"}}/>)}
    {isOpen&&(<div style={{position:"fixed",bottom:24,right:24,width:"min(440px,calc(100vw - 48px))",height:"min(680px,calc(100vh - 48px))",zIndex:10001,display:"flex",flexDirection:"column",background:"linear-gradient(180deg,#0f1a2e,#162033)",borderRadius:20,border:"1px solid rgba(255,255,255,.08)",boxShadow:"0 24px 80px rgba(0,0,0,.5),0 0 0 1px rgba(13,148,136,.1)",overflow:"hidden",animation:"ltlFadeUp .3s cubic-bezier(.4,0,.2,1)"}}>
      <div style={{padding:"20px 20px 16px",display:"flex",alignItems:"center",gap:14,background:"linear-gradient(135deg,rgba(13,148,136,.06),rgba(27,42,74,.4))",borderBottom:"1px solid rgba(255,255,255,.06)"}}><div style={{width:44,height:44,flexShrink:0,position:"relative"}}><img src="/photo.png" alt="Logan Kay" style={{width:44,height:44,borderRadius:"50%",objectFit:"cover"}}/><div style={{position:"absolute",bottom:1,right:1,width:10,height:10,borderRadius:"50%",background:"#22c55e",border:"2px solid #0f1a2e"}}/></div><div style={{flex:1}}><div style={{color:"white",fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:600}}>Logan Kay</div><div style={{color:"rgba(255,255,255,.4)",fontFamily:"'Inter',sans-serif",fontSize:12,marginTop:2}}>Founder, Kaleos · AI & Ops @ HBS</div></div><button onClick={()=>setIsOpen(false)} style={{width:32,height:32,borderRadius:"50%",border:"none",background:"rgba(255,255,255,.06)",color:"rgba(255,255,255,.5)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontFamily:"sans-serif"}}>✕</button></div>
      <div className="ltl-scroll" style={{flex:1,overflowY:"auto",padding:20,display:"flex",flexDirection:"column",gap:14}}>{messages.map((m,i)=>(<div key={i} style={{maxWidth:"85%",padding:"12px 16px",borderRadius:m.role==="assistant"?"16px 16px 16px 4px":"16px 16px 4px 16px",background:m.role==="assistant"?"rgba(255,255,255,.06)":"linear-gradient(135deg,#0d9488,#0f766e)",border:m.role==="assistant"?"1px solid rgba(255,255,255,.04)":"none",color:m.role==="assistant"?"rgba(255,255,255,.88)":"white",fontFamily:"'Inter',sans-serif",fontSize:14,lineHeight:1.55,alignSelf:m.role==="assistant"?"flex-start":"flex-end",animation:"ltlFadeUp .25s ease"}}>{m.content}</div>))}{loading&&(<div style={{display:"flex",gap:5,padding:"12px 16px",alignSelf:"flex-start"}}>{[0,0.15,0.3].map((d,i)=>(<div key={i} style={{width:7,height:7,borderRadius:"50%",background:"rgba(255,255,255,.3)",animation:`ltlBounce 1.2s ease-in-out ${d}s infinite`}}/>))}</div>)}<div ref={endRef}/></div>
      {showCTA&&!emailSent&&(<div style={{padding:"10px 20px 6px",display:"flex",gap:8,flexWrap:"wrap"}}><button onClick={()=>window.open("https://calendly.com/logan-kaleoshq/30min","_blank")} style={{padding:"9px 16px",borderRadius:20,border:"none",background:"linear-gradient(135deg,#0d9488,#0f766e)",color:"white",fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:600,cursor:"pointer",transition:"all .2s"}}>Book a free call</button><button onClick={()=>document.querySelector(".ltl-email")?.focus()} style={{padding:"9px 16px",borderRadius:20,border:"1px solid rgba(13,148,136,.3)",background:"rgba(13,148,136,.1)",color:"#5eead4",fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:500,cursor:"pointer",transition:"all .2s"}}>Email me a breakdown</button></div>)}
      {showCTA&&!emailSent&&(<div style={{padding:"6px 20px 10px",display:"flex",gap:8}}><input className="ltl-email" value={email} onChange={(e)=>setEmail(e.target.value)} onKeyDown={(e)=>{if(e.key==="Enter"&&email.trim())setEmailSent(true);}} placeholder="your@email.com" type="email" style={{flex:1,padding:"10px 14px",borderRadius:12,border:"1px solid rgba(255,255,255,.1)",background:"rgba(255,255,255,.04)",color:"white",fontFamily:"'Inter',sans-serif",fontSize:13,outline:"none"}}/><button onClick={()=>{if(email.trim())setEmailSent(true);}} style={{padding:"10px 16px",borderRadius:12,border:"none",background:"#0d9488",color:"white",fontFamily:"'Inter',sans-serif",fontSize:13,fontWeight:600,cursor:"pointer"}}>Send</button></div>)}
      {emailSent&&(<div style={{padding:"12px 20px",color:"#5eead4",fontFamily:"'Inter',sans-serif",fontSize:13,textAlign:"center"}}>Got it. I'll send you a breakdown soon.</div>)}
      <div style={{padding:"14px 20px 20px",borderTop:"1px solid rgba(255,255,255,.06)",display:"flex",gap:10,alignItems:"flex-end"}}><textarea ref={inputRef} value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder="Ask me anything about automating your ops..." rows={1} style={{flex:1,padding:"12px 16px",borderRadius:14,border:"1px solid rgba(255,255,255,.1)",background:"rgba(255,255,255,.04)",color:"white",fontFamily:"'Inter',sans-serif",fontSize:14,outline:"none",resize:"none",lineHeight:1.4}}/><button onClick={send} disabled={!input.trim()||loading} style={{width:42,height:42,borderRadius:12,border:"none",background:input.trim()?"linear-gradient(135deg,#0d9488,#0f766e)":"rgba(255,255,255,.06)",color:input.trim()?"white":"rgba(255,255,255,.2)",cursor:input.trim()?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .2s"}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button></div>
      <div style={{textAlign:"center",padding:"0 0 12px",color:"rgba(255,255,255,.18)",fontFamily:"'Inter',sans-serif",fontSize:10}}>AI-powered · Responses reflect how Logan thinks</div>
    </div>)}
  </>);
}