import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, CreditCard, Shield, Gift, TrendingUp, Check, Wallet, ChevronRight, Home } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { getCardById, cards } from "@/data/cards";
import { useMyCards } from "@/hooks/use-my-cards";

export default function CardDetail() {
  const { id } = useParams<{ id: string }>();
  const card = getCardById(id || "");
  const { toggle: toggleMyCard, has: isMyCard } = useMyCards();

  const similarCards = cards.filter((c) => c.id !== id).slice(0, 3);

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
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
            <Link to="/" className="hover:text-gold transition-colors flex items-center gap-1"><Home className="w-3 h-3" /> Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/cards" className="hover:text-gold transition-colors">Know Your Cards</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{card.name}</span>
          </nav>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl overflow-hidden mb-8">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                {/* Card image */}
                <div className="w-full sm:w-64 flex-shrink-0">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative aspect-[1.586/1] rounded-xl overflow-hidden shadow-2xl shadow-black/50"
                  >
                    {card.image ? (
                      <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}66, ${card.color}33)` }}>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]" />
                        <div className="absolute bottom-4 left-5">
                          <p className="text-xs text-white/50 font-medium tracking-widest uppercase">{card.issuer}</p>
                          <p className="text-sm text-white/80 font-semibold mt-0.5">{card.name}</p>
                        </div>
                        <div className="absolute top-4 right-5 text-white/40 text-[10px] font-medium tracking-wider uppercase">{card.network}</div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
                  </motion.div>
                </div>
                {/* Card info */}
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">{card.issuer} · {card.type}</p>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-3">{card.name}</h1>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1.5 bg-gold/10 px-3 py-1.5 rounded-xl">
                      <Star className="w-4 h-4 text-gold fill-gold" />
                      <span className="text-sm font-semibold">{card.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{card.network} Network</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    {[
                      { label: "Annual Fee", value: card.fee },
                      { label: "Reward Rate", value: card.rewards },
                      { label: "Lounge Access", value: card.lounge },
                      { label: "Forex Markup", value: card.forexMarkup },
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
              </div>
            </div>
          </motion.div>

          {/* Details grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
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
          <div className="grid md:grid-cols-2 gap-6 mb-8">
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

          {/* Similar Cards */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-8">
            <h3 className="font-serif text-lg font-semibold mb-4">Similar Cards</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {similarCards.map((c) => (
                <Link key={c.id} to={`/cards/${c.id}`} className="glass-card rounded-xl overflow-hidden group hover:shadow-lg hover:shadow-gold/10 hover:-translate-y-1 transition-all duration-300">
                  <div className="relative aspect-[1.586/1] overflow-hidden">
                    {c.image ? (
                      <img src={c.image} alt={c.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${c.color}, ${c.color}66)` }} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-3 right-3">
                      <h4 className="font-serif font-bold text-xs">{c.name}</h4>
                      <p className="text-[10px] text-muted-foreground">{c.issuer}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Sticky CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="sticky bottom-6 z-30"
          >
            <div className="glass-card rounded-2xl border border-gold/20 shadow-2xl shadow-gold/10 p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-[26px] rounded-lg overflow-hidden shadow-md flex-shrink-0">
                  {card.image ? (
                    <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}88)` }} />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold">{card.name}</p>
                  <p className="text-[10px] text-muted-foreground">{card.fee}/yr</p>
                </div>
              </div>
              <button
                onClick={() => toggleMyCard(card.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${
                  isMyCard(card.id)
                    ? "bg-gold/15 text-gold border border-gold/30"
                    : "gold-btn"
                }`}
              >
                {isMyCard(card.id) ? <><Check className="w-4 h-4" /> In My Cards</> : <><Wallet className="w-4 h-4" /> Add to My Cards</>}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
