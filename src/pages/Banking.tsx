import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Landmark, Diamond, Crown, Heart, Check, ChevronDown, ChevronUp, Users, Shield, ArrowRight, Star, Sparkles, CreditCard, Globe, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { banks, type BankData, type BankingTier } from "@/data/banking";
import { useFavorites } from "@/hooks/use-favorites";
import FavoriteButton from "@/components/FavoriteButton";

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
      <div className="absolute -inset-[1px] rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: `linear-gradient(135deg, ${tier.color}30, transparent 50%, ${tier.color}10)` }} />

      <div className="relative glass-card rounded-[22px] overflow-hidden flex flex-col border border-border/20 hover:border-border/40 transition-all duration-500">
        {/* Gradient header */}
        <div className="relative p-6 pb-5" style={{ background: `linear-gradient(135deg, ${tier.color}12, ${tier.color}04, transparent)` }}>
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-[0.06]" style={{ background: `radial-gradient(circle, ${tier.color}, transparent)` }} />
          
          <div className="flex items-start justify-between relative z-10">
            <div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-lg" style={{ background: `linear-gradient(135deg, ${tier.color}25, ${tier.color}10)`, boxShadow: `0 8px 24px ${tier.color}15` }}>
                <Diamond className="w-5 h-5" style={{ color: tier.color }} />
              </div>
              <h3 className="font-serif text-xl font-bold tracking-tight" style={{ color: tier.color }}>{tier.name}</h3>
              <p className="text-[11px] text-muted-foreground mt-1 font-medium">{bankName}</p>
            </div>
            <FavoriteButton
              isFav={isFav(tierId)}
              onToggle={() => toggle(tierId)}
              className="hover:bg-secondary/50"
              size="md"
            />
          </div>
        </div>

        {/* Eligibility */}
        <div className="px-6 pb-4">
          <div className="rounded-xl p-4" style={{ background: `${tier.color}06`, border: `1px solid ${tier.color}12` }}>
            <p className="text-[9px] uppercase tracking-[0.15em] font-bold mb-2 flex items-center gap-1.5" style={{ color: tier.color }}>
              <Shield className="w-3 h-3" /> Eligibility
            </p>
            <p className="text-[11px] leading-[1.7] text-muted-foreground">{tier.eligibility}</p>
          </div>
        </div>

        {/* Eligible Cards */}
        <div className="px-6 pb-4">
          <p className="text-[9px] text-muted-foreground uppercase tracking-[0.15em] mb-2.5 flex items-center gap-1.5 font-bold">
            <CreditCard className="w-3 h-3" /> Eligible Cards
          </p>
          <div className="flex flex-wrap gap-1.5">
            {tier.eligibleCards.map((card) => (
              <span key={card} className="text-[10px] px-3 py-1.5 rounded-lg bg-secondary/40 text-foreground font-medium border border-border/20">{card}</span>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="px-6 pb-4 flex-1">
          <p className="text-[9px] text-muted-foreground uppercase tracking-[0.15em] mb-3 flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3 h-3" /> Benefits
          </p>
          <ul className="space-y-2.5">
            {visibleBenefits.map((b, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[12px] text-muted-foreground group/item">
                <div className="w-4 h-4 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${tier.color}12` }}>
                  <Check className="w-2.5 h-2.5" style={{ color: tier.color }} />
                </div>
                <span className="leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
          {hasMore && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1.5 text-[11px] hover:opacity-80 transition-all mt-3.5 font-semibold" style={{ color: tier.color }}
            >
              {expanded ? (
                <>Show less <ChevronUp className="w-3 h-3" /></>
              ) : (
                <>+{tier.benefits.length - 4} more <ChevronDown className="w-3 h-3" /></>
              )}
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 space-y-3">
          {tier.hasRM && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gold/15" style={{ background: `linear-gradient(135deg, hsl(var(--gold) / 0.06), transparent)` }}>
              <div className="w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center shadow-sm">
                <Users className="w-3.5 h-3.5 text-gold" />
              </div>
              <div>
                <span className="text-[11px] text-gold font-bold block">Dedicated RM</span>
                <span className="text-[10px] text-muted-foreground">Personal relationship manager</span>
              </div>
            </div>
          )}

          <div className="rounded-xl p-4 bg-secondary/15 border border-border/15">
            <p className="text-[10px] font-bold text-gold mb-2 flex items-center gap-1.5">
              <Star className="w-3 h-3" /> Key Takeaways
            </p>
            <ul className="space-y-1.5">
              {tier.keyTakeaways.map((t, i) => (
                <li key={i} className="text-[11px] text-muted-foreground leading-relaxed flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                  {t}
                </li>
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
    <div className={`grid gap-6 ${bank.tiers.length === 2 ? "md:grid-cols-2 max-w-3xl mx-auto" : bank.tiers.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2 xl:grid-cols-4"}`}>
      {bank.tiers.map((tier, i) => (
        <TierCard key={tier.name} tier={tier} bankColor={bank.color} bankName={bank.name} index={i} />
      ))}
    </div>
  );
}

export default function Banking() {
  const [activeBank, setActiveBank] = useState("hdfc");
  const [activeSection, setActiveSection] = useState<"wealth" | "family">("wealth");
  const selectedBank = banks.find((b) => b.id === activeBank) || banks[0];

  return (
    <PageLayout>
      <section className="py-16 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Premium Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="relative w-24 h-24 mx-auto mb-8"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gold/20 to-gold/5 shadow-2xl shadow-gold/15" />
              <div className="absolute inset-0 rounded-3xl flex items-center justify-center">
                <Landmark className="w-10 h-10 text-gold" />
              </div>
              <div className="absolute -inset-3 rounded-3xl border border-gold/10 animate-pulse" />
            </motion.div>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-gold mb-4">Premium Banking</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 tracking-tight">
              Wealth <span className="gold-gradient">Banking</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
              Compare wealth tiers, eligibility criteria, and exclusive benefits across India's top banks
            </p>
          </motion.div>

          {/* Section toggle */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="flex justify-center gap-3 mb-12">
            {[
              { key: "wealth" as const, icon: Diamond, label: "Wealth Banking" },
              { key: "family" as const, icon: Users, label: "Family Banking" },
            ].map((s) => (
              <button
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                className={`px-8 py-4 rounded-2xl text-sm font-semibold flex items-center gap-2.5 transition-all duration-300 ${
                  activeSection === s.key ? "gold-btn shadow-xl shadow-gold/20" : "glass-card text-muted-foreground hover:text-foreground hover:shadow-lg"
                }`}
              >
                <s.icon className="w-4 h-4" /> {s.label}
              </button>
            ))}
          </motion.div>

          {/* Stats row */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-14">
            {[
              { label: "Banks", value: "5+", icon: Landmark },
              { label: "Wealth Tiers", value: "14+", icon: Crown },
              { label: "Min. AMB", value: "₹1L", icon: TrendingUp },
              { label: "Top Tier", value: "₹10Cr+", icon: Award },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 + i * 0.05 }}
                className="glass-card rounded-2xl p-4 text-center border border-border/20 hover:border-gold/20 transition-all duration-300 group"
              >
                <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-2.5 group-hover:bg-gold/15 transition-colors">
                  <stat.icon className="w-4 h-4 text-gold" />
                </div>
                <p className="text-lg font-serif font-bold">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Eligibility CTA */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="max-w-2xl mx-auto mb-14">
            <div className="glass-card rounded-2xl p-6 flex items-center justify-between border border-gold/10" style={{ background: `linear-gradient(135deg, hsl(var(--gold) / 0.05), transparent)` }}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gold/15 flex items-center justify-center shadow-lg shadow-gold/10">
                  <Shield className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-sm font-bold">Check My Eligibility</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Find which wealth tier you qualify for</p>
                </div>
              </div>
              <Link to="/perk-ai" className="gold-btn px-6 py-3 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg shadow-gold/15">
                <Sparkles className="w-3.5 h-3.5" /> Check Now
              </Link>
            </div>
          </motion.div>

          {activeSection === "wealth" ? (
            <>
              {/* Bank filter pills */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="flex gap-2.5 flex-wrap justify-center mb-14">
                {banks.map((bank) => (
                  <button
                    key={bank.id}
                    onClick={() => setActiveBank(bank.id)}
                    className={`px-7 py-3 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 ${
                      activeBank === bank.id
                        ? "bg-gold text-background shadow-xl shadow-gold/25 scale-105"
                        : "glass-card text-muted-foreground hover:text-foreground hover:border-gold/20 hover:shadow-md"
                    }`}
                  >
                    {bank.name}
                  </button>
                ))}
              </motion.div>

              {/* Bank heading */}
              <motion.div
                key={selectedBank.id + "-heading"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10"
              >
                <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                  {selectedBank.name} <span className="text-muted-foreground font-normal">Tiers</span>
                </h2>
                <p className="text-xs text-muted-foreground mt-2">{selectedBank.tiers.length} tiers available</p>
              </motion.div>

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
              <div className="glass-card rounded-3xl p-10 text-center border border-border/20">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-gold/10">
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
                    <div key={item.label} className="glass-card rounded-2xl p-6 border border-border/15 hover:border-gold/20 transition-all duration-300 group">
                      <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-gold/15 transition-colors">
                        <item.icon className="w-5 h-5 text-gold" />
                      </div>
                      <p className="text-sm font-bold text-gold mb-1.5">{item.label}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <Link to="/perk-ai" className="gold-btn px-8 py-3.5 rounded-xl text-sm inline-flex items-center gap-2 shadow-lg shadow-gold/15 font-semibold">
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
