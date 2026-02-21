import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Star, TrendingUp, TrendingDown, IndianRupee, PieChart, ArrowUpDown, Receipt, ShoppingBag, UtensilsCrossed, Car, Fuel, Plane, Smartphone, Eye, ExternalLink, Check, X, Heart } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { cards, type CreditCard as CardType } from "@/data/cards";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell, LineChart, Line, CartesianGrid } from "recharts";

const expenseData = [
  { month: "Sep", amount: 42500 }, { month: "Oct", amount: 38900 }, { month: "Nov", amount: 51200 },
  { month: "Dec", amount: 67800 }, { month: "Jan", amount: 45600 }, { month: "Feb", amount: 53200 },
];

const categoryExpenses = [
  { name: "Shopping", value: 18500, icon: ShoppingBag, color: "#F8C534" },
  { name: "Food", value: 12300, icon: UtensilsCrossed, color: "#E23744" },
  { name: "Travel", value: 8700, icon: Plane, color: "#276EF1" },
  { name: "Fuel", value: 5200, icon: Fuel, color: "#006838" },
  { name: "Electronics", value: 4800, icon: Smartphone, color: "#00A651" },
  { name: "Others", value: 3700, icon: Receipt, color: "#888" },
];

const recentTransactions = [
  { merchant: "Amazon India", category: "Shopping", amount: 4599, date: "Feb 19", card: "HDFC Infinia", reward: "₹152" },
  { merchant: "Zomato Gold", category: "Food", amount: 1200, date: "Feb 18", card: "HDFC Diners Black", reward: "₹120" },
  { merchant: "HPCL Fuel", category: "Fuel", amount: 3500, date: "Feb 17", card: "SBI Elite", reward: "₹88" },
  { merchant: "Flipkart", category: "Shopping", amount: 8999, date: "Feb 16", card: "HDFC Infinia", reward: "₹297" },
  { merchant: "MakeMyTrip", category: "Travel", amount: 12500, date: "Feb 15", card: "Axis Atlas", reward: "₹625" },
  { merchant: "Swiggy", category: "Food", amount: 850, date: "Feb 14", card: "ICICI Emeralde", reward: "₹85" },
  { merchant: "Croma", category: "Electronics", amount: 15999, date: "Feb 12", card: "SBI Elite", reward: "₹400" },
  { merchant: "BigBasket", category: "Groceries", amount: 2340, date: "Feb 11", card: "HDFC Infinia", reward: "₹187" },
];

const totalExpense = categoryExpenses.reduce((s, c) => s + c.value, 0);

function CardQuickView({ card, open, onClose }: { card: CardType | null; open: boolean; onClose: () => void }) {
  if (!card) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-card border-border/50 sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-4">
            {/* Card image thumbnail */}
            <div className="w-20 h-[50px] rounded-lg overflow-hidden shadow-lg shadow-black/30 flex-shrink-0">
              {card.image ? (
                <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}88)` }} />
              )}
            </div>
            <div>
              <DialogTitle className="font-serif text-xl">{card.name}</DialogTitle>
              <p className="text-xs text-muted-foreground">{card.issuer} · {card.network}</p>
            </div>
          </div>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="grid grid-cols-3 gap-3">
            {[{ l: "Fee", v: card.fee }, { l: "Rewards", v: card.rewards }, { l: "Lounge", v: card.lounge }].map((s) => (
              <div key={s.l} className="text-center bg-secondary/30 rounded-xl p-3">
                <p className="text-[10px] text-muted-foreground uppercase">{s.l}</p>
                <p className="text-sm font-semibold text-gold mt-1">{s.v}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Key Perks</p>
            <div className="space-y-1.5">{card.perks.map((p) => <div key={p} className="flex items-center gap-2"><Check className="w-3 h-3 text-gold" /><span className="text-sm">{p}</span></div>)}</div>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Top Voucher Rates</p>
            <div className="flex flex-wrap gap-1.5">{card.vouchers.map((v) => <span key={v} className="text-xs px-2.5 py-1 rounded-full bg-secondary/60">{v}</span>)}</div>
          </div>
          <div className="flex flex-wrap gap-1.5">{card.bestFor.map((b) => <span key={b} className="text-xs px-2.5 py-1 rounded-full bg-gold/10 text-gold">{b}</span>)}</div>
          <Link to={`/cards/${card.id}`} onClick={onClose} className="gold-btn w-full py-2.5 rounded-xl text-sm flex items-center justify-center gap-2">
            View Full Details <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function KnowYourCards() {
  const [quickViewCard, setQuickViewCard] = useState<CardType | null>(null);
  const { toggle: toggleFav, isFav } = useFavorites("card");

  return (
    <PageLayout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-sm font-medium tracking-widest uppercase text-gold mb-3">Know Your Cards</p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Cards & <span className="gold-gradient">Expenses</span></h1>
            <p className="text-muted-foreground max-w-xl mb-10">Deep-dive into every credit card's perks, compare benefits, and track your spending across all cards.</p>
          </motion.div>

          <Tabs defaultValue="cards" className="w-full">
            <TabsList className="bg-secondary/50 border border-border/50 mb-8">
              <TabsTrigger value="cards" className="data-[state=active]:bg-gold data-[state=active]:text-background"><CreditCard className="w-4 h-4 mr-2" /> Cards</TabsTrigger>
              <TabsTrigger value="expenses" className="data-[state=active]:bg-gold data-[state=active]:text-background"><PieChart className="w-4 h-4 mr-2" /> Expenses</TabsTrigger>
            </TabsList>

            <TabsContent value="cards">
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {cards.map((card, i) => (
                  <motion.div key={card.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.4 }} className="tilt-card glass-card rounded-2xl overflow-hidden">
                    {/* Card image area */}
                    <div className="relative p-5 pb-3">
                      <div className="relative aspect-[1.586/1] rounded-xl overflow-hidden shadow-xl shadow-black/40 group/card">
                        {card.image ? (
                          <img src={card.image} alt={card.name} className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105" />
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
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      </div>
                      {/* Rating badge */}
                      <div className="absolute top-7 right-7 flex items-center gap-1 bg-background/70 backdrop-blur-md px-2 py-1 rounded-lg shadow-lg">
                        <Star className="w-3 h-3 text-gold fill-gold" /><span className="text-xs font-medium">{card.rating}</span>
                      </div>
                      {/* Fav button */}
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFav(card.id); }}
                        className="absolute top-7 left-7 p-1.5 rounded-lg bg-background/70 backdrop-blur-md shadow-lg hover:bg-background/90 transition-colors z-10"
                      >
                        <Heart className={`w-3.5 h-3.5 transition-colors ${isFav(card.id) ? "text-gold fill-gold" : "text-muted-foreground hover:text-gold"}`} />
                      </button>
                    </div>
                    {/* Card info */}
                    <div className="px-5 pb-5">
                      <h3 className="font-serif font-bold text-lg">{card.name}</h3>
                      <p className="text-xs text-muted-foreground mb-3">{card.issuer} · {card.network} · {card.type}</p>
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="text-center bg-secondary/30 rounded-xl py-2"><p className="text-[10px] text-muted-foreground uppercase">Fee</p><p className="text-sm font-semibold">{card.fee}</p></div>
                        <div className="text-center bg-secondary/30 rounded-xl py-2"><p className="text-[10px] text-muted-foreground uppercase">Rewards</p><p className="text-sm font-semibold text-gold">{card.rewards}</p></div>
                        <div className="text-center bg-secondary/30 rounded-xl py-2"><p className="text-[10px] text-muted-foreground uppercase">Lounge</p><p className="text-sm font-semibold">{card.lounge}</p></div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => setQuickViewCard(card)} className="flex-1 text-xs py-2 rounded-lg gold-outline-btn flex items-center justify-center gap-1"><Eye className="w-3 h-3" /> Quick View</button>
                        <Link to={`/cards/${card.id}`} className="flex-1 text-xs py-2 rounded-lg gold-btn flex items-center justify-center gap-1"><ExternalLink className="w-3 h-3" /> Full View</Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="expenses">
              <div className="space-y-8">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Total Spend", value: `₹${(totalExpense / 1000).toFixed(1)}K`, icon: IndianRupee, change: "+8.2%", up: true },
                    { label: "Rewards Earned", value: "₹4,850", icon: Star, change: "+12%", up: true },
                    { label: "Avg. Daily", value: "₹1,900", icon: TrendingUp, change: "-3%", up: false },
                    { label: "Transactions", value: "147", icon: ArrowUpDown, change: "+5%", up: true },
                  ].map((stat, i) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center"><stat.icon className="w-4 h-4 text-gold" /></div>
                        <span className={`text-xs font-medium flex items-center gap-0.5 ${stat.up ? "text-green-400" : "text-red-400"}`}>
                          {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}{stat.change}
                        </span>
                      </div>
                      <p className="text-2xl font-serif font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-2xl p-6">
                    <h3 className="font-serif text-lg font-semibold mb-1">Monthly Spending</h3>
                    <p className="text-xs text-muted-foreground mb-6">Last 6 months trend</p>
                    <ResponsiveContainer width="100%" height={220}>
                      <LineChart data={expenseData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 12% 18%)" />
                        <XAxis dataKey="month" tick={{ fill: "hsl(220 10% 55%)", fontSize: 12 }} axisLine={false} />
                        <YAxis tick={{ fill: "hsl(220 10% 55%)", fontSize: 12 }} axisLine={false} tickFormatter={(v) => `₹${v / 1000}K`} />
                        <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 12% 18%)", borderRadius: 12, color: "#fff", fontSize: 12 }} formatter={(v: number) => [`₹${v.toLocaleString()}`, "Spent"]} />
                        <Line type="monotone" dataKey="amount" stroke="hsl(43 55% 56%)" strokeWidth={2.5} dot={{ fill: "hsl(43 55% 56%)", r: 4 }} activeDot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-2xl p-6">
                    <h3 className="font-serif text-lg font-semibold mb-1">Category Breakdown</h3>
                    <p className="text-xs text-muted-foreground mb-6">Where your money goes</p>
                    <div className="flex items-center gap-6">
                      <ResponsiveContainer width={140} height={140}>
                        <RePieChart><Pie data={categoryExpenses} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" stroke="none">{categoryExpenses.map((e) => <Cell key={e.name} fill={e.color} />)}</Pie></RePieChart>
                      </ResponsiveContainer>
                      <div className="flex-1 space-y-2.5">
                        {categoryExpenses.map((cat) => (
                          <div key={cat.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} /><span className="text-xs text-muted-foreground">{cat.name}</span></div>
                            <span className="text-xs font-medium">₹{(cat.value / 1000).toFixed(1)}K</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card rounded-2xl p-6">
                  <h3 className="font-serif text-lg font-semibold mb-1">Card-wise Spending</h3>
                  <p className="text-xs text-muted-foreground mb-6">Spend distribution across your cards</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={[{ card: "HDFC Infinia", amount: 22500 }, { card: "Diners Black", amount: 12800 }, { card: "Axis Atlas", amount: 8500 }, { card: "SBI Elite", amount: 5400 }, { card: "ICICI Emeralde", amount: 4000 }]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 12% 18%)" />
                      <XAxis dataKey="card" tick={{ fill: "hsl(220 10% 55%)", fontSize: 11 }} axisLine={false} />
                      <YAxis tick={{ fill: "hsl(220 10% 55%)", fontSize: 11 }} axisLine={false} tickFormatter={(v) => `₹${v / 1000}K`} />
                      <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 12% 18%)", borderRadius: 12, color: "#fff", fontSize: 12 }} formatter={(v: number) => [`₹${v.toLocaleString()}`, "Spent"]} />
                      <Bar dataKey="amount" fill="hsl(43 55% 56%)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-card rounded-2xl p-6">
                  <h3 className="font-serif text-lg font-semibold mb-1">Recent Transactions</h3>
                  <p className="text-xs text-muted-foreground mb-6">Your latest spending activity</p>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border/30">
                          <th className="text-left text-[10px] text-muted-foreground uppercase tracking-wider pb-3 pr-4">Merchant</th>
                          <th className="text-left text-[10px] text-muted-foreground uppercase tracking-wider pb-3 pr-4">Category</th>
                          <th className="text-left text-[10px] text-muted-foreground uppercase tracking-wider pb-3 pr-4">Card</th>
                          <th className="text-right text-[10px] text-muted-foreground uppercase tracking-wider pb-3 pr-4">Amount</th>
                          <th className="text-right text-[10px] text-muted-foreground uppercase tracking-wider pb-3">Reward</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentTransactions.map((tx, i) => (
                          <tr key={i} className="border-b border-border/10 hover:bg-secondary/20 transition-colors">
                            <td className="py-3 pr-4"><div className="text-sm font-medium">{tx.merchant}</div><div className="text-[10px] text-muted-foreground">{tx.date}</div></td>
                            <td className="py-3 pr-4"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary/60">{tx.category}</span></td>
                            <td className="py-3 pr-4 text-xs text-muted-foreground">{tx.card}</td>
                            <td className="py-3 pr-4 text-right text-sm font-medium">₹{tx.amount.toLocaleString()}</td>
                            <td className="py-3 text-right text-xs text-gold font-medium">{tx.reward}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <CardQuickView card={quickViewCard} open={!!quickViewCard} onClose={() => setQuickViewCard(null)} />
    </PageLayout>
  );
}
