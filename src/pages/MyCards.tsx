import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Star, ChevronRight, Plus, ArrowRight, Wallet, X, Eye, ExternalLink, GitCompare, Check } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { useMyCards } from "@/hooks/use-my-cards";
import FavoriteButton from "@/components/FavoriteButton";
import { useFavorites } from "@/hooks/use-favorites";
import { cards } from "@/data/cards";

export default function MyCards() {
  const { has: isMyCard, toggle: toggleMyCard, count } = useMyCards();
  const { isFav, toggle: toggleFav } = useFavorites("card");
  const myCards = cards.filter((c) => isMyCard(c.id));

  return (
    <PageLayout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mb-5 shadow-lg shadow-gold/10"
            >
              <Wallet className="w-7 h-7 text-gold" />
            </motion.div>
            <p className="text-sm font-medium tracking-widest uppercase text-gold mb-3">Your Wallet</p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              My <span className="gold-gradient">Cards</span>
            </h1>
            <p className="text-muted-foreground">Track and manage your credit cards. <span className="text-gold font-semibold">{myCards.length} cards</span> in your wallet.</p>
          </motion.div>

          {myCards.length === 0 ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-24">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-gold/15 to-gold/5 flex items-center justify-center mx-auto mb-6">
                <CreditCard className="w-10 h-10 text-gold/40" />
              </div>
              <p className="font-serif text-2xl font-bold mb-3">No cards added yet</p>
              <p className="text-sm text-muted-foreground mb-8 max-w-sm mx-auto">Browse our card catalog and tap "Add to My Cards" to build your wallet.</p>
              <Link to="/cards" className="gold-btn px-8 py-3.5 rounded-xl text-sm inline-flex items-center gap-2 shadow-lg shadow-gold/15">
                Browse Cards <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {myCards.map((card, i) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: i * 0.08 }}
                    layout
                    className="glass-card rounded-2xl p-6 group border border-border/20 hover:border-gold/15 transition-all duration-300 hover:shadow-lg hover:shadow-gold/5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                      {/* Card visual */}
                      <div className="w-full sm:w-48 h-28 rounded-xl overflow-hidden shadow-xl shadow-black/20 flex-shrink-0 relative">
                        <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}99)` }}>
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]" />
                          <div className="absolute inset-0 p-4 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                              <span className="text-[10px] font-medium text-white/70">{card.issuer}</span>
                              <span className="text-[10px] font-medium text-white/70">{card.network}</span>
                            </div>
                            <div>
                              <p className="text-xs font-bold text-white">{card.name}</p>
                              <p className="text-[10px] text-white/60 mt-0.5">•••• •••• •••• ••••</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-serif text-lg font-bold">{card.name}</h3>
                            <p className="text-xs text-muted-foreground">{card.issuer} · {card.network} · {card.type}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <FavoriteButton isFav={isFav(card.id)} onToggle={() => toggleFav(card.id)} />
                            <button
                              onClick={() => toggleMyCard(card.id)}
                              className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                              title="Remove from My Cards"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="text-xs px-2.5 py-1 rounded-lg bg-gold/10 text-gold">{card.fee}/yr</span>
                          <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-secondary/60"><Star className="w-3 h-3 text-gold fill-gold" />{card.rating}</span>
                          <span className="text-xs px-2.5 py-1 rounded-lg bg-secondary/60 text-muted-foreground">{card.rewards}</span>
                          <span className="text-xs px-2.5 py-1 rounded-lg bg-secondary/60 text-muted-foreground">{card.lounge} lounge</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {card.perks.map((p) => (
                            <span key={p} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/40 text-muted-foreground">{p}</span>
                          ))}
                        </div>
                        <div className="flex gap-3">
                          <Link to={`/cards/${card.id}`} className="text-xs text-gold hover:text-gold-light transition-colors flex items-center gap-1">
                            View Details <ChevronRight className="w-3 h-3" />
                          </Link>
                          <Link to="/compare" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                            Compare <ChevronRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <Link to="/cards" className="glass-card rounded-2xl p-6 flex items-center justify-center gap-3 hover:border-gold/30 transition-all group block border border-border/20">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <Plus className="w-5 h-5 text-gold" />
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Add More Cards</span>
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
