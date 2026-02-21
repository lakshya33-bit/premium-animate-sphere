import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, CreditCard, Shield, Gift, TrendingUp, Plane, Users, Check } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { getCardById } from "@/data/cards";

export default function CardDetail() {
  const { id } = useParams<{ id: string }>();
  const card = getCardById(id || "");

  if (!card) {
    return (
      <PageLayout>
        <div className="py-32 text-center">
          <p className="text-lg text-muted-foreground">Card not found</p>
          <Link to="/cards" className="text-gold text-sm mt-4 inline-block">← Back to Cards</Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/cards" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-gold transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Cards
          </Link>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl overflow-hidden mb-8">
            <div className="h-32 sm:h-40 relative" style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}66)` }}>
              <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
              <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
                <div>
                  <p className="text-xs text-foreground/70 mb-1">{card.issuer} · {card.type}</p>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold">{card.name}</h1>
                </div>
                <div className="flex items-center gap-1.5 bg-background/30 backdrop-blur px-3 py-1.5 rounded-xl">
                  <Star className="w-4 h-4 text-gold fill-gold" />
                  <span className="text-sm font-semibold">{card.rating}</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Annual Fee", value: card.fee },
                  { label: "Reward Rate", value: card.rewards },
                  { label: "Lounge Access", value: card.lounge },
                  { label: "Network", value: card.network },
                ].map((s) => (
                  <div key={s.label} className="text-center bg-secondary/30 rounded-xl p-3">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</p>
                    <p className="text-sm font-semibold mt-1 text-gold">{s.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {card.bestFor.map((b) => (
                  <span key={b} className="text-xs px-3 py-1.5 rounded-full bg-gold/10 text-gold font-medium">{b}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Details grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Key Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-6 space-y-5">
              <h3 className="font-serif text-lg font-semibold flex items-center gap-2"><CreditCard className="w-4 h-4 text-gold" /> Card Details</h3>
              {[
                { label: "Min. Income", value: card.minIncome },
                { label: "Welcome Bonus", value: card.welcomeBonus },
                { label: "Reward Rate", value: card.rewardRate },
                { label: "Fuel Surcharge", value: card.fuelSurcharge },
                { label: "Forex Markup", value: card.forexMarkup },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center border-b border-border/20 pb-3">
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </motion.div>

            {/* Perks & Vouchers */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-2xl p-6 space-y-5">
              <div>
                <h3 className="font-serif text-lg font-semibold mb-3 flex items-center gap-2"><Gift className="w-4 h-4 text-gold" /> Key Perks</h3>
                <div className="space-y-2">
                  {card.perks.map((p) => (
                    <div key={p} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                      <span className="text-sm">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-gold" /> Top Voucher Rates</h3>
                <div className="flex flex-wrap gap-2">
                  {card.vouchers.map((v) => (
                    <span key={v} className="text-xs px-3 py-1.5 rounded-lg bg-secondary/60">{v}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Milestones & Insurance */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-2xl p-6">
              <h3 className="font-serif text-lg font-semibold mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-gold" /> Milestone Benefits</h3>
              <div className="space-y-3">
                {card.milestones.map((m, i) => (
                  <div key={i} className="flex items-start gap-3 bg-secondary/20 rounded-xl p-3">
                    <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[10px] font-bold text-gold">{i + 1}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{m}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-2xl p-6">
              <h3 className="font-serif text-lg font-semibold mb-4 flex items-center gap-2"><Shield className="w-4 h-4 text-gold" /> Insurance Coverage</h3>
              <div className="space-y-3">
                {card.insurance.map((ins, i) => (
                  <div key={i} className="flex items-start gap-3 bg-secondary/20 rounded-xl p-3">
                    <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{ins}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
