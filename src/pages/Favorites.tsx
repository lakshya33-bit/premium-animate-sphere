import { motion } from "framer-motion";
import { Heart, CreditCard, Gift, BookOpen, ChevronRight, Clock, Star, Landmark, Check, GitCompare } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { useFavorites } from "@/hooks/use-favorites";
import { cards } from "@/data/cards";
import { vouchers, iconMap } from "@/data/vouchers";
import { guides } from "@/data/guides";
import { banks } from "@/data/banking";

export default function Favorites() {
  const { isFav: isCardFav, toggle: toggleCard } = useFavorites("card");
  const { isFav: isVoucherFav, toggle: toggleVoucher } = useFavorites("voucher");
  const { isFav: isGuideFav, toggle: toggleGuide } = useFavorites("guide");
  const { isFav: isBankingFav, toggle: toggleBanking } = useFavorites("banking");

  const favCards = cards.filter((c) => isCardFav(c.id));
  const favVouchers = vouchers.filter((v) => isVoucherFav(v.id));
  const favGuides = guides.filter((g) => isGuideFav(g.slug));
  const favBankingTiers = banks.flatMap((bank) =>
    bank.tiers
      .filter((tier) => isBankingFav(`banking-${tier.name.toLowerCase().replace(/\s+/g, "-")}`))
      .map((tier) => ({ ...tier, bankName: bank.name, bankId: bank.id }))
  );
  const totalCount = favCards.length + favVouchers.length + favGuides.length + favBankingTiers.length;

  return (
    <PageLayout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <p className="text-sm font-medium tracking-widest uppercase text-gold mb-3">Your Collection</p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              My <span className="gold-gradient">Favorites</span>
            </h1>
            <p className="text-muted-foreground">All your saved cards, vouchers, and guides in one place. <span className="text-gold">{totalCount} items</span> saved.</p>
          </motion.div>

          {totalCount === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <Heart className="w-14 h-14 mx-auto mb-4 text-muted-foreground/30" />
              <p className="font-serif text-xl mb-2">No favorites yet</p>
              <p className="text-sm text-muted-foreground mb-6">Tap the heart icon on any card, voucher, or guide to save it here.</p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Link to="/cards" className="gold-outline-btn px-5 py-2.5 rounded-xl text-xs">Browse Cards</Link>
                <Link to="/vouchers" className="gold-outline-btn px-5 py-2.5 rounded-xl text-xs">Browse Vouchers</Link>
                <Link to="/guides" className="gold-outline-btn px-5 py-2.5 rounded-xl text-xs">Browse Guides</Link>
              </div>
            </motion.div>
          )}

          {/* Favorite Cards */}
          {favCards.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-10">
              <div className="flex items-center gap-2 mb-5">
                <CreditCard className="w-5 h-5 text-gold" />
                <h2 className="font-serif text-xl font-bold">Credit Cards</h2>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-gold/10 text-gold font-medium">{favCards.length}</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {favCards.map((card, i) => (
                  <motion.div key={card.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="glass-card rounded-2xl p-5 group relative">
                    <button onClick={() => toggleCard(card.id)} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-secondary/50 transition-colors z-10">
                      <Heart className="w-4 h-4 text-gold fill-gold" />
                    </button>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-8 rounded-lg overflow-hidden shadow-lg shadow-black/20 flex-shrink-0">
                        <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}88)` }} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{card.name}</h3>
                        <p className="text-[10px] text-muted-foreground">{card.issuer} · {card.network}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-gold/10 text-gold">{card.fee}/yr</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground"><Star className="w-3 h-3 text-gold fill-gold" />{card.rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{card.rewards} · {card.lounge} lounge</p>
                    <Link to={`/cards/${card.id}`} className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors">
                      View Details <ChevronRight className="w-3 h-3" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Favorite Vouchers */}
          {favVouchers.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-10">
              <div className="flex items-center gap-2 mb-5">
                <Gift className="w-5 h-5 text-gold" />
                <h2 className="font-serif text-xl font-bold">Vouchers</h2>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-gold/10 text-gold font-medium">{favVouchers.length}</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {favVouchers.map((v, i) => {
                  const Icon = iconMap[v.category] || Gift;
                  return (
                    <motion.div key={v.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="glass-card rounded-2xl p-5 group relative">
                      <button onClick={() => toggleVoucher(v.id)} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-secondary/50 transition-colors z-10">
                        <Heart className="w-4 h-4 text-gold fill-gold" />
                      </button>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${v.color}15` }}>
                          <Icon className="w-5 h-5" style={{ color: v.color }} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">{v.name}</h3>
                          <p className="text-[10px] text-muted-foreground">{v.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-medium">{v.discount}</span>
                        <span className="text-xs text-muted-foreground">Best: {v.bestRate}</span>
                      </div>
                      <Link to={`/vouchers/${v.id}`} className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors">
                        View Details <ChevronRight className="w-3 h-3" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Favorite Guides */}
          {favGuides.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="flex items-center gap-2 mb-5">
                <BookOpen className="w-5 h-5 text-gold" />
                <h2 className="font-serif text-xl font-bold">Guides</h2>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-gold/10 text-gold font-medium">{favGuides.length}</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {favGuides.map((guide, i) => (
                  <motion.div key={guide.slug} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="glass-card rounded-2xl p-5 group relative">
                    <button onClick={() => toggleGuide(guide.slug)} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-secondary/50 transition-colors z-10">
                      <Heart className="w-4 h-4 text-gold fill-gold" />
                    </button>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${guide.color}15` }}>
                        <guide.icon className="w-5 h-5" style={{ color: guide.color }} />
                      </div>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{guide.category}</span>
                    </div>
                    <h3 className="font-serif text-sm font-semibold mb-2">{guide.title}</h3>
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground mb-3"><Clock className="w-3 h-3" /> {guide.readTime} read</span>
                    <Link to={`/guides/${guide.slug}`} className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors">
                      Read Guide <ChevronRight className="w-3 h-3" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          {/* Favorite Banking Tiers */}
          {favBankingTiers.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-10">
              <div className="flex items-center gap-2 mb-5">
                <Landmark className="w-5 h-5 text-gold" />
                <h2 className="font-serif text-xl font-bold">Banking Tiers</h2>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-gold/10 text-gold font-medium">{favBankingTiers.length}</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {favBankingTiers.map((tier, i) => {
                  const tierId = `banking-${tier.name.toLowerCase().replace(/\s+/g, "-")}`;
                  return (
                    <motion.div key={tierId} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="glass-card rounded-2xl overflow-hidden relative">
                      <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${tier.color}, ${tier.color}66)` }} />
                      <div className="p-5">
                        <button onClick={() => toggleBanking(tierId)} className="absolute top-6 right-4 p-1.5 rounded-lg hover:bg-secondary/50 transition-colors z-10">
                          <Heart className="w-4 h-4 text-gold fill-gold" />
                        </button>
                        <h3 className="font-serif text-sm font-bold mb-1" style={{ color: tier.color }}>{tier.name}</h3>
                        <p className="text-[10px] text-muted-foreground mb-2">{tier.bankName}</p>
                        {tier.hasRM && (
                          <div className="flex items-center gap-1.5 mb-2">
                            <Check className="w-3 h-3 text-gold" />
                            <span className="text-[10px] text-gold">Dedicated RM</span>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {tier.eligibleCards.map((c) => (
                            <span key={c} className="text-[10px] px-2 py-0.5 rounded-lg bg-secondary/60">{c}</span>
                          ))}
                        </div>
                        <Link to="/banking" className="flex items-center gap-1 text-xs text-gold hover:text-gold-light transition-colors">
                          View Details <ChevronRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
