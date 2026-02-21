import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Send, Bot, User, CreditCard, TrendingUp, Gift } from "lucide-react";
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

export default function PerkAI() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

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

      setMessages((prev) => [...prev, { role: "ai", ...response }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <PageLayout>
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-5">
              <Sparkles className="w-7 h-7 text-gold" />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-3">
              Perk <span className="gold-gradient">AI</span>
            </h1>
            <p className="text-muted-foreground text-sm">Your AI-powered credit card rewards advisor</p>
          </motion.div>

          {/* Chat messages */}
          <div className="space-y-6 mb-6 min-h-[400px]">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "ai" && (
                  <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-gold" />
                  </div>
                )}
                <div className={`max-w-[85%] ${msg.role === "user" ? "order-first" : ""}`}>
                  <div className={`rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gold text-background ml-auto rounded-br-md"
                      : "glass-card rounded-bl-md"
                  }`}>
                    <div className="whitespace-pre-line">{msg.content}</div>
                  </div>
                  {msg.suggestions && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {msg.suggestions.map((s) => (
                        <button
                          key={s}
                          onClick={() => sendMessage(s)}
                          className="text-xs px-3 py-1.5 rounded-full gold-outline-btn"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-gold" />
                </div>
                <div className="glass-card rounded-2xl rounded-bl-md px-5 py-4">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-gold/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-gold/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-gold/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="sticky bottom-6">
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
              className="flex gap-3 glass-card rounded-xl p-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about cards, rewards, strategies..."
                className="bg-transparent border-0 focus-visible:ring-0 text-sm"
              />
              <button type="submit" className="gold-btn px-4 rounded-lg flex items-center" disabled={isTyping}>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
