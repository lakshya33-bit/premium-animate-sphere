import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Bot, User, Zap, MessageSquare, TrendingUp, ArrowRight, Plane, GitCompareArrows, BadgePercent, RotateCcw, Copy, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import BackToTop from "@/components/BackToTop";
import { toast } from "sonner";

interface Message {
  role: "user" | "ai";
  content: string;
  suggestions?: string[];
  timestamp: number;
}

const initialMessages: Message[] = [
  {
    role: "ai",
    content: "Hey! I'm Perk AI — your personal credit card rewards advisor. Tell me about your spending habits, and I'll recommend the best cards and redemption strategies for you. 🎯",
    suggestions: ["Best card for online shopping?", "How to maximize lounge access?", "Compare HDFC Infinia vs Diners Black"],
    timestamp: Date.now(),
  },
];

const aiResponses: Record<string, { content: string; suggestions: string[] }> = {
  "best card for online shopping?": {
    content: "For online shopping, here are my top picks:\n\n🥇 **HDFC Infinia** — 3.3% reward rate via SmartBuy. Best for Flipkart (7%) and Amazon (5%) vouchers.\n\n🥈 **ICICI Amazon Pay** — Flat 5% on Amazon, 2% on other online purchases. Zero annual fee with ₹2L spend.\n\n🥉 **Axis Flipkart** — 5% on Flipkart & Myntra, 4% on preferred merchants.\n\n💡 **Pro tip:** Stack credit card rewards with platform offers for maximum savings!",
    suggestions: ["Tell me more about HDFC Infinia", "Best cashback card under ₹500 fee?", "How to redeem reward points?"],
  },
  "how to maximize lounge access?": {
    content: "Here's your lounge access masterplan:\n\n✈️ **Unlimited lounges:** HDFC Infinia, HDFC Diners Black, ICICI Emeralde\n\n🏢 **Best value:** Axis Atlas gives 8 visits/quarter which is plenty for most travelers.\n\n💎 **Hidden gem:** Some cards offer Priority Pass which covers 1400+ lounges worldwide.\n\n📝 **Tips:**\n- Domestic lounges: Most premium cards cover these\n- International: Check if it's Priority Pass or Dreamfolks\n- Guest access varies — HDFC Infinia covers 1 guest free!",
    suggestions: ["Which card has best international lounge?", "Priority Pass vs Dreamfolks?", "Best travel card overall?"],
  },
  "compare hdfc infinia vs diners black": {
    content: "Great matchup! Here's the breakdown:\n\n| Feature | HDFC Infinia | Diners Black |\n|---------|-------------|---------------|\n| Fee | ₹12,500 | ₹10,000 |\n| Reward Rate | 3.3% | 3.3% |\n| Network | Visa | Diners Club |\n| Lounge | Unlimited | Unlimited |\n| 10x on SmartBuy | ✅ | ✅ |\n\n**Infinia wins** on international acceptance (Visa). **Diners Black wins** on annual fee.\n\n⚠️ **Key difference:** Diners Club isn't accepted everywhere in India. Infinia's Visa network is universally accepted.\n\n**My pick:** Get both if you can! Use Infinia abroad and Diners Black domestically.",
    suggestions: ["Is Infinia worth the fee?", "How to get HDFC Infinia?", "Best card for international travel?"],
  },
};

const quickActions = [
  { icon: TrendingUp, label: "Top Rewards Cards" },
  { icon: Zap, label: "Best Cashback Deals" },
  { icon: MessageSquare, label: "Card Strategy Help" },
  { icon: Plane, label: "Travel Card Finder" },
  { icon: GitCompareArrows, label: "Compare Two Cards" },
  { icon: BadgePercent, label: "Fee Waiver Tips" },
];

function TypingText({ text, onDone }: { text: string; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
        onDone?.();
      }
    }, 8);
    return () => clearInterval(interval);
  }, [text, done]);

  if (done) {
    return <MarkdownContent content={text} />;
  }

  return <div className="whitespace-pre-line">{displayed}<span className="inline-block w-0.5 h-4 bg-gold/60 animate-pulse ml-0.5 align-text-bottom" /></div>;
}

function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        strong: ({ children }) => <strong className="font-semibold text-gold">{children}</strong>,
        a: ({ children, href }) => <a href={href} className="text-gold underline underline-offset-2 hover:text-gold/80">{children}</a>,
        table: ({ children }) => <div className="overflow-x-auto my-3"><table className="w-full text-xs border-collapse">{children}</table></div>,
        thead: ({ children }) => <thead className="border-b border-border/40">{children}</thead>,
        th: ({ children }) => <th className="text-left py-1.5 px-2 text-gold font-medium">{children}</th>,
        td: ({ children }) => <td className="py-1.5 px-2 border-b border-border/20">{children}</td>,
        ul: ({ children }) => <ul className="space-y-1 my-2">{children}</ul>,
        li: ({ children }) => <li className="flex gap-1.5 items-start"><span className="text-gold mt-1.5 text-[6px]">●</span><span>{children}</span></li>,
        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded-md hover:bg-secondary/60 text-muted-foreground hover:text-foreground"
      aria-label="Copy message"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-gold" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

export default function PerkAI() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [latestAiIndex, setLatestAiIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [typingDone, setTypingDone] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Perk AI | CardPerks";
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    if (!hasStarted) setHasStarted(true);
    const userMsg: Message = { role: "user", content: text, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTypingDone(false);

    setTimeout(() => {
      const key = text.toLowerCase().trim().replace(/[!.,]/g, "");
      const response = aiResponses[key] || {
        content: `Great question about "${text}"! Based on my analysis of 160+ credit cards and current market rates:\n\n📊 I'd recommend focusing on cards that offer **accelerated rewards** in your primary spending categories. The best strategy is to use different cards for different merchants.\n\n💡 Would you like me to create a personalized card strategy based on your monthly spending breakdown?`,
        suggestions: ["Create my card strategy", "Best overall credit card?", "How to earn more reward points?"],
      };

      setMessages((prev) => {
        setLatestAiIndex(prev.length);
        return [...prev, { role: "ai", ...response, timestamp: Date.now() }];
      });
      setIsTyping(false);
    }, 1200);
  };

  const handleNewChat = () => {
    setMessages(initialMessages);
    setHasStarted(false);
    setLatestAiIndex(0);
    setTypingDone(true);
  };

  const messageCount = messages.filter((m) => m.role === "user").length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageTransition>
        <main className="pt-20">
          {/* Gold gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none overflow-hidden">
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[radial-gradient(ellipse_at_center,hsl(var(--gold)/0.08)_0%,transparent_70%)]" />
          </div>

          <div className="container mx-auto px-4 max-w-3xl flex flex-col relative" style={{ height: "calc(100vh - 80px)" }}>
            {/* Collapsible Hero */}
            <AnimatePresence mode="wait">
              {!hasStarted ? (
                <motion.div
                  key="full-hero"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-8 flex-shrink-0"
                >
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="relative w-20 h-20 mx-auto mb-6"
                  >
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/25 to-gold/5 shadow-2xl shadow-gold/20" />
                    <div className="absolute inset-0 rounded-2xl flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-gold" />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="absolute -inset-2 rounded-2xl border border-gold/20"
                    />
                  </motion.div>
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-2 flex items-center justify-center gap-3">
                    Perk <span className="gold-gradient">AI</span>
                    <motion.span
                      className="inline-block w-2.5 h-2.5 rounded-full bg-gold"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  </h1>
                  <p className="text-muted-foreground text-sm">Your AI-powered credit card rewards advisor</p>
                </motion.div>
              ) : (
                <motion.div
                  key="compact-hero"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between py-3 flex-shrink-0 border-b border-border/30"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold/25 to-gold/5 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-gold" />
                    </div>
                    <span className="font-serif font-bold text-lg">Perk <span className="gold-gradient">AI</span></span>
                    <span className="text-xs text-muted-foreground">· {messageCount} message{messageCount !== 1 ? "s" : ""}</span>
                  </div>
                  <button
                    onClick={handleNewChat}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gold transition-colors px-3 py-1.5 rounded-lg hover:bg-secondary/60"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    New Chat
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick action chips */}
            <AnimatePresence>
              {!hasStarted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex justify-center gap-2 mb-6 flex-wrap max-w-lg mx-auto flex-shrink-0"
                >
                  {quickActions.map((a, i) => (
                    <motion.button
                      key={a.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.06, type: "spring" }}
                      onClick={() => sendMessage(a.label)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-full glass-card text-xs font-medium text-muted-foreground hover:text-gold hover:border-gold/30 hover:scale-105 transition-all duration-300 hover:shadow-md hover:shadow-gold/5"
                    >
                      <a.icon className="w-3 h-3" />
                      {a.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat area — flex-grow fills remaining space */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-5 py-4 pr-1 scroll-smooth min-h-0">
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={`flex gap-3 group ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "ai" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: "spring" }}
                        className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg shadow-gold/10"
                      >
                        <Bot className="w-4 h-4 text-gold" />
                      </motion.div>
                    )}
                    <div className={`max-w-[85%] ${msg.role === "user" ? "order-first" : ""}`}>
                      <div
                        className={`rounded-2xl px-5 py-4 text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-gradient-to-br from-gold to-gold-dark text-background ml-auto rounded-br-md shadow-lg shadow-gold/20"
                            : "glass-card rounded-bl-md border border-gold/10 shadow-lg shadow-gold/5"
                        }`}
                      >
                        {msg.role === "ai" && i === latestAiIndex && i > 0 ? (
                          <TypingText text={msg.content} onDone={() => setTypingDone(true)} />
                        ) : msg.role === "ai" ? (
                          <MarkdownContent content={msg.content} />
                        ) : (
                          <div className="whitespace-pre-line">{msg.content}</div>
                        )}
                      </div>
                      {/* Timestamp + Copy */}
                      <div className="flex items-center gap-2 mt-1 px-1">
                        <span className="text-[10px] text-muted-foreground/60">
                          {formatDistanceToNow(msg.timestamp, { addSuffix: true })}
                        </span>
                        {msg.role === "ai" && <CopyButton text={msg.content} />}
                      </div>
                      {/* Suggestions — only on latest AI message */}
                      {msg.suggestions && i === messages.length - 1 && msg.role === "ai" && typingDone && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="flex flex-wrap gap-2 mt-3"
                        >
                          {msg.suggestions.map((s) => (
                            <button
                              key={s}
                              onClick={() => sendMessage(s)}
                              className="text-xs px-3.5 py-2 rounded-xl gold-outline-btn hover:scale-105 transition-all duration-200 flex items-center gap-1"
                            >
                              {s} <ArrowRight className="w-3 h-3 opacity-50" />
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                    {msg.role === "user" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: "spring" }}
                        className="w-9 h-9 rounded-xl bg-secondary/80 flex items-center justify-center flex-shrink-0 mt-1 border border-border/30"
                      >
                        <User className="w-4 h-4 text-muted-foreground" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex gap-3"
                  >
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center flex-shrink-0 shadow-lg shadow-gold/10">
                      <Bot className="w-4 h-4 text-gold" />
                    </div>
                    <div className="glass-card rounded-2xl rounded-bl-md px-5 py-4 border border-gold/10 shadow-lg shadow-gold/5">
                      <div className="flex gap-1.5">
                        {[0, 1, 2].map((d) => (
                          <motion.span
                            key={d}
                            animate={{ y: [0, -6, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8, delay: d * 0.15 }}
                            className="w-2 h-2 rounded-full bg-gold/60"
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input — pinned at bottom */}
            <div className="flex-shrink-0 pb-4 pt-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex gap-3 glass-card rounded-2xl p-2.5 border border-border/30 shadow-xl shadow-black/5 focus-within:border-gold/40 focus-within:shadow-gold/10 transition-all duration-300"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about cards, rewards, strategies..."
                  className="bg-transparent border-0 focus-visible:ring-0 text-sm"
                />
                <button
                  type="submit"
                  disabled={isTyping || !input.trim()}
                  className="gold-btn px-5 rounded-xl flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-gold/15"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </main>
      </PageTransition>
      <BackToTop />
    </div>
  );
}
