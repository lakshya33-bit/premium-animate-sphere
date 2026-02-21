import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard, Star, ChevronRight, Plus, ArrowRight, Wallet, X, Eye, ExternalLink,
  GitCompare, Check, TrendingUp, TrendingDown, IndianRupee, PieChart, Receipt,
  ShoppingBag, UtensilsCrossed, Fuel, Plane, Smartphone, Sparkles, BarChart3, Calendar
} from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { useMyCards } from "@/hooks/use-my-cards";
import FavoriteButton from "@/components/FavoriteButton";
import { useFavorites } from "@/hooks/use-favorites";
import { cards } from "@/data/cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell, BarChart, Bar, CartesianGrid, Area, AreaChart
} from "recharts";

// Mock expense data per card
const cardExpenses: Record<string, number> = {
  "hdfc-infinia": 85400,
  "icici-emeralde": 42300,
  "axis-atlas": 28700,
  "sbi-elite": 15200,
  "hdfc-diners-black": 62800,
  "kotak-royale": 9500,
};

const cardRewards: Record<string, number> = {
  "hdfc-infinia": 2820,
  "icici-emeralde": 1480,
  "axis-atlas": 574,
  "sbi-elite": 380,
  "hdfc-diners-black": 2072,
  "kotak-royale": 143,
};

const monthlyTrend = [
  { month: "Sep", spend: 32500, rewards: 980 },
  { month: "Oct", spend: 38900, rewards: 1170 },
  { month: "Nov", spend: 51200, rewards: 1590 },
  { month: "Dec", spend: 67800, rewards: 2240 },
  { month: "Jan", spend: 45600, rewards: 1410 },
  { month: "Feb", spend: 53200, rewards: 1750 },
];

const categoryBreakdown = [
  { name: "Shopping", value: 28500, color: "#F8C534" },
  { name: "Food & Dining", value: 18300, color: "#E23744" },
  { name: "Travel", value: 14700, color: "#276EF1" },
  { name: "Fuel", value: 8200, color: "#006838" },
  { name: "Electronics", value: 6800, color: "#00A651" },
  { name: "Others", value: 5400, color: "#888" },
];

const recentTxns = [
  { merchant: "Amazon India", amount: 4599, date: "Feb 19", card: "HDFC Infinia", reward: "₹152", category: "Shopping" },
  { merchant: "Zomato Gold", amount: 1200, date: "Feb 18", card: "HDFC Diners Black", reward: "₹120", category: "Food" },
  { merchant: "HPCL Fuel", amount: 3500, date: "Feb 17", card: "SBI Elite", reward: "₹88", category: "Fuel" },
  { merchant: "Flipkart", amount: 8999, date: "Feb 16", card: "HDFC Infinia", reward: "₹297", category: "Shopping" },
  { merchant: "MakeMyTrip", amount: 12500, date: "Feb 15", card: "Axis Atlas", reward: "₹625", category: "Travel" },
  { merchant: "Swiggy", amount: 850, date: "Feb 14", card: "ICICI Emeralde", reward: "₹85", category: "Food" },
];

const totalCategorySpend = categoryBreakdown.reduce((s, c) => s + c.value, 0);

export default function MyCards() {
  const { has: isMyCard, toggle: toggleMyCard, count } = useMyCards();
  const { isFav, toggle: toggleFav } = useFavorites("card");
  const myCards = cards.filter((c) => isMyCard(c.id));

  const totalSpend = myCards.reduce((s, c) => s + (cardExpenses[c.id] || 0), 0);
  const totalRewards = myCards.reduce((s, c) => s + (cardRewards[c.id] || 0), 0);

  return (
    <PageLayout>
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Premium Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="relative w-20 h-20 mx-auto mb-6"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/25 to-gold/5 shadow-2xl shadow-gold/15" />
              <div className="absolute inset-0 rounded-2xl flex items-center justify-center">
                <Wallet className="w-8 h-8 text-gold" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -inset-2 rounded-2xl border border-gold/15"
              />
            </motion.div>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-gold mb-4">Your Wallet</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 tracking-tight">
              My <span className="gold-gradient">Cards</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
              Track your cards, monitor spending, and maximize rewards — all in one place.
            </p>
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
            <>
              {/* Stats Overview */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
              >
                {[
                  { label: "Total Cards", value: `${myCards.length}`, icon: CreditCard, accent: false },
                  { label: "Total Spend", value: `₹${(totalSpend / 1000).toFixed(1)}K`, icon: IndianRupee, accent: false },
                  { label: "Rewards Earned", value: `₹${totalRewards.toLocaleString()}`, icon: Sparkles, accent: true },
                  { label: "Reward Rate", value: totalSpend > 0 ? `${((totalRewards / totalSpend) * 100).toFixed(1)}%` : "0%", icon: TrendingUp, accent: false },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.06 }}
                    className={`glass-card rounded-2xl p-5 border border-border/20 hover:border-gold/20 transition-all duration-300 group ${stat.accent ? "ring-1 ring-gold/15" : ""}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform ${stat.accent ? "bg-gold/20 shadow-lg shadow-gold/10" : "bg-gold/10"}`}>
                        <stat.icon className="w-4 h-4 text-gold" />
                      </div>
                    </div>
                    <p className={`text-2xl font-serif font-bold ${stat.accent ? "text-gold" : ""}`}>{stat.value}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Tabs: Cards | Expenses */}
              <Tabs defaultValue="cards" className="w-full">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                  <TabsList className="bg-secondary/30 border border-border/30 mb-8">
                    <TabsTrigger value="cards" className="data-[state=active]:bg-gold data-[state=active]:text-background gap-2">
                      <CreditCard className="w-4 h-4" /> My Cards
                    </TabsTrigger>
                    <TabsTrigger value="expenses" className="data-[state=active]:bg-gold data-[state=active]:text-background gap-2">
                      <BarChart3 className="w-4 h-4" /> Expense Tracker
                    </TabsTrigger>
                  </TabsList>
                </motion.div>

                {/* Cards Tab */}
                <TabsContent value="cards">
                  <div className="grid md:grid-cols-2 gap-5">
                    <AnimatePresence>
                      {myCards.map((card, i) => (
                        <motion.div
                          key={card.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ delay: i * 0.08 }}
                          layout
                          className="group relative"
                        >
                          <div className="absolute -inset-[1px] rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: `linear-gradient(135deg, ${card.color}30, transparent 50%, ${card.color}10)` }} />

                          <div className="relative glass-card rounded-[22px] overflow-hidden border border-border/20 hover:border-border/40 transition-all duration-500">
                            {/* Card visual header */}
                            <div className="relative h-36 overflow-hidden" style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}BB, ${card.color}77)` }}>
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_60%)]" />
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.15),transparent_60%)]" />
                              {/* Card chip */}
                              <div className="absolute top-6 left-6">
                                <div className="w-10 h-7 rounded-md bg-gradient-to-br from-yellow-200/80 to-yellow-400/60 shadow-inner" />
                              </div>
                              <div className="absolute top-5 right-5 flex items-center gap-2">
                                <FavoriteButton isFav={isFav(card.id)} onToggle={() => toggleFav(card.id)} className="bg-black/20 backdrop-blur-md hover:bg-black/30" />
                                <button
                                  onClick={() => toggleMyCard(card.id)}
                                  className="p-1.5 rounded-lg bg-black/20 backdrop-blur-md hover:bg-red-500/30 transition-colors text-white/80 hover:text-white"
                                  title="Remove from My Cards"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <div className="absolute bottom-5 left-6">
                                <p className="text-[10px] text-white/50 font-mono tracking-[0.3em]">•••• •••• •••• 4289</p>
                                <p className="text-sm font-bold text-white mt-1">{card.name}</p>
                              </div>
                              <div className="absolute bottom-5 right-6 text-right">
                                <p className="text-[8px] text-white/40 uppercase tracking-wider">{card.network}</p>
                                <p className="text-[10px] text-white/60 mt-0.5">{card.issuer}</p>
                              </div>
                            </div>

                            {/* Card body */}
                            <div className="p-6">
                              {/* Spend & Reward summary */}
                              <div className="grid grid-cols-2 gap-3 mb-5">
                                <div className="rounded-xl p-3 bg-secondary/20 border border-border/15">
                                  <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-1">Spend</p>
                                  <p className="text-base font-serif font-bold">₹{((cardExpenses[card.id] || 0) / 1000).toFixed(1)}K</p>
                                </div>
                                <div className="rounded-xl p-3 border border-gold/15" style={{ background: `linear-gradient(135deg, hsl(var(--gold) / 0.06), transparent)` }}>
                                  <p className="text-[9px] text-gold uppercase tracking-wider mb-1 font-semibold">Rewards</p>
                                  <p className="text-base font-serif font-bold text-gold">₹{(cardRewards[card.id] || 0).toLocaleString()}</p>
                                </div>
                              </div>

                              {/* Stats row */}
                              <div className="flex flex-wrap gap-2 mb-4">
                                <span className="text-[10px] px-2.5 py-1 rounded-lg bg-gold/10 text-gold font-medium">{card.fee}/yr</span>
                                <span className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-lg bg-secondary/40">
                                  <Star className="w-3 h-3 text-gold fill-gold" />{card.rating}
                                </span>
                                <span className="text-[10px] px-2.5 py-1 rounded-lg bg-secondary/40 text-muted-foreground">{card.rewards}</span>
                                <span className="text-[10px] px-2.5 py-1 rounded-lg bg-secondary/40 text-muted-foreground">{card.lounge} lounge</span>
                              </div>

                              {/* Perks */}
                              <div className="flex flex-wrap gap-1.5 mb-5">
                                {card.perks.slice(0, 3).map((p) => (
                                  <span key={p} className="text-[9px] px-2 py-0.5 rounded-full bg-secondary/30 text-muted-foreground border border-border/15">{p}</span>
                                ))}
                              </div>

                              {/* Actions */}
                              <div className="flex gap-2">
                                <Link to={`/cards/${card.id}`} className="flex-1 text-xs py-2.5 rounded-xl gold-outline-btn flex items-center justify-center gap-1.5 font-semibold">
                                  <Eye className="w-3.5 h-3.5" /> Details
                                </Link>
                                <Link to={`/compare?cards=${card.id}`} className="flex-1 text-xs py-2.5 rounded-xl gold-btn flex items-center justify-center gap-1.5 font-semibold shadow-md shadow-gold/10">
                                  <GitCompare className="w-3.5 h-3.5" /> Compare
                                </Link>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {/* Add more card */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                      <Link to="/cards" className="h-full min-h-[200px] glass-card rounded-[22px] flex flex-col items-center justify-center gap-4 hover:border-gold/30 transition-all group block border border-dashed border-border/40 hover:border-solid">
                        <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-all group-hover:scale-110 duration-300">
                          <Plus className="w-6 h-6 text-gold" />
                        </div>
                        <div className="text-center">
                          <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors block">Add More Cards</span>
                          <span className="text-[10px] text-muted-foreground/60 mt-1 block">Browse our catalog of 160+ cards</span>
                        </div>
                      </Link>
                    </motion.div>
                  </div>
                </TabsContent>

                {/* Expense Tracker Tab */}
                <TabsContent value="expenses">
                  <div className="space-y-6">
                    {/* Spending trend + Category breakdown */}
                    <div className="grid lg:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card rounded-[22px] p-6 border border-border/20"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <h3 className="font-serif text-lg font-bold">Monthly Spending</h3>
                            <p className="text-[10px] text-muted-foreground mt-1">Last 6 months trend</p>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-medium">
                            <TrendingUp className="w-3.5 h-3.5" /> +8.2%
                          </div>
                        </div>
                        <ResponsiveContainer width="100%" height={220}>
                          <AreaChart data={monthlyTrend}>
                            <defs>
                              <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(43 55% 56%)" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="hsl(43 55% 56%)" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 12% 18% / 0.5)" />
                            <XAxis dataKey="month" tick={{ fill: "hsl(220 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: "hsl(220 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v / 1000}K`} />
                            <Tooltip
                              contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 12% 18%)", borderRadius: 12, color: "#fff", fontSize: 12 }}
                              formatter={(v: number) => [`₹${v.toLocaleString()}`, "Spent"]}
                            />
                            <Area type="monotone" dataKey="spend" stroke="hsl(43 55% 56%)" strokeWidth={2.5} fill="url(#spendGrad)" dot={{ fill: "hsl(43 55% 56%)", r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card rounded-[22px] p-6 border border-border/20"
                      >
                        <h3 className="font-serif text-lg font-bold mb-1">Category Breakdown</h3>
                        <p className="text-[10px] text-muted-foreground mb-6">Where your money goes</p>
                        <div className="flex items-center gap-6">
                          <ResponsiveContainer width={130} height={130}>
                            <RePieChart>
                              <Pie data={categoryBreakdown} cx="50%" cy="50%" innerRadius={38} outerRadius={60} dataKey="value" stroke="none" paddingAngle={2}>
                                {categoryBreakdown.map((e) => <Cell key={e.name} fill={e.color} />)}
                              </Pie>
                            </RePieChart>
                          </ResponsiveContainer>
                          <div className="flex-1 space-y-3">
                            {categoryBreakdown.map((cat) => (
                              <div key={cat.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                                  <span className="text-xs text-muted-foreground">{cat.name}</span>
                                </div>
                                <div className="text-right">
                                  <span className="text-xs font-semibold">₹{(cat.value / 1000).toFixed(1)}K</span>
                                  <span className="text-[9px] text-muted-foreground ml-1.5">({((cat.value / totalCategorySpend) * 100).toFixed(0)}%)</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Card-wise spending breakdown */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="glass-card rounded-[22px] p-6 border border-border/20"
                    >
                      <h3 className="font-serif text-lg font-bold mb-1">Card-wise Spending</h3>
                      <p className="text-[10px] text-muted-foreground mb-6">Spend & rewards by card</p>
                      <div className="space-y-3">
                        {myCards.map((card) => {
                          const spend = cardExpenses[card.id] || 0;
                          const reward = cardRewards[card.id] || 0;
                          const pct = totalSpend > 0 ? (spend / totalSpend) * 100 : 0;
                          return (
                            <div key={card.id} className="flex items-center gap-4 group">
                              <div className="w-10 h-6 rounded-md flex-shrink-0 shadow-md" style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}AA)` }} />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1.5">
                                  <span className="text-xs font-semibold truncate">{card.name}</span>
                                  <span className="text-xs font-bold">₹{(spend / 1000).toFixed(1)}K</span>
                                </div>
                                <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${pct}%` }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                    className="h-full rounded-full"
                                    style={{ background: `linear-gradient(90deg, ${card.color}, ${card.color}BB)` }}
                                  />
                                </div>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <span className="text-[10px] text-gold font-semibold">+₹{reward}</span>
                                <p className="text-[8px] text-muted-foreground">rewards</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>

                    {/* Rewards trend */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="glass-card rounded-[22px] p-6 border border-border/20"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="font-serif text-lg font-bold">Rewards Earned</h3>
                          <p className="text-[10px] text-muted-foreground mt-1">Monthly rewards trend</p>
                        </div>
                        <div className="px-3 py-1.5 rounded-lg bg-gold/10 border border-gold/15">
                          <p className="text-xs font-bold text-gold">₹{totalRewards.toLocaleString()} total</p>
                        </div>
                      </div>
                      <ResponsiveContainer width="100%" height={180}>
                        <BarChart data={monthlyTrend}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 12% 18% / 0.5)" />
                          <XAxis dataKey="month" tick={{ fill: "hsl(220 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fill: "hsl(220 10% 55%)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}`} />
                          <Tooltip
                            contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 12% 18%)", borderRadius: 12, color: "#fff", fontSize: 12 }}
                            formatter={(v: number) => [`₹${v.toLocaleString()}`, "Rewards"]}
                          />
                          <Bar dataKey="rewards" fill="hsl(43 55% 56%)" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </motion.div>

                    {/* Recent transactions */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="glass-card rounded-[22px] p-6 border border-border/20"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="font-serif text-lg font-bold">Recent Transactions</h3>
                          <p className="text-[10px] text-muted-foreground mt-1">Latest activity across all cards</p>
                        </div>
                        <span className="text-[10px] px-3 py-1 rounded-full bg-secondary/40 text-muted-foreground font-medium flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> Feb 2026
                        </span>
                      </div>
                      <div className="space-y-3">
                        {recentTxns.map((txn, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.05 }}
                            className="flex items-center justify-between py-3 border-b border-border/10 last:border-0 group hover:bg-secondary/5 rounded-lg px-2 -mx-2 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-secondary/30 flex items-center justify-center border border-border/15">
                                {txn.category === "Shopping" && <ShoppingBag className="w-4 h-4 text-muted-foreground" />}
                                {txn.category === "Food" && <UtensilsCrossed className="w-4 h-4 text-muted-foreground" />}
                                {txn.category === "Fuel" && <Fuel className="w-4 h-4 text-muted-foreground" />}
                                {txn.category === "Travel" && <Plane className="w-4 h-4 text-muted-foreground" />}
                              </div>
                              <div>
                                <p className="text-sm font-semibold">{txn.merchant}</p>
                                <p className="text-[10px] text-muted-foreground">{txn.card} · {txn.date}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold">-₹{txn.amount.toLocaleString()}</p>
                              <p className="text-[10px] text-gold font-medium">{txn.reward} earned</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
