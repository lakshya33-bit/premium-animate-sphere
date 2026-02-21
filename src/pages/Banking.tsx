import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Landmark, Diamond, Crown, Heart, Check, ChevronDown, ChevronUp, Users, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { banks, type BankData, type BankingTier } from "@/data/banking";
import { useFavorites } from "@/hooks/use-favorites";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function TierCard({ tier, bankColor, index }: { tier: BankingTier; bankColor: string; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const { toggle, isFav } = useFavorites("card");
  const tierId = `banking-${tier.name.toLowerCase().replace(/\s+/g, "-")}`;
  const visibleBenefits = expanded ? tier.benefits : tier.benefits.slice(0, 5);
  const hasMore = tier.benefits.length > 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="glass-card rounded-2xl overflow-hidden flex flex-col"
    >
      {/* Top accent */}
      <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${tier.color}, ${tier.color}66)` }} />

      <div className="p-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-serif text-lg font-bold" style={{ color: tier.color }}>{tier.name}</h3>
          <button
            onClick={() => toggle(tierId)}
            className="p-1.5 rounded-lg hover:bg-secondary/50 transition-colors"
          >
            <Heart className={`w-4 h-4 transition-colors ${isFav(tierId) ? "text-gold fill-gold" : "text-muted-foreground hover:text-gold"}`} />
          </button>
        </div>

        {/* Eligibility */}
        <p className="text-xs leading-relaxed mb-4" style={{ color: tier.color }}>
          {tier.eligibility}
        </p>

        {/* Eligible Cards */}
        <div className="mb-4">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">Eligible Cards</p>
          <div className="flex flex-wrap gap-1.5">
            {tier.eligibleCards.map((card) => (
              <span key={card} className="text-[11px] px-2.5 py-1 rounded-lg bg-secondary/60 text-foreground">{card}</span>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-4 flex-1">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Benefits</p>
          <ul className="space-y-1.5">
            {visibleBenefits.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="text-gold mt-0.5">•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          {hasMore && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-[11px] text-gold hover:text-gold-light transition-colors mt-2"
            >
              {expanded ? (
                <>Show less <ChevronUp className="w-3 h-3" /></>
              ) : (
                <>+{tier.benefits.length - 5} more <ChevronDown className="w-3 h-3" /></>
              )}
            </button>
          )}
        </div>

        {/* RM Badge */}
        {tier.hasRM && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gold/10 mb-4">
            <Check className="w-3.5 h-3.5 text-gold" />
            <span className="text-xs text-gold font-medium">Dedicated Relationship Manager</span>
          </div>
        )}

        {/* Key Takeaways */}
        <div className="glass-card rounded-xl p-4 mb-4">
          <p className="text-xs font-semibold text-gold mb-2 flex items-center gap-1.5">
            💡 Key Takeaways
          </p>
          <ul className="space-y-1">
            {tier.keyTakeaways.map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="text-gold">•</span> {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Compare button */}
        <button className="w-full py-2.5 rounded-xl gold-outline-btn text-xs flex items-center justify-center gap-2">
          <ArrowRight className="w-3.5 h-3.5" /> Compare
        </button>
      </div>
    </motion.div>
  );
}

function BankSection({ bank }: { bank: BankData }) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card">
          <Landmark className="w-5 h-5 text-gold" />
          <h2 className="font-serif text-xl font-bold">
            {bank.name} <span className="gold-gradient">Wealth Banking Tiers</span>
          </h2>
        </div>
      </motion.div>

      <div className={`grid gap-5 ${bank.tiers.length === 2 ? "md:grid-cols-2 max-w-3xl mx-auto" : bank.tiers.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2 xl:grid-cols-4"}`}>
        {bank.tiers.map((tier, i) => (
          <TierCard key={tier.name} tier={tier} bankColor={bank.color} index={i} />
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
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-5">
              <Landmark className="w-7 h-7 text-gold" />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Banking <span className="gold-gradient">Guides</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Understand wealth tiers and family banking programs at top Indian banks
            </p>
          </motion.div>

          {/* Section toggle */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex justify-center gap-3 mb-8">
            <button
              onClick={() => setActiveSection("wealth")}
              className={`px-6 py-3 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${
                activeSection === "wealth" ? "gold-btn" : "glass-card text-muted-foreground hover:text-foreground"
              }`}
            >
              <Diamond className="w-4 h-4" /> Wealth Banking
            </button>
            <button
              onClick={() => setActiveSection("family")}
              className={`px-6 py-3 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${
                activeSection === "family" ? "gold-btn" : "glass-card text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users className="w-4 h-4" /> Family Banking
            </button>
          </motion.div>

          {/* Eligibility CTA */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="max-w-2xl mx-auto mb-10">
            <div className="glass-card rounded-2xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Check My Eligibility</p>
                  <p className="text-xs text-muted-foreground">Find which wealth tier you qualify for</p>
                </div>
              </div>
              <Link to="/perk-ai" className="gold-btn px-4 py-2 rounded-lg text-xs flex items-center gap-1.5">
                🎯 Check Now
              </Link>
            </div>
          </motion.div>

          {activeSection === "wealth" ? (
            <>
              {/* Bank filter */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex gap-2 flex-wrap justify-center mb-10">
                {banks.map((bank) => (
                  <button
                    key={bank.id}
                    onClick={() => setActiveBank(bank.id)}
                    className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all ${
                      activeBank === bank.id
                        ? "bg-gold text-background"
                        : "glass-card text-muted-foreground hover:text-foreground hover:border-gold/30"
                    }`}
                  >
                    {bank.name}
                  </button>
                ))}
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
              <div className="glass-card rounded-2xl p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-5">
                  <Users className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-3">Family Banking Programs</h3>
                <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
                  Family banking programs let you pool balances across family members to qualify for higher wealth tiers. Coming soon with detailed comparisons.
                </p>
                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Pool Balances", desc: "Combine family savings to unlock higher tiers" },
                    { label: "Shared Benefits", desc: "Lounge access & perks for all family members" },
                    { label: "Single RM", desc: "One relationship manager for the entire family" },
                  ].map((item) => (
                    <div key={item.label} className="glass-card rounded-xl p-4">
                      <p className="text-sm font-semibold text-gold mb-1">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <Link to="/perk-ai" className="gold-btn px-6 py-3 rounded-xl text-sm inline-flex items-center gap-2">
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
