import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Download, Linkedin, Calendar, Sparkles, ChevronDown } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// ─── System Prompt ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are TheSaheedat's personal AI assistant on her portfolio website. You speak warmly, professionally and concisely on her behalf.

About Saheedat Olasumbo Abbas:
- Data Engineer and AI Practitioner with 10+ years of experience
- Transforms complex datasets into strategic insights across financial institutions in Africa and North America
- Currently pursuing a Master's degree at the University of Michigan
- Adjunct Professor at Lambton College
- Published researcher on AI governance frameworks
- Google Women Techmakers Ambassador
- Technovation Global Ambassador
- Mentor at AI Ventures Accelerator and WIMBIZ
- Expertise: data engineering, machine learning, AI governance, fraud detection, banking analytics, responsible AI
- Contact email: saheedat@thesaheedat.com
- LinkedIn: linkedin.com/in/saheedat-abbas
- CV available to download from the website

How you help visitors:
1. Answer questions about Saheedat's background, experience, skills, publications
2. Guide collaboration and project enquiries — collect name, email, and what they're working on
3. Help with consultation requests — data science challenges, AI governance, digital transformation, academic collaboration
4. Direct to CV download or LinkedIn as appropriate
5. Help book meetings — direct them to reach out at saheedat@thesaheedat.com or via LinkedIn

Tone: warm, confident, knowledgeable. Keep responses concise — 2-4 sentences max unless the question genuinely needs more detail. Never make up facts. If unsure, say "I'd recommend reaching out directly to Saheedat at saheedat@thesaheedat.com".

When someone wants to collaborate or book a meeting, ask: their name, what they're working on, and the best way to reach them.`;

// ─── Suggested prompts ────────────────────────────────────────────────────────
const SUGGESTIONS = [
  "What does Saheedat specialise in?",
  "I'd like to collaborate on a project",
  "Can I book a consultation?",
  "Download her CV",
];

// ─── Quick action handler ─────────────────────────────────────────────────────
function handleQuickAction(text: string): string | null {
  if (text.toLowerCase().includes("download") && text.toLowerCase().includes("cv")) {
    window.open("/Saheedat_Abbas_CV.pdf", "_blank");
    return "I've opened Saheedat's CV for you. You can download it directly from that page.";
  }
  if (text.toLowerCase().includes("linkedin")) {
    window.open("https://www.linkedin.com/in/saheedat-abbas/", "_blank");
    return "I have opened Saheedat's LinkedIn profile in a new tab.";
  }
  return null;
}

// ─── API call ─────────────────────────────────────────────────────────────────
async function callOpenRouter(messages: { role: string; content: string }[]): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OpenRouter API key not configured.");

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": "https://thesaheedat.com",
      "X-Title": "The Saheedat",
    },
    body: JSON.stringify({
      model: "anthropic/claude-3-haiku",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 400,
      temperature: 0.7,
    }),
  });

  if (!res.ok) throw new Error("API request failed");
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "I'm having trouble responding right now. Please reach out directly at connect@thesaheedat.com.";
}

// ─── Message Bubble ───────────────────────────────────────────────────────────
function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
        </div>
      )}
      <div
        className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-primary text-primary-foreground rounded-br-sm font-sans"
            : "bg-card border border-border text-foreground rounded-bl-sm font-sans"
        }`}
      >
        {message.content}
      </div>
    </motion.div>
  );
}

// ─── Typing indicator ─────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
        <Sparkles className="w-3.5 h-3.5 text-primary" />
      </div>
      <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-primary/60"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm Saheedat's assistant. I can tell you about her work, help with collaboration enquiries, or point you in the right direction. What brings you here today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  // Pulse bubble after 3s to draw attention
  const [pulsed, setPulsed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setPulsed(true), 3000);
    return () => clearTimeout(t);
  }, []);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    setShowSuggestions(false);

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    // Check quick actions first
    const quickReply = handleQuickAction(text);

    try {
      const reply = quickReply ?? await callOpenRouter(
        [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }))
      );

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      if (!open) setUnread((n) => n + 1);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Something went wrong on my end. Please reach out directly at saheedat@thesaheedat.com.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[600px] flex flex-col rounded-2xl overflow-hidden shadow-2xl border border-border bg-background"
            style={{ maxHeight: "min(600px, calc(100vh - 120px))" }}
          >
            {/* Header */}
            <div className="relative bg-card border-b border-border px-5 py-4 flex items-center gap-3 flex-shrink-0">
              {/* Gold orb */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-card" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-serif text-base font-bold text-foreground leading-tight">Saheedat's Assistant</p>
                <p className="font-sans text-xs text-muted-foreground">Always here to help</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/Saheedat_Abbas_CV.pdf"
                  download
                  title="Download CV"
                  className="w-8 h-8 rounded-full hover:bg-secondary flex items-center justify-center transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-muted-foreground" />
                </a>
                <a
                  href="https://www.linkedin.com/in/saheedat-abbas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                  className="w-8 h-8 rounded-full hover:bg-secondary flex items-center justify-center transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-muted-foreground" />
                </a>
                <a
                  href="mailto:saheedat@thesaheedat.com"
                  title="Book a meeting"
                  className="w-8 h-8 rounded-full hover:bg-secondary flex items-center justify-center transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                </a>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-secondary flex items-center justify-center transition-colors ml-1"
                >
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-0 scroll-smooth">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {loading && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            <AnimatePresence>
              {showSuggestions && messages.length <= 1 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 pb-3 flex flex-wrap gap-2"
                >
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="font-sans text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div className="border-t border-border px-4 py-3 flex items-center gap-2 bg-card flex-shrink-0">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything…"
                className="flex-1 bg-transparent font-sans text-sm text-foreground placeholder:text-muted-foreground outline-none"
                disabled={loading}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send className="w-3.5 h-3.5 text-primary-foreground" />
              </button>
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-border bg-card flex-shrink-0">
              <p className="font-sans text-[10px] text-center text-muted-foreground/50">
                Powered by AI · thesaheedat.com
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Bubble ── */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary shadow-lg flex items-center justify-center focus:outline-none"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={pulsed && !open ? {
          boxShadow: [
            "0 0 0 0px hsl(var(--primary) / 0.4)",
            "0 0 0 12px hsl(var(--primary) / 0)",
          ],
        } : {}}
        transition={pulsed && !open ? { duration: 1.8, repeat: Infinity } : {}}
        aria-label="Open chat assistant"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5 text-primary-foreground" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        <AnimatePresence>
          {unread > 0 && !open && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center font-sans"
            >
              {unread}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
