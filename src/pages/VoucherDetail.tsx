import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ExternalLink, Clock, TrendingUp, CreditCard, Tag, Home, ChevronRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { getVoucherById, vouchers, iconMap } from "@/data/vouchers";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Gift } from "lucide-react";

export default function VoucherDetail() {
  const { id } = useParams<{ id: string }>();
  const voucher = getVoucherById(id || "");

  const relatedVouchers = vouchers.filter((v) => v.id !== id && v.category === voucher?.category).slice(0, 3);

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

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-8 mb-8">
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

          {/* Related Vouchers */}
          {relatedVouchers.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
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
    </PageLayout>
  );
}
