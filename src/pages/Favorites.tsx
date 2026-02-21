import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, CreditCard, Gift, BookOpen, ChevronRight, Clock, Star, Landmark, Check, GitCompare, Sparkles, ArrowRight, Filter, Eye, User, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import BackToTop from "@/components/BackToTop";
import { useFavorites } from "@/hooks/use-favorites";
import { cards } from "@/data/cards";
import { vouchers, iconMap } from "@/data/vouchers";
import { guides } from "@/data/guides";
import { banks } from "@/data/banking";

type FilterType = "all" | "card" | "voucher" | "guide" | "banking";

function parseMinBalance(eligibility: string): string | null {
  const match = eligibility.match(/₹([\d,.]+\s*(?:Lakhs?|Crores?|L|Cr))/i);
  return match ? `₹${match[1]}` : null;
}

const categoryEmptyStates: Record<Exclude<FilterType, "all">, { icon: typeof Heart; label: string; cta: string; path: string }> = {
  card: { icon: CreditCard, label: "No favorite cards yet", cta: "Browse Cards", path: "/cards" },
  voucher: { icon: Gift, label: "No favorite vouchers yet", cta: "Browse Vouchers", path: "/vouchers" },
  guide: { icon: BookOpen, label: "No favorite guides yet", cta: "Browse Guides", path: "/guides" },
  banking: { icon: Landmark, label: "No favorite banking tiers yet", cta: "Browse Banking", path: "/banking" },
};

export default function Favorites() {
  const [filter, setFilter] = useState<FilterType>("all");
  const { isFav: isCardFav, toggle: toggleCard } = useFavorites("card");
  const { isFav: isVoucherFav, toggle: toggleVoucher } = useFavorites("voucher");
  const { isFav: isGuideFav, toggle: toggleGuide } = useFavorites("guide");
  const { isFav: isBankingFav, toggle: toggleBanking } = useFavorites("banking");

  useEffect(() => {
    document.title = "My Favorites | CardPerks";
  }, []);

  const favCards = cards.filter((c) => isCardFav(c.id));
  const favVouchers = vouchers.filter((v) => isVoucherFav(v.id));
  const favGuides = guides.filter((g) => isGuideFav(g.slug));
  const favBankingTiers = banks.flatMap((bank) =>
    bank.tiers
      .filter((tier) => isBankingFav(`banking-${tier.name.toLowerCase().replace(/\s+/g, "-")}`))
      .map((tier) => ({ ...tier, bankName: bank.name, bankId: bank.id }))
  );
  const totalCount = favCards.length + favVouchers.length + favGuides.length + favBankingTiers.length;

  const counts = { all: totalCount, card: favCards.length, voucher: favVouchers.length, guide: favGuides.length, banking: favBankingTiers.length };
  const filters: { key: FilterType; label: string; icon: typeof Heart }[] = [
    { key: "all", label: "All", icon: Sparkles },
    { key: "card", label: "Cards", icon: CreditCard },
    { key: "voucher", label: "Vouchers", icon: Gift },
    { key: "guide", label: "Guides", icon: BookOpen },
    { key: "banking", label: "Banking", icon: Landmark },
  ];

  const showCards = filter === "all" || filter === "card";
  const showVouchers = filter === "all" || filter === "voucher";
  const showGuides = filter === "all" || filter === "guide";
  const showBanking = filter === "all" || filter === "banking";

  // Stats for category breakdown
  const categoryStats = [
    { key: "card" as const, icon: CreditCard, label: "Cards", count: favCards.length },
    { key: "voucher" as const, icon: Gift, label: "Vouchers", count: favVouchers.length },
    { key: "guide" as const, icon: BookOpen, label: "Guides", count: favGuides.length },
    { key: "banking" as const, icon: Landmark, label: "Banking", count: favBankingTiers.length },
  ].filter((s) => s.count > 0);

  return (
    <PageLayout>
      <section className="py-16 relative">
        {/* Gold radial gradient accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,hsl(var(--gold)/0.08),transparent_70%)] pointer-events-none" />

        <div className="container mx-auto px-4 relative">
          {/* Premium Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: "spring" }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mb-5 shadow-lg shadow-gold/10"
                >
                  <Heart className="w-7 h-7 text-gold" />
                </motion.div>
                <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-3">
                  My <span className="gold-gradient">Favorites</span>
                </h1>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
                  Your curated collection of cards, vouchers, guides, and banking tiers — all in one place.
                </p>
              </div>
              {/* Category breakdown stats */}
              {totalCount > 0 && (
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="glass-card rounded-2xl px-5 py-3 flex items-center gap-3 border border-gold/10">
                    <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <p className="text-2xl font-serif font-bold text-gold">{totalCount}</p>
                      <p className="text-[10px] text-muted-foreground">Items Saved</p>
                    </div>
                  </div>
                  {categoryStats.length > 1 && (
                    <div className="flex gap-2 flex-wrap">
                      {categoryStats.map((s) => {
                        const SIcon = s.icon;
                        return (
                          <div key={s.key} className="glass-card rounded-xl px-3 py-2 flex items-center gap-2 border border-border/20">
                            <SIcon className="w-3.5 h-3.5 text-gold/70" />
                            <span className="text-xs font-medium">{s.count}</span>
                            <span className="text-[10px] text-muted-foreground">{s.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* Filter pills */}
          {totalCount > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="flex gap-2 flex-wrap mb-10">
              {filters.map((f) => {
                const count = counts[f.key];
                if (f.key !== "all" && count === 0) return null;
                const FIcon = f.icon;
                return (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-all ${
                      filter === f.key
                        ? "bg-gold text-background shadow-lg shadow-gold/20"
                        : "glass-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <FIcon className="w-3.5 h-3.5" />
                    {f.label}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${filter === f.key ? "bg-background/20 text-background" : "bg-secondary/60"}`}>{count}</span>
                  </button>
                );
              })}
            </motion.div>
          )}

          {/* Global empty state */}
          {totalCount === 0 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-24">
              <div className="relative w-28 h-28 mx-auto mb-8">
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gold/15 to-gold/5 flex items-center justify-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <Heart className="w-12 h-12 text-gold/50" />
                </motion.div>
                <motion.div
                  className="absolute -inset-3 rounded-3xl border border-gold/15"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                {[CreditCard, Gift, BookOpen].map((Icon, idx) => (
                  <motion.div
                    key={idx}
                    className="absolute w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center"
                    animate={{
                      x: [0, Math.cos((idx * 2 * Math.PI) / 3) * 50],
                      y: [0, Math.sin((idx * 2 * Math.PI) / 3) * 50],
                      opacity: [0, 0.7, 0],
                    }}
                    transition={{ repeat: Infinity, duration: 3, delay: idx * 0.8, ease: "easeInOut" }}
                    style={{ top: "50%", left: "50%", marginTop: -16, marginLeft: -16 }}
                  >
                    <Icon className="w-3.5 h-3.5 text-gold" />
                  </motion.div>
                ))}
              </div>
              <p className="font-serif text-2xl font-bold mb-3">No favorites yet</p>
              <p className="text-sm text-muted-foreground mb-8 max-w-sm mx-auto">Tap the heart icon on any card, voucher, guide, or banking tier to start building your collection.</p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Link to="/cards" className="gold-btn px-6 py-3 rounded-xl text-xs flex items-center gap-2"><CreditCard className="w-3.5 h-3.5" /> Browse Cards</Link>
                <Link to="/vouchers" className="gold-outline-btn px-6 py-3 rounded-xl text-xs flex items-center gap-2"><Gift className="w-3.5 h-3.5" /> Browse Vouchers</Link>
                <Link to="/guides" className="gold-outline-btn px-6 py-3 rounded-xl text-xs flex items-center gap-2"><BookOpen className="w-3.5 h-3.5" /> Browse Guides</Link>
              </div>
            </motion.div>
          )}

          {/* Per-category empty states */}
          {totalCount > 0 && filter !== "all" && counts[filter] === 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
              {(() => {
                const es = categoryEmptyStates[filter];
                const EIcon = es.icon;
                return (
                  <>
                    <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                      <EIcon className="w-7 h-7 text-gold/50" />
                    </div>
                    <p className="font-serif text-lg font-semibold mb-2">{es.label}</p>
                    <p className="text-sm text-muted-foreground mb-5">Start exploring and save your favorites.</p>
                    <Link to={es.path} className="gold-btn px-5 py-2.5 rounded-xl text-xs inline-flex items-center gap-2">
                      <EIcon className="w-3.5 h-3.5" /> {es.cta}
                    </Link>
                  </>
                );
              })()}
            </motion.div>
          )}

          {/* Favorite Cards */}
          {showCards && favCards.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-gold" />
                  </div>
                  <h2 className="font-serif text-xl font-bold">Credit Cards</h2>
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-gold/10 text-gold font-semibold">{favCards.length}</span>
                </div>
                <div className="flex items-center gap-3">
                  {favCards.length >= 2 && (
                    <Link
                      to={`/compare?cards=${favCards.map((c) => c.id).join(",")}`}
                      className="gold-btn px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-gold/15"
                    >
                      <GitCompare className="w-3.5 h-3.5" /> Compare All
                    </Link>
                  )}
                  <Link to="/compare" className="text-xs text-gold hover:text-gold-light transition-colors flex items-center gap-1">
                    <GitCompare className="w-3.5 h-3.5" /> Compare
                  </Link>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <AnimatePresence mode="popLayout">
                  {favCards.map((card, i) => (
                    <motion.div
                      key={card.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                      transition={{ delay: i * 0.06 }}
                      className="group glass-card rounded-2xl overflow-hidden border border-border/30 hover:border-gold/20 transition-all hover:shadow-lg hover:shadow-gold/5"
                    >
                      {/* Mini card visual */}
                      <div className="h-20 relative" style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}66)` }}>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]" />
                        <div className="absolute bottom-3 left-4">
                          <p className="text-[10px] text-white/60">{card.network}</p>
                          <p className="text-xs text-white/90 font-semibold">{card.name}</p>
                        </div>
                        <button onClick={() => toggleCard(card.id)} className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/20 backdrop-blur-md hover:bg-black/30 transition-colors">
                          <Heart className="w-3.5 h-3.5 text-gold fill-gold" />
                        </button>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs px-2.5 py-1 rounded-lg bg-gold/10 text-gold font-medium">{card.fee}/yr</span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground"><Star className="w-3 h-3 text-gold fill-gold" />{card.rating}</span>
                          <span className="text-xs text-muted-foreground">{card.rewards}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground mb-3">{card.issuer} · {card.type} · {card.lounge} lounge</p>
                        <div className="flex gap-2">
                          <Link to={`/cards/${card.id}`} className="flex-1 text-xs py-2 rounded-lg gold-outline-btn flex items-center justify-center gap-1">
                            <Eye className="w-3 h-3" /> Details
                          </Link>
                          <Link to={`/compare?cards=${card.id}`} className="text-xs py-2 px-3 rounded-lg glass-card hover:border-gold/30 transition-all flex items-center justify-center gap-1 text-muted-foreground hover:text-gold">
                            <GitCompare className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Favorite Vouchers */}
          {showVouchers && favVouchers.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Gift className="w-4 h-4 text-gold" />
                </div>
                <h2 className="font-serif text-xl font-bold">Vouchers</h2>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-gold/10 text-gold font-semibold">{favVouchers.length}</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                <AnimatePresence mode="popLayout">
                  {favVouchers.map((v, i) => {
                    const Icon = iconMap[v.category] || Gift;
                    const displayCards = v.cards.slice(0, 2);
                    const moreCount = v.cards.length - 2;
                    return (
                      <motion.div
                        key={v.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                        transition={{ delay: i * 0.06 }}
                        className="glass-card rounded-2xl p-5 group relative border border-border/30 hover:border-gold/20 transition-all hover:shadow-lg hover:shadow-gold/5"
                      >
                        <button onClick={() => toggleVoucher(v.id)} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-secondary/50 transition-colors z-10">
                          <Heart className="w-4 h-4 text-gold fill-gold" />
                        </button>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${v.color}20, ${v.color}08)` }}>
                            <Icon className="w-5 h-5" style={{ color: v.color }} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm">{v.name}</h3>
                            <p className="text-[10px] text-muted-foreground">{v.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-medium">{v.discount}</span>
                          <span className="text-[10px] text-muted-foreground">Best: {v.bestRate}</span>
                        </div>
                        {/* Supported card brands */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {displayCards.map((cardName) => (
                            <span key={cardName} className="text-[10px] px-2 py-0.5 rounded-lg bg-secondary/50 text-muted-foreground font-medium">{cardName}</span>
                          ))}
                          {moreCount > 0 && (
                            <span className="text-[10px] px-2 py-0.5 rounded-lg bg-secondary/30 text-muted-foreground">+{moreCount} more</span>
                          )}
                        </div>
                        <Link to={`/vouchers/${v.id}`} className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors font-medium">
                          View Details <ChevronRight className="w-3 h-3" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Favorite Guides */}
          {showGuides && favGuides.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-gold" />
                </div>
                <h2 className="font-serif text-xl font-bold">Guides</h2>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-gold/10 text-gold font-semibold">{favGuides.length}</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <AnimatePresence mode="popLayout">
                  {favGuides.map((guide, i) => (
                    <motion.div
                      key={guide.slug}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                      transition={{ delay: i * 0.06 }}
                      className="glass-card rounded-2xl p-5 group relative border border-border/30 hover:border-gold/20 transition-all hover:shadow-lg hover:shadow-gold/5"
                    >
                      <button onClick={() => toggleGuide(guide.slug)} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-secondary/50 transition-colors z-10">
                        <Heart className="w-4 h-4 text-gold fill-gold" />
                      </button>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${guide.color}20, ${guide.color}08)` }}>
                          <guide.icon className="w-5 h-5" style={{ color: guide.color }} />
                        </div>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{guide.category}</span>
                      </div>
                      <h3 className="font-serif text-sm font-semibold mb-1.5 leading-snug">{guide.title}</h3>
                      <p className="text-[10px] text-muted-foreground line-clamp-1 mb-2">{guide.description}</p>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><Clock className="w-3 h-3" /> {guide.readTime} read</span>
                        <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><User className="w-3 h-3" /> {guide.author}</span>
                      </div>
                      <Link to={`/guides/${guide.slug}`} className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors font-medium">
                        Read Guide <ChevronRight className="w-3 h-3" />
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Favorite Banking Tiers */}
          {showBanking && favBankingTiers.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Landmark className="w-4 h-4 text-gold" />
                </div>
                <h2 className="font-serif text-xl font-bold">Banking Tiers</h2>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-gold/10 text-gold font-semibold">{favBankingTiers.length}</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <AnimatePresence mode="popLayout">
                  {favBankingTiers.map((tier, i) => {
                    const tierId = `banking-${tier.name.toLowerCase().replace(/\s+/g, "-")}`;
                    const minBalance = parseMinBalance(tier.eligibility);
                    const topPerks = tier.benefits.slice(0, 3);
                    return (
                      <motion.div
                        key={tierId}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                        transition={{ delay: i * 0.06 }}
                        className="glass-card rounded-2xl overflow-hidden relative border border-border/30 hover:border-gold/20 transition-all hover:shadow-lg hover:shadow-gold/5"
                      >
                        <div className="h-1" style={{ background: `linear-gradient(90deg, ${tier.color}, ${tier.color}40)` }} />
                        <div className="p-5">
                          <button onClick={() => toggleBanking(tierId)} className="absolute top-5 right-4 p-1.5 rounded-lg hover:bg-secondary/50 transition-colors z-10">
                            <Heart className="w-4 h-4 text-gold fill-gold" />
                          </button>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${tier.color}15` }}>
                              <Landmark className="w-4 h-4" style={{ color: tier.color }} />
                            </div>
                            <div>
                              <h3 className="font-serif text-sm font-bold" style={{ color: tier.color }}>{tier.name}</h3>
                              <p className="text-[10px] text-muted-foreground">{tier.bankName}</p>
                            </div>
                          </div>
                          {/* Min balance */}
                          {minBalance && (
                            <div className="flex items-center gap-1.5 mb-2">
                              <Wallet className="w-3 h-3 text-muted-foreground" />
                              <span className="text-[10px] text-muted-foreground">Min Balance: <span className="text-foreground font-medium">{minBalance}</span></span>
                            </div>
                          )}
                          {tier.hasRM && (
                            <div className="flex items-center gap-1.5 mb-2">
                              <Check className="w-3 h-3 text-gold" />
                              <span className="text-[10px] text-gold font-medium">Dedicated RM</span>
                            </div>
                          )}
                          {/* Key perks pills */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {topPerks.map((perk) => (
                              <span key={perk} className="text-[10px] px-2 py-0.5 rounded-lg bg-secondary/50 text-muted-foreground font-medium line-clamp-1">{perk}</span>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {tier.eligibleCards.map((c) => (
                              <span key={c} className="text-[10px] px-2 py-0.5 rounded-lg bg-secondary/50 font-medium">{c}</span>
                            ))}
                          </div>
                          <Link to="/banking" className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors font-medium">
                            View Details <ChevronRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </div>
      </section>
      <BackToTop />
    </PageLayout>
  );
}
