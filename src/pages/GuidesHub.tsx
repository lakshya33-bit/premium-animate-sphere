import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, ArrowRight, TrendingUp, CreditCard, Gift, Shield, Plane, Star } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";

const categories = ["All", "Beginners", "Strategy", "Travel", "Rewards", "Security"];

const guides = [
  { title: "Credit Card Rewards 101: A Beginner's Guide", category: "Beginners", readTime: "8 min", icon: Star, description: "Everything you need to know about earning and redeeming credit card rewards in India. Start your journey to smarter spending.", featured: true, color: "#C4A35A" },
  { title: "The Ultimate SmartBuy Hack: 10x Points Strategy", category: "Strategy", readTime: "12 min", icon: TrendingUp, description: "How to maximize your HDFC reward points using SmartBuy portal. Step-by-step guide with real examples.", featured: true, color: "#4CAF50" },
  { title: "Lounge Access: Complete 2026 Guide", category: "Travel", readTime: "10 min", icon: Plane, description: "Everything about airport lounge access — Priority Pass, Dreamfolks, and which cards give you the best deal.", featured: false, color: "#2196F3" },
  { title: "How to Choose Your First Premium Credit Card", category: "Beginners", readTime: "7 min", icon: CreditCard, description: "Confused between HDFC Regalia, SBI Elite, and Axis Privilege? Here's a data-driven comparison.", featured: false, color: "#FF9800" },
  { title: "Voucher Stacking: Double Your Savings", category: "Strategy", readTime: "9 min", icon: Gift, description: "The art of combining credit card vouchers with platform offers for maximum discounts.", featured: false, color: "#E91E63" },
  { title: "Protecting Your Card: Security Best Practices", category: "Security", readTime: "6 min", icon: Shield, description: "Essential tips to protect your credit card from fraud, unauthorized transactions, and skimming.", featured: false, color: "#9C27B0" },
  { title: "International Travel: Best Cards to Carry", category: "Travel", readTime: "11 min", icon: Plane, description: "Zero forex markup cards, international lounge access, and travel insurance — the ultimate combo.", featured: false, color: "#00BCD4" },
  { title: "Reward Points Valuation: Know What You Earn", category: "Rewards", readTime: "8 min", icon: TrendingUp, description: "Not all reward points are equal. Learn how to calculate the true value of your credit card points.", featured: false, color: "#8BC34A" },
  { title: "Annual Fee Waiver Strategies", category: "Strategy", readTime: "5 min", icon: CreditCard, description: "How to get your annual fee waived on premium cards. Proven strategies that actually work.", featured: false, color: "#FF5722" },
];

export default function GuidesHub() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = guides.filter((g) => activeCategory === "All" || g.category === activeCategory);
  const featured = filtered.filter((g) => g.featured);
  const rest = filtered.filter((g) => !g.featured);

  return (
    <PageLayout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-sm font-medium tracking-widest uppercase text-gold mb-3">Guides Hub</p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Expert <span className="gold-gradient">Guides</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mb-8">Master the art of credit card rewards with our comprehensive guides written by industry experts.</p>
          </motion.div>

          {/* Category pills */}
          <div className="flex gap-2 flex-wrap mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat ? "bg-gold text-background" : "glass-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured */}
          {featured.length > 0 && (
            <div className="grid md:grid-cols-2 gap-5 mb-8">
              {featured.map((guide, i) => (
                <motion.div
                  key={guide.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="glass-card rounded-2xl p-8 group cursor-pointer hover:border-gold/30 transition-all relative overflow-hidden"
                >
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-gold/20 text-gold text-[10px] font-medium">Featured</div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${guide.color}15` }}>
                    <guide.icon className="w-5 h-5" style={{ color: guide.color }} />
                  </div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{guide.category}</span>
                  <h3 className="font-serif text-xl font-semibold mt-2 mb-3 group-hover:text-gold transition-colors">{guide.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{guide.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" /> {guide.readTime} read</span>
                    <span className="text-sm text-gold font-medium flex items-center gap-1 group-hover:gap-2 transition-all">Read <ArrowRight className="w-4 h-4" /></span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Rest */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((guide, i) => (
              <motion.div
                key={guide.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="tilt-card glass-card rounded-2xl p-6 group cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${guide.color}15` }}>
                    <guide.icon className="w-4 h-4" style={{ color: guide.color }} />
                  </div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{guide.category}</span>
                </div>
                <h3 className="font-serif text-base font-semibold mb-2 group-hover:text-gold transition-colors leading-snug">{guide.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">{guide.description}</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><Clock className="w-3 h-3" /> {guide.readTime}</span>
                  <span className="text-xs text-gold font-medium flex items-center gap-1 group-hover:gap-2 transition-all">Read <ArrowRight className="w-3 h-3" /></span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
