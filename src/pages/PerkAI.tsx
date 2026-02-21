import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Bot, User, Zap, MessageSquare, TrendingUp, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import PageLayout from "@/components/PageLayout";

interface Message {
  role: "user" | "ai";
  content: string;
  suggestions?: string[];
}

const initialMessages: Message[] = [
  {
    role: "ai",
    content: "Hey! I'm Perk AI — your personal credit card rewards advisor. Tell me about your spending habits, and I'll recommend the best cards and redemption strategies for you. 🎯",
    suggestions: ["Best card for online shopping?", "How to maximize lounge access?", "Compare HDFC Infinia vs Diners Black"],
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
];

function TypingText({ text }: { text: string }) {
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
      }
    }, 8);
    return () => clearInterval(interval);
  }, [text, done]);

  return <div className="whitespace-pre-line">{displayed}{!done && <span className="inline-block w-0.5 h-4 bg-gold/60 animate-pulse ml-0.5 align-text-bottom" />}</div>;
}

export default function PerkAI() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [latestAiIndex, setLatestAiIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const key = text.toLowerCase().trim().replace(/[!.,]/g, "");
      const response = aiResponses[key] || {
        content: `Great question about "${text}"! Based on my analysis of 160+ credit cards and current market rates:\n\n📊 I'd recommend focusing on cards that offer **accelerated rewards** in your primary spending categories. The best strategy is to use different cards for different merchants.\n\n💡 Would you like me to create a personalized card strategy based on your monthly spending breakdown?`,
        suggestions: ["Create my card strategy", "Best overall credit card?", "How to earn more reward points?"],
      };

      setMessages((prev) => {
        setLatestAiIndex(prev.length);
        return [...prev, { role: "ai", ...response }];
      });
      setIsTyping(false);
    }, 1200);
  };

  return (
    <PageLayout>
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
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

          {/* Quick action chips */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-2 mb-8 flex-wrap"
          >
            {quickActions.map((a, i) => (
              <motion.button
                key={a.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.08, type: "spring" }}
                onClick={() => sendMessage(a.label)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full glass-card text-xs font-medium text-muted-foreground hover:text-gold hover:border-gold/30 hover:scale-105 transition-all duration-300 hover:shadow-md hover:shadow-gold/5"
              >
                <a.icon className="w-3 h-3" />
                {a.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Chat area */}
          <div ref={scrollRef} className="space-y-5 mb-6 min-h-[400px] max-h-[55vh] overflow-y-auto pr-1 scroll-smooth">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
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
                        <TypingText text={msg.content} />
                      ) : (
                        <div className="whitespace-pre-line">{msg.content}</div>
                      )}
                    </div>
                    {msg.suggestions && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
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

          {/* Input */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="sticky bottom-6"
          >
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
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
