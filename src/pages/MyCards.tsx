import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard, Star, Plus, ArrowRight, Wallet, X, Eye,
  GitCompare, TrendingUp, IndianRupee, Sparkles, BarChart3, Calendar,
  ShoppingBag, UtensilsCrossed, Fuel, Plane, Trash2
} from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { useMyCards } from "@/hooks/use-my-cards";
import FavoriteButton from "@/components/FavoriteButton";
import { useFavorites } from "@/hooks/use-favorites";
import { cards } from "@/data/cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useExpenses, CATEGORIES } from "@/hooks/use-expenses";
import AddExpenseDialog from "@/components/AddExpenseDialog";
import {
  ResponsiveContainer, PieChart as RePieChart, Pie, Cell,
  BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Area, AreaChart
} from "recharts";

const monthlyTrend = [
  { month: "Sep", spend: 32500, rewards: 980 },
  { month: "Oct", spend: 38900, rewards: 1170 },
  { month: "Nov", spend: 51200, rewards: 1590 },
  { month: "Dec", spend: 67800, rewards: 2240 },
  { month: "Jan", spend: 45600, rewards: 1410 },
  { month: "Feb", spend: 53200, rewards: 1750 },
];

const categoryColors: Record<string, string> = {
  shopping: "#F8C534",
  food: "#E23744",
  travel: "#276EF1",
  fuel: "#006838",
  electronics: "#00A651",
  entertainment: "#9333EA",
  bills: "#64748B",
  groceries: "#F97316",
  health: "#EC4899",
  others: "#888",
};

const categoryIcons: Record<string, typeof ShoppingBag> = {
  shopping: ShoppingBag,
  food: UtensilsCrossed,
  fuel: Fuel,
  travel: Plane,
};

export default function MyCards() {
  const { has: isMyCard, toggle: toggleMyCard } = useMyCards();
  const { isFav, toggle: toggleFav } = useFavorites("card");
  const { expenses, addExpense, deleteExpense, getByCard, totalByCard } = useExpenses();
  const myCards = cards.filter((c) => isMyCard(c.id));

  const totalSpend = myCards.reduce((s, c) => s + totalByCard(c.id), 0);
  const totalRewards = Math.round(totalSpend * 0.033); // ~3.3% avg reward

  // Category breakdown from real expenses
  const catMap = new Map<string, number>();
  expenses.forEach((e) => {
    if (myCards.some((c) => c.id === e.cardId)) {
      catMap.set(e.category, (catMap.get(e.category) || 0) + e.amount);
    }
  });
  const categoryBreakdown = Array.from(catMap.entries()).map(([name, value]) => ({
    name: CATEGORIES.find((c) => c.value === name)?.label.split(" ").slice(1).join(" ") || name,
    value,
    color: categoryColors[name] || "#888",
  }));
  const totalCatSpend = categoryBreakdown.reduce((s, c) => s + c.value, 0);

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
                  { label: "Total Spend", value: totalSpend > 0 ? `₹${(totalSpend / 1000).toFixed(1)}K` : "₹0", icon: IndianRupee, accent: false },
                  { label: "Rewards Earned", value: totalRewards > 0 ? `₹${totalRewards.toLocaleString()}` : "₹0", icon: Sparkles, accent: true },
                  { label: "Expenses Logged", value: `${expenses.filter((e) => myCards.some((c) => c.id === e.cardId)).length}`, icon: TrendingUp, accent: false },
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

              {/* Tabs */}
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
                      {myCards.map((card, i) => {
                        const cardExpenses = getByCard(card.id);
                        const cardTotal = totalByCard(card.id);
                        return (
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
                              {/* Card image header */}
                              <div className="relative h-44 overflow-hidden" style={{ background: `linear-gradient(135deg, ${card.color}22, ${card.color}08)` }}>
                                {card.image ? (
                                  <img src={card.image} alt={card.name} className="absolute inset-0 w-full h-full object-contain p-4" />
                                ) : (
                                  <>
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_60%)]" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <CreditCard className="w-16 h-16 opacity-20" style={{ color: card.color }} />
                                    </div>
                                  </>
                                )}
                                <div className="absolute top-4 right-4 flex items-center gap-2">
                                  <FavoriteButton isFav={isFav(card.id)} onToggle={() => toggleFav(card.id)} className="bg-black/20 backdrop-blur-md hover:bg-black/30" />
                                  <button
                                    onClick={() => toggleMyCard(card.id)}
                                    className="p-1.5 rounded-lg bg-black/20 backdrop-blur-md hover:bg-red-500/30 transition-colors text-white/80 hover:text-white"
                                    title="Remove from My Cards"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                                <div className="absolute bottom-3 left-5">
                                  <p className="text-sm font-bold text-foreground">{card.name}</p>
                                  <p className="text-[10px] text-muted-foreground">{card.issuer} · {card.network}</p>
                                </div>
                              </div>

                              {/* Card body */}
                              <div className="p-5">
                                {/* Stats row */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                  <span className="text-[10px] px-2.5 py-1 rounded-lg bg-gold/10 text-gold font-medium">{card.fee}/yr</span>
                                  <span className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-lg bg-secondary/40">
                                    <Star className="w-3 h-3 text-gold fill-gold" />{card.rating}
                                  </span>
                                  <span className="text-[10px] px-2.5 py-1 rounded-lg bg-secondary/40 text-muted-foreground">{card.rewards}</span>
                                  <span className="text-[10px] px-2.5 py-1 rounded-lg bg-secondary/40 text-muted-foreground">{card.lounge} lounge</span>
                                </div>

                                {/* Spend summary */}
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                  <div className="rounded-xl p-3 bg-secondary/20 border border-border/15">
                                    <p className="text-[9px] text-muted-foreground uppercase tracking-wider mb-1">Spend</p>
                                    <p className="text-base font-serif font-bold">{cardTotal > 0 ? `₹${(cardTotal / 1000).toFixed(1)}K` : "₹0"}</p>
                                  </div>
                                  <div className="rounded-xl p-3 border border-gold/15" style={{ background: `linear-gradient(135deg, hsl(var(--gold) / 0.06), transparent)` }}>
                                    <p className="text-[9px] text-gold uppercase tracking-wider mb-1 font-semibold">Expenses</p>
                                    <p className="text-base font-serif font-bold text-gold">{cardExpenses.length}</p>
                                  </div>
                                </div>

                                {/* Recent expenses for this card */}
                                {cardExpenses.length > 0 && (
                                  <div className="mb-4 space-y-1.5">
                                    {cardExpenses.slice(0, 3).map((exp) => {
                                      const catLabel = CATEGORIES.find((c) => c.value === exp.category)?.label || exp.category;
                                      return (
                                        <div key={exp.id} className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-secondary/10 transition-colors group/txn">
                                          <div className="flex items-center gap-2 min-w-0">
                                            <span className="text-[10px]">{catLabel.split(" ")[0]}</span>
                                            <span className="text-xs font-medium truncate">{exp.merchant}</span>
                                            <span className="text-[9px] text-muted-foreground">{exp.date}</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold">-₹{exp.amount.toLocaleString()}</span>
                                            <button
                                              onClick={() => deleteExpense(exp.id)}
                                              className="opacity-0 group-hover/txn:opacity-100 p-1 rounded hover:bg-red-500/20 transition-all"
                                            >
                                              <Trash2 className="w-3 h-3 text-muted-foreground hover:text-red-400" />
                                            </button>
                                          </div>
                                        </div>
                                      );
                                    })}
                                    {cardExpenses.length > 3 && (
                                      <p className="text-[10px] text-muted-foreground text-center pt-1">+{cardExpenses.length - 3} more</p>
                                    )}
                                  </div>
                                )}

                                {/* Actions */}
                                <div className="flex gap-2">
                                  <AddExpenseDialog
                                    cardId={card.id}
                                    cardName={card.name}
                                    cardColor={card.color}
                                    onAdd={addExpense}
                                  />
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
                        );
                      })}
                    </AnimatePresence>

                    {/* Add more card */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                      <Link to="/cards" className="h-full min-h-[200px] glass-card rounded-[22px] flex flex-col items-center justify-center gap-4 hover:border-gold/30 transition-all group block border border-dashed border-border/40 hover:border-solid">
                        <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-all group-hover:scale-110 duration-300">
                          <Plus className="w-6 h-6 text-gold" />
                        </div>
                        <div className="text-center">
                          <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors block">Add More Cards</span>
                          <span className="text-[10px] text-muted-foreground/60 mt-1 block">Browse our catalog</span>
                        </div>
                      </Link>
                    </motion.div>
                  </div>
                </TabsContent>

                {/* Expense Tracker Tab */}
                <TabsContent value="expenses">
                  <div className="space-y-6">
                    {/* Quick add for any card */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap gap-3">
                      {myCards.map((card) => (
                        <AddExpenseDialog
                          key={card.id}
                          cardId={card.id}
                          cardName={card.name}
                          cardColor={card.color}
                          onAdd={addExpense}
                          trigger={
                            <button className="text-xs py-2 px-4 rounded-xl border border-border/30 hover:border-gold/30 hover:bg-gold/5 transition-all flex items-center gap-2 font-medium">
                              <div className="w-4 h-2.5 rounded-sm" style={{ background: card.color }} />
                              <Plus className="w-3 h-3 text-gold" /> {card.name}
                            </button>
                          }
                        />
                      ))}
                    </motion.div>

                    {totalSpend === 0 ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                        <div className="w-20 h-20 rounded-2xl bg-secondary/20 flex items-center justify-center mx-auto mb-5">
                          <BarChart3 className="w-8 h-8 text-muted-foreground/30" />
                        </div>
                        <p className="font-serif text-xl font-bold mb-2">No expenses logged yet</p>
                        <p className="text-sm text-muted-foreground">Start tracking your spending on each card</p>
                      </motion.div>
                    ) : (
                      <>
                        {/* Charts row */}
                        <div className="grid lg:grid-cols-2 gap-6">
                          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-[22px] p-6 border border-border/20">
                            <h3 className="font-serif text-lg font-bold mb-1">Card-wise Spending</h3>
                            <p className="text-[10px] text-muted-foreground mb-6">Spend by card</p>
                            <div className="space-y-3">
                              {myCards.map((card) => {
                                const spend = totalByCard(card.id);
                                const pct = totalSpend > 0 ? (spend / totalSpend) * 100 : 0;
                                return (
                                  <div key={card.id} className="flex items-center gap-4">
                                    <div className="w-10 h-6 rounded-md flex-shrink-0 shadow-md overflow-hidden">
                                      {card.image ? (
                                        <img src={card.image} alt="" className="w-full h-full object-cover" />
                                      ) : (
                                        <div style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}AA)` }} className="w-full h-full" />
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-xs font-semibold truncate">{card.name}</span>
                                        <span className="text-xs font-bold">₹{spend > 0 ? (spend / 1000).toFixed(1) + "K" : "0"}</span>
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
                                  </div>
                                );
                              })}
                            </div>
                          </motion.div>

                          {categoryBreakdown.length > 0 && (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-[22px] p-6 border border-border/20">
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
                                        {totalCatSpend > 0 && <span className="text-[9px] text-muted-foreground ml-1.5">({((cat.value / totalCatSpend) * 100).toFixed(0)}%)</span>}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {/* All expenses list */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-[22px] p-6 border border-border/20">
                          <div className="flex items-center justify-between mb-6">
                            <div>
                              <h3 className="font-serif text-lg font-bold">All Expenses</h3>
                              <p className="text-[10px] text-muted-foreground mt-1">Across all your cards</p>
                            </div>
                            <span className="text-[10px] px-3 py-1 rounded-full bg-secondary/40 text-muted-foreground font-medium">{expenses.filter((e) => myCards.some((c) => c.id === e.cardId)).length} entries</span>
                          </div>
                          <div className="space-y-2">
                            {expenses
                              .filter((e) => myCards.some((c) => c.id === e.cardId))
                              .map((exp) => {
                                const card = cards.find((c) => c.id === exp.cardId);
                                const catLabel = CATEGORIES.find((c) => c.value === exp.category)?.label || exp.category;
                                const CatIcon = categoryIcons[exp.category] || ShoppingBag;
                                return (
                                  <div key={exp.id} className="flex items-center justify-between py-3 border-b border-border/10 last:border-0 group hover:bg-secondary/5 rounded-lg px-2 -mx-2 transition-colors">
                                    <div className="flex items-center gap-3">
                                      <div className="w-10 h-10 rounded-xl bg-secondary/30 flex items-center justify-center border border-border/15">
                                        <CatIcon className="w-4 h-4 text-muted-foreground" />
                                      </div>
                                      <div>
                                        <p className="text-sm font-semibold">{exp.merchant}</p>
                                        <p className="text-[10px] text-muted-foreground">{card?.name} · {exp.date}{exp.note && ` · ${exp.note}`}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <p className="text-sm font-bold">-₹{exp.amount.toLocaleString()}</p>
                                      <button
                                        onClick={() => deleteExpense(exp.id)}
                                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/20 transition-all"
                                      >
                                        <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-red-400" />
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </motion.div>
                      </>
                    )}
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
