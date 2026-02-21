import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Eye, ExternalLink, X, Clock, CreditCard, Tag, Heart, Share2, Globe, ArrowUpRight, Gift, Sparkles, TrendingUp, Star } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
import FavoriteButton from "@/components/FavoriteButton";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { vouchers, voucherCategories, iconMap, type Voucher } from "@/data/vouchers";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

function QuickView({ voucher, open, onClose }: { voucher: Voucher | null; open: boolean; onClose: () => void }) {
  if (!voucher) return null;
  const Icon = iconMap[voucher.category] || Gift;
  const bestPlatform = voucher.platformRates.find((p) => p.highlight);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="border-0 bg-transparent shadow-none p-0 sm:max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="rounded-3xl overflow-hidden" style={{ background: `linear-gradient(180deg, ${voucher.color}08, transparent 200px)` }}>
          <div className="glass-card rounded-3xl border border-border/30 overflow-hidden">
            {/* Premium Header with gradient accent */}
            <div className="relative p-6 pb-5">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent" />
              <div className="relative flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: `linear-gradient(135deg, ${voucher.color}25, ${voucher.color}10)`, border: `1px solid ${voucher.color}30` }}>
                    <Icon className="w-8 h-8" style={{ color: voucher.color }} />
                  </div>
                  <div>
                    <DialogTitle className="font-serif text-2xl font-bold tracking-tight">{voucher.name}</DialogTitle>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-secondary/60 text-muted-foreground font-medium">{voucher.category}</span>
                      {bestPlatform && (
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-gold/15 text-gold font-medium flex items-center gap-1">
                          <TrendingUp className="w-2.5 h-2.5" /> Best: {bestPlatform.savings}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button className="p-2.5 rounded-xl glass-card text-muted-foreground hover:text-foreground transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <Link to={`/vouchers/${voucher.id}`} onClick={onClose} className="p-2.5 rounded-xl glass-card text-muted-foreground hover:text-foreground transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Quick stats */}
              <div className="flex gap-3 mt-5">
                {[
                  { label: "Best Rate", value: voucher.bestRate, icon: Star },
                  { label: "Validity", value: voucher.validity.split(" ").slice(0, 2).join(" "), icon: Clock },
                  { label: "Platforms", value: `${voucher.platformRates.length} live`, icon: Globe },
                ].map((s) => (
                  <div key={s.label} className="flex-1 glass-card rounded-xl p-3 text-center">
                    <s.icon className="w-3.5 h-3.5 text-gold mx-auto mb-1.5" />
                    <p className="text-xs font-semibold">{s.value}</p>
                    <p className="text-[9px] text-muted-foreground mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform comparison */}
            <div className="px-4 pb-2">
              <div className="flex items-center gap-2 px-2 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Compare Across Platforms</p>
              </div>
              <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
                {voucher.platformRates.map((pr, i) => (
                  <motion.div
                    key={pr.platform}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`rounded-2xl p-4 flex items-center gap-4 transition-all group/row hover:scale-[1.01] ${
                      pr.highlight
                        ? "border border-gold/30 bg-gradient-to-r from-gold/8 to-transparent shadow-sm shadow-gold/5"
                        : "glass-card hover:border-border/50"
                    }`}
                  >
                    {/* Platform avatar */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm ${
                      pr.highlight ? "bg-gold/15 text-gold" : "bg-secondary/60 text-foreground"
                    }`}>
                      {pr.platform.charAt(0)}
                    </div>

                    {/* Platform info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm">{pr.platform}</h4>
                        {pr.highlight && (
                          <span className="text-[8px] px-1.5 py-0.5 rounded bg-gold/20 text-gold font-bold uppercase">Best</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {pr.live ? (
                          <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            LIVE
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] text-muted-foreground/60">
                            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                            Offline
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Rate */}
                    <div className="text-right flex-shrink-0 mr-1">
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider">{pr.type}</p>
                      <p className={`text-base font-bold ${pr.highlight ? "text-gold" : "text-foreground"}`}>{pr.savings}</p>
                      {pr.bestCard && (
                        <span className="inline-flex items-center gap-1 text-[8px] px-2 py-0.5 rounded-full bg-gold/10 text-gold mt-1">
                          <CreditCard className="w-2 h-2" /> {pr.bestCard}
                        </span>
                      )}
                    </div>

                    {/* Buy button */}
                    <button className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 flex-shrink-0 ${
                      pr.highlight
                        ? "gold-btn shadow-lg shadow-gold/20"
                        : "bg-secondary/80 hover:bg-secondary text-foreground"
                    }`}>
                      Buy Now <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer with denominations */}
            <div className="p-4 pt-3 border-t border-border/20 mx-4 mb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    {voucher.denominations.slice(0, 4).map((d) => (
                      <span key={d} className="text-[10px] px-2 py-0.5 rounded-lg bg-secondary/40 text-muted-foreground">₹{d}</span>
                    ))}
                    {voucher.denominations.length > 4 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-lg bg-secondary/40 text-muted-foreground">+{voucher.denominations.length - 4}</span>
                    )}
                  </div>
                </div>
                <Link
                  to={`/vouchers/${voucher.id}`}
                  onClick={onClose}
                  className="text-xs text-gold hover:text-gold-light transition-colors flex items-center gap-1 font-medium"
                >
                  Full Details <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Vouchers() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [quickViewVoucher, setQuickViewVoucher] = useState<Voucher | null>(null);
  const { toggle: toggleFav, isFav } = useFavorites("voucher");
  const filtered = vouchers.filter((v) => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.category.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "All" || v.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <PageLayout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-sm font-medium tracking-widest uppercase text-gold mb-3">Voucher Marketplace</p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Browse <span className="gold-gradient">Vouchers</span></h1>
            <p className="text-muted-foreground max-w-xl mb-8">Compare voucher rates across 500+ brands. Find the best redemption deals for your credit card reward points.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search brands or categories..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-secondary/50 border-border/50" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} className="flex gap-2 flex-wrap mb-10">
            {voucherCategories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${activeCategory === cat ? "bg-gold text-background" : "glass-card text-muted-foreground hover:text-foreground hover:border-gold/30"}`}>{cat}</button>
            ))}
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((v, i) => {
              const Icon = iconMap[v.category] || Gift;
              return (
                <motion.div key={v.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, duration: 0.4 }} className="tilt-card glass-card rounded-2xl overflow-hidden group relative hover:shadow-lg hover:shadow-gold/5 hover:-translate-y-1 transition-all duration-300">
                  <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${v.color}, ${v.color}40)` }} />
                  <div className="p-6 relative">
                  <div className="absolute top-4 right-4 z-10">
                    <FavoriteButton
                      isFav={isFav(v.id)}
                      onToggle={() => toggleFav(v.id)}
                      className="hover:bg-secondary/50"
                    />
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${v.color}15` }}>
                      <Icon className="w-5 h-5" style={{ color: v.color }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{v.name}</h3>
                      <p className="text-xs text-muted-foreground">{v.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-medium">{v.discount}</span>
                    <span className="text-xs text-muted-foreground">Best: {v.bestRate}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">{v.description}</p>
                  <div className="border-t border-border/30 pt-3 mb-3">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Top Cards</p>
                    <div className="flex flex-wrap gap-1">{v.cards.map((c) => <span key={c} className="text-[10px] px-2 py-0.5 rounded bg-secondary/60 text-muted-foreground">{c}</span>)}</div>
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <button onClick={() => setQuickViewVoucher(v)} className="flex-1 text-xs py-2 rounded-lg gold-outline-btn flex items-center justify-center gap-1"><Eye className="w-3 h-3" /> Quick View</button>
                    <Link to={`/vouchers/${v.id}`} className="flex-1 text-xs py-2 rounded-lg gold-btn flex items-center justify-center gap-1"><ExternalLink className="w-3 h-3" /> Full View</Link>
                  </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filtered.length === 0 && <div className="text-center py-20 text-muted-foreground"><p className="text-lg">No vouchers found</p><p className="text-sm mt-2">Try a different search or category</p></div>}
        </div>
      </section>

      <QuickView voucher={quickViewVoucher} open={!!quickViewVoucher} onClose={() => setQuickViewVoucher(null)} />
    </PageLayout>
  );
}
