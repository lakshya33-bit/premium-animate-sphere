import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Clock, TrendingUp, CreditCard, Tag, Home, ChevronRight, Heart, Share2, Lightbulb, Globe } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import BackToTop from "@/components/BackToTop";
import { getVoucherById, vouchers, iconMap } from "@/data/vouchers";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Gift } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
import FavoriteButton from "@/components/FavoriteButton";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";

export default function VoucherDetail() {
  const { id } = useParams<{ id: string }>();
  const voucher = getVoucherById(id || "");
  const { toggle: toggleFav, isFav } = useFavorites("voucher");

  useEffect(() => {
    if (voucher) document.title = `${voucher.name} Voucher | CardPerks`;
    return () => { document.title = "CardPerks"; };
  }, [voucher]);

  // Related vouchers: same category first, then fill from others
  const relatedVouchers = useMemo(() => {
    if (!voucher) return [];
    const sameCategory = vouchers.filter((v) => v.id !== id && v.category === voucher.category);
    if (sameCategory.length >= 3) return sameCategory.slice(0, 3);
    const others = vouchers.filter((v) => v.id !== id && v.category !== voucher.category);
    return [...sameCategory, ...others].slice(0, 3);
  }, [id, voucher]);

  // Best time to buy insight
  const insight = useMemo(() => {
    if (!voucher) return null;
    const history = voucher.rateHistory;
    const maxEntry = history.reduce((max, h) => h.rate > max.rate ? h : max, history[0]);
    const minEntry = history.reduce((min, h) => h.rate < min.rate ? h : min, history[0]);
    const latest = history[history.length - 1];
    const isAtPeak = latest.rate === maxEntry.rate;
    return {
      peakMonth: maxEntry.month,
      peakRate: maxEntry.rate,
      lowMonth: minEntry.month,
      lowRate: minEntry.rate,
      isAtPeak,
      message: isAtPeak
        ? `Rates are at their highest now (${maxEntry.rate}%). Great time to buy!`
        : `Rates peaked in ${maxEntry.month} at ${maxEntry.rate}%. Current rate is ${latest.rate}%.`,
    };
  }, [voucher]);

  if (!voucher) {
    return (
      <PageLayout>
        <div className="py-32 text-center">
          <p className="text-lg text-muted-foreground">Voucher not found</p>
          <Link to="/vouchers" className="text-gold text-sm mt-4 inline-block">← Back to Vouchers</Link>
        </div>
      </PageLayout>
    );
  }

  const Icon = iconMap[voucher.category] || Gift;

  return (
    <PageLayout>
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
            <Link to="/" className="hover:text-gold transition-colors flex items-center gap-1"><Home className="w-3 h-3" /> Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/vouchers" className="hover:text-gold transition-colors">Vouchers</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{voucher.name}</span>
          </nav>

          {/* Header card with brand tint */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-8 mb-8"
            style={{ background: `linear-gradient(135deg, ${voucher.color}08, transparent 60%)` }}
          >
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${voucher.color}15` }}>
                <Icon className="w-8 h-8" style={{ color: voucher.color }} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="font-serif text-3xl font-bold">{voucher.name}</h1>
                  <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-medium">{voucher.discount}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{voucher.category}</p>
                <p className="text-muted-foreground leading-relaxed mt-4">{voucher.longDescription}</p>
              </div>
              {/* Favorite & Share */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <FavoriteButton isFav={isFav(voucher.id)} onToggle={() => toggleFav(voucher.id)} />
                <button
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                  className="p-2 rounded-xl glass-card text-muted-foreground hover:text-foreground transition-colors"
                  title="Copy link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Rate History */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-6">
              <h3 className="font-serif text-lg font-semibold mb-1 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-gold" /> Rate History</h3>
              <p className="text-xs text-muted-foreground mb-4">Best rate: <span className="text-gold font-medium">{voucher.bestRate}</span></p>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={voucher.rateHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 12% 18%)" />
                  <XAxis dataKey="month" tick={{ fill: "hsl(220 10% 55%)", fontSize: 11 }} axisLine={false} />
                  <YAxis tick={{ fill: "hsl(220 10% 55%)", fontSize: 11 }} axisLine={false} tickFormatter={(v) => `${v}%`} />
                  <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 12% 18%)", borderRadius: 12, color: "#fff", fontSize: 12 }} formatter={(v: number) => [`${v}%`, "Rate"]} />
                  <Line type="monotone" dataKey="rate" stroke="hsl(43 55% 56%)" strokeWidth={2.5} dot={{ fill: "hsl(43 55% 56%)", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Details */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-2xl p-6 space-y-5">
              <div>
                <h3 className="font-serif text-lg font-semibold mb-3 flex items-center gap-2"><Tag className="w-4 h-4 text-gold" /> Denominations</h3>
                <div className="flex flex-wrap gap-2">
                  {voucher.denominations.map((d) => (
                    <span key={d} className="px-3 py-1.5 rounded-lg bg-secondary/60 text-sm">₹{d.toLocaleString()}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2"><CreditCard className="w-4 h-4 text-gold" /> Best Cards</h3>
                <div className="flex flex-wrap gap-2">
                  {voucher.cards.map((c) => (
                    <span key={c} className="text-xs px-3 py-1.5 rounded-full bg-gold/10 text-gold">{c}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2"><ExternalLink className="w-4 h-4 text-gold" /> Available On</h3>
                <div className="flex flex-wrap gap-2">
                  {voucher.platforms.map((p) => (
                    <span key={p} className="text-xs px-3 py-1.5 rounded-lg bg-secondary/60">{p}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2 flex items-center gap-2"><Clock className="w-4 h-4 text-gold" /> Validity</h3>
                <p className="text-sm text-muted-foreground">{voucher.validity}</p>
              </div>
            </motion.div>
          </div>

          {/* Platform Comparison Table */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card rounded-2xl p-6 mb-8">
            <h3 className="font-serif text-lg font-semibold mb-4 flex items-center gap-2"><Globe className="w-4 h-4 text-gold" /> Platform Comparison</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/30">
                    <TableHead className="text-xs">Platform</TableHead>
                    <TableHead className="text-xs">Rate</TableHead>
                    <TableHead className="text-xs">Type</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-xs">Best Card</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {voucher.platformRates.map((pr) => (
                    <TableRow key={pr.platform} className={`border-border/20 ${pr.highlight ? "bg-gold/[0.04]" : ""}`}>
                      <TableCell className="font-medium text-sm">
                        <div className="flex items-center gap-2">
                          {pr.platform}
                          {pr.highlight && <span className="text-[8px] px-1.5 py-0.5 rounded bg-gold/20 text-gold font-bold uppercase">Best</span>}
                        </div>
                      </TableCell>
                      <TableCell className={`text-sm font-semibold ${pr.highlight ? "text-gold" : ""}`}>{pr.savings}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{pr.type}</TableCell>
                      <TableCell>
                        {pr.live ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-500">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Live
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground/60">
                            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" /> Offline
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{pr.bestCard || "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>

          {/* Best Time to Buy Insight */}
          {insight && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-2xl p-6 mb-8">
              <h3 className="font-serif text-lg font-semibold mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-gold" /> Best Time to Buy
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{insight.message}</p>
              <div className="flex gap-4 mt-4">
                <div className="glass-card rounded-xl px-4 py-3 text-center">
                  <p className="text-xs text-muted-foreground">Peak</p>
                  <p className="text-sm font-semibold text-gold">{insight.peakRate}%</p>
                  <p className="text-[10px] text-muted-foreground">{insight.peakMonth}</p>
                </div>
                <div className="glass-card rounded-xl px-4 py-3 text-center">
                  <p className="text-xs text-muted-foreground">Low</p>
                  <p className="text-sm font-semibold">{insight.lowRate}%</p>
                  <p className="text-[10px] text-muted-foreground">{insight.lowMonth}</p>
                </div>
                <div className="glass-card rounded-xl px-4 py-3 text-center">
                  <p className="text-xs text-muted-foreground">Spread</p>
                  <p className="text-sm font-semibold">{(insight.peakRate - insight.lowRate).toFixed(1)}%</p>
                  <p className="text-[10px] text-muted-foreground">Range</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Related Vouchers */}
          {relatedVouchers.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <h3 className="font-serif text-lg font-semibold mb-4">Related Vouchers</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {relatedVouchers.map((v) => {
                  const RelIcon = iconMap[v.category] || Gift;
                  return (
                    <Link key={v.id} to={`/vouchers/${v.id}`} className="glass-card rounded-xl p-4 flex items-center gap-3 group hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${v.color}15` }}>
                        <RelIcon className="w-5 h-5" style={{ color: v.color }} />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold group-hover:text-gold transition-colors">{v.name}</h4>
                        <p className="text-xs text-muted-foreground">{v.discount}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </section>
      <BackToTop />
    </PageLayout>
  );
}
