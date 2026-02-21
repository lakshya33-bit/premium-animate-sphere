import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Landmark, Diamond, Crown, Heart, Check, ChevronDown, ChevronUp, Users, Shield, ArrowRight, Star, Sparkles, CreditCard, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { banks, type BankData, type BankingTier } from "@/data/banking";
import { useFavorites } from "@/hooks/use-favorites";

function TierCard({ tier, bankColor, bankName, index }: { tier: BankingTier; bankColor: string; bankName: string; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const { toggle, isFav } = useFavorites("banking");
  const tierId = `banking-${tier.name.toLowerCase().replace(/\s+/g, "-")}`;
  const visibleBenefits = expanded ? tier.benefits : tier.benefits.slice(0, 4);
  const hasMore = tier.benefits.length > 4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      className="group relative"
    >
      {/* Glow effect for highlighted tiers */}
      <div className="absolute -inset-px rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${tier.color}20, transparent 60%)` }} />
      
      <div className="relative glass-card rounded-[20px] overflow-hidden flex flex-col border border-border/30 hover:border-border/50 transition-all">
        {/* Top gradient accent */}
        <div className="h-1" style={{ background: `linear-gradient(90deg, ${tier.color}, ${tier.color}40)` }} />

        {/* Header with tier icon */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{ background: `linear-gradient(135deg, ${tier.color}20, ${tier.color}08)` }}>
                <Diamond className="w-5 h-5" style={{ color: tier.color }} />
              </div>
              <h3 className="font-serif text-xl font-bold" style={{ color: tier.color }}>{tier.name}</h3>
              <p className="text-[10px] text-muted-foreground mt-0.5">{bankName}</p>
            </div>
            <button
              onClick={() => toggle(tierId)}
              className="p-2 rounded-xl hover:bg-secondary/50 transition-colors"
            >
              <Heart className={`w-4 h-4 transition-colors ${isFav(tierId) ? "text-gold fill-gold" : "text-muted-foreground hover:text-gold"}`} />
            </button>
          </div>

          {/* Eligibility card */}
          <div className="rounded-xl p-3.5 mb-4" style={{ background: `${tier.color}08`, border: `1px solid ${tier.color}15` }}>
            <p className="text-[9px] uppercase tracking-wider font-semibold mb-1.5" style={{ color: tier.color }}>Eligibility</p>
            <p className="text-[11px] leading-relaxed text-muted-foreground">{tier.eligibility}</p>
          </div>

          {/* Eligible Cards */}
          <div className="mb-4">
            <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
              <CreditCard className="w-3 h-3" /> Cards
            </p>
            <div className="flex flex-wrap gap-1.5">
              {tier.eligibleCards.map((card) => (
                <span key={card} className="text-[10px] px-2.5 py-1 rounded-lg bg-secondary/50 text-foreground font-medium">{card}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="px-6 pb-4 flex-1">
          <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-2.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Benefits
          </p>
          <ul className="space-y-2">
            {visibleBenefits.map((b, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                <Check className="w-3 h-3 text-gold mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
          {hasMore && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-[11px] text-gold hover:text-gold-light transition-colors mt-3 font-medium"
            >
              {expanded ? (
                <>Show less <ChevronUp className="w-3 h-3" /></>
              ) : (
                <>+{tier.benefits.length - 4} more benefits <ChevronDown className="w-3 h-3" /></>
              )}
            </button>
          )}
        </div>

        {/* Bottom section */}
        <div className="px-6 pb-6 space-y-3">
          {/* RM Badge */}
          {tier.hasRM && (
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-gold/8 border border-gold/15">
              <div className="w-6 h-6 rounded-lg bg-gold/15 flex items-center justify-center">
                <Users className="w-3 h-3 text-gold" />
              </div>
              <span className="text-[11px] text-gold font-semibold">Dedicated Relationship Manager</span>
            </div>
          )}

          {/* Key Takeaways */}
          <div className="rounded-xl p-3.5 bg-secondary/20 border border-border/20">
            <p className="text-[10px] font-semibold text-gold mb-2 flex items-center gap-1.5">
              <Star className="w-3 h-3" /> Key Takeaways
            </p>
            <ul className="space-y-1">
              {tier.keyTakeaways.map((t, i) => (
                <li key={i} className="text-[11px] text-muted-foreground leading-relaxed">• {t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BankSection({ bank }: { bank: BankData }) {
  return (
    <div>
      <div className={`grid gap-6 ${bank.tiers.length === 2 ? "md:grid-cols-2 max-w-3xl mx-auto" : bank.tiers.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2 xl:grid-cols-4"}`}>
        {bank.tiers.map((tier, i) => (
          <TierCard key={tier.name} tier={tier} bankColor={bank.color} bankName={bank.name} index={i} />
        ))}
      </div>
    </div>
  );
}

export default function Banking() {
  const [activeBank, setActiveBank] = useState("hdfc");
  const [activeSection, setActiveSection] = useState<"wealth" | "family">("wealth");
  const selectedBank = banks.find((b) => b.id === activeBank) || banks[0];

  return (
    <PageLayout>
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Premium Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-gold/10"
            >
              <Landmark className="w-9 h-9 text-gold" />
            </motion.div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-5">
              Wealth <span className="gold-gradient">Banking</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
              Compare wealth tiers, eligibility criteria, and exclusive benefits across India's top banks
            </p>
          </motion.div>

          {/* Section toggle */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="flex justify-center gap-3 mb-10">
            <button
              onClick={() => setActiveSection("wealth")}
              className={`px-7 py-3.5 rounded-2xl text-sm font-medium flex items-center gap-2.5 transition-all ${
                activeSection === "wealth" ? "gold-btn shadow-lg shadow-gold/20" : "glass-card text-muted-foreground hover:text-foreground"
              }`}
            >
              <Diamond className="w-4 h-4" /> Wealth Banking
            </button>
            <button
              onClick={() => setActiveSection("family")}
              className={`px-7 py-3.5 rounded-2xl text-sm font-medium flex items-center gap-2.5 transition-all ${
                activeSection === "family" ? "gold-btn shadow-lg shadow-gold/20" : "glass-card text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users className="w-4 h-4" /> Family Banking
            </button>
          </motion.div>

          {/* Eligibility CTA */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-2xl mx-auto mb-12">
            <div className="glass-card rounded-2xl p-5 flex items-center justify-between border border-gold/10 bg-gradient-to-r from-gold/5 to-transparent">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Check My Eligibility</p>
                  <p className="text-xs text-muted-foreground">Find which wealth tier you qualify for</p>
                </div>
              </div>
              <Link to="/perk-ai" className="gold-btn px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-gold/15">
                <Sparkles className="w-3.5 h-3.5" /> Check Now
              </Link>
            </div>
          </motion.div>

          {activeSection === "wealth" ? (
            <>
              {/* Bank filter - premium pills */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="flex gap-2.5 flex-wrap justify-center mb-12">
                {banks.map((bank) => (
                  <button
                    key={bank.id}
                    onClick={() => setActiveBank(bank.id)}
                    className={`px-6 py-3 rounded-xl text-xs font-semibold transition-all ${
                      activeBank === bank.id
                        ? "bg-gold text-background shadow-lg shadow-gold/20"
                        : "glass-card text-muted-foreground hover:text-foreground hover:border-gold/20 hover:shadow-md"
                    }`}
                  >
                    {bank.name}
                  </button>
                ))}
              </motion.div>

              {/* Bank name heading */}
              <motion.div
                key={selectedBank.id + "-heading"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <h2 className="font-serif text-2xl font-bold">
                  {selectedBank.name} <span className="text-muted-foreground font-normal">Tiers</span>
                </h2>
              </motion.div>

              {/* Bank tiers */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedBank.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <BankSection bank={selectedBank} />
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
              <div className="glass-card rounded-3xl p-10 text-center border border-border/30">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mx-auto mb-6">
                  <Users className="w-9 h-9 text-gold" />
                </div>
                <h3 className="font-serif text-3xl font-bold mb-4">Family Banking Programs</h3>
                <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto leading-relaxed">
                  Pool balances across family members to qualify for higher wealth tiers with shared benefits.
                </p>
                <div className="grid sm:grid-cols-3 gap-5 mb-8">
                  {[
                    { icon: Globe, label: "Pool Balances", desc: "Combine family savings to unlock higher tiers" },
                    { icon: Star, label: "Shared Benefits", desc: "Lounge access & perks for all family members" },
                    { icon: Users, label: "Single RM", desc: "One relationship manager for the entire family" },
                  ].map((item) => (
                    <div key={item.label} className="glass-card rounded-2xl p-5 border border-border/20 hover:border-gold/20 transition-all">
                      <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-3">
                        <item.icon className="w-5 h-5 text-gold" />
                      </div>
                      <p className="text-sm font-semibold text-gold mb-1">{item.label}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <Link to="/perk-ai" className="gold-btn px-8 py-3.5 rounded-xl text-sm inline-flex items-center gap-2 shadow-lg shadow-gold/15">
                  Ask Perk AI about Family Banking <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
