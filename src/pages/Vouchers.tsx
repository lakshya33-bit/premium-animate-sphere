import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Eye, ExternalLink, X, Clock, CreditCard, Tag } from "lucide-react";
import { Gift } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { vouchers, voucherCategories, iconMap, type Voucher } from "@/data/vouchers";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

function QuickView({ voucher, open, onClose }: { voucher: Voucher | null; open: boolean; onClose: () => void }) {
  if (!voucher) return null;
  const Icon = iconMap[voucher.category] || Gift;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-card border-border/50 sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${voucher.color}15` }}>
              <Icon className="w-6 h-6" style={{ color: voucher.color }} />
            </div>
            <div>
              <DialogTitle className="font-serif text-xl">{voucher.name}</DialogTitle>
              <p className="text-xs text-muted-foreground">{voucher.category}</p>
            </div>
          </div>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-medium">{voucher.discount}</span>
            <span className="text-xs text-muted-foreground">Best: {voucher.bestRate}</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{voucher.longDescription}</p>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1"><Tag className="w-3 h-3" /> Denominations</p>
            <div className="flex flex-wrap gap-2">{voucher.denominations.map((d) => <span key={d} className="px-2.5 py-1 rounded-lg bg-secondary/60 text-xs">₹{d}</span>)}</div>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1"><CreditCard className="w-3 h-3" /> Top Cards</p>
            <div className="flex flex-wrap gap-1.5">{voucher.cards.map((c) => <span key={c} className="text-xs px-2.5 py-1 rounded-full bg-gold/10 text-gold">{c}</span>)}</div>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1"><Clock className="w-3 h-3" /> Validity</p>
            <p className="text-xs text-muted-foreground">{voucher.validity}</p>
          </div>
          <Link to={`/vouchers/${voucher.id}`} onClick={onClose} className="gold-btn w-full py-2.5 rounded-xl text-sm flex items-center justify-center gap-2">
            View Full Details <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Vouchers() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [quickViewVoucher, setQuickViewVoucher] = useState<Voucher | null>(null);

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
                <motion.div key={v.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, duration: 0.4 }} className="tilt-card glass-card rounded-2xl p-6 group">
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
