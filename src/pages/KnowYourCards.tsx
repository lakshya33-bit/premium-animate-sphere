import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Star, TrendingUp, TrendingDown, IndianRupee, PieChart, ArrowUpDown, Receipt, ShoppingBag, UtensilsCrossed, Car, Fuel, Plane, Smartphone, Eye, ExternalLink, Check, X, Heart, ArrowRight, GitCompare, Plus, Wallet, Award, Globe, Filter, SortAsc } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
import { useMyCards } from "@/hooks/use-my-cards";
import FavoriteButton from "@/components/FavoriteButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import BackToTop from "@/components/BackToTop";
import { cards, type CreditCard as CardType } from "@/data/cards";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell, LineChart, Line, CartesianGrid } from "recharts";

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
  { merchant: "Amazon India", category: "Shopping", amount: 4599, date: "Feb 19", card: "ICICI Emeralde Private", reward: "₹230" },
  { merchant: "Zomato Gold", category: "Food", amount: 1200, date: "Feb 18", card: "Axis Neo", reward: "₹120" },
  { merchant: "HPCL Fuel", category: "Fuel", amount: 3500, date: "Feb 17", card: "ICICI Rubyx", reward: "₹88" },
  { merchant: "Flipkart", category: "Shopping", amount: 8999, date: "Feb 16", card: "HDFC Shoppers Stop", reward: "₹360" },
  { merchant: "MakeMyTrip", category: "Travel", amount: 12500, date: "Feb 15", card: "ICICI MakeMyTrip", reward: "₹625" },
  { merchant: "Swiggy", category: "Food", amount: 850, date: "Feb 14", card: "HSBC Premier", reward: "₹85" },
  { merchant: "Croma", category: "Electronics", amount: 15999, date: "Feb 12", card: "ICICI Emeralde Private", reward: "₹480" },
  { merchant: "BigBasket", category: "Groceries", amount: 2340, date: "Feb 11", card: "HSBC Premier", reward: "₹187" },
];

const totalExpense = categoryExpenses.reduce((s, c) => s + c.value, 0);

// Card color lookup for transactions
const cardColorMap: Record<string, string> = {};
cards.forEach((c) => {
  cardColorMap[c.name] = c.color;
  // Also map short names used in transactions
  if (c.name === "ICICI Emeralde Private Metal") cardColorMap["ICICI Emeralde Private"] = c.color;
});

// Get unique types and issuers for stats
const uniqueTypes = [...new Set(cards.map((c) => c.type))];
const uniqueIssuers = [...new Set(cards.map((c) => c.issuer))];
const feeRange = (() => {
  const fees = cards.map((c) => parseInt(c.fee.replace(/[₹,]/g, "")));
  return { min: Math.min(...fees), max: Math.max(...fees) };
})();
const highestRatedCard = cards.reduce((best, c) => (c.rating > best.rating ? c : best), cards[0]);

type SortOption = "rating" | "fee-low" | "fee-high";

function CardQuickView({ card, open, onClose }: { card: CardType | null; open: boolean; onClose: () => void }) {
  if (!card) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-card border-border/50 sm:max-w-lg p-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {/* Brand-tinted header */}
          <div className="p-6 pb-4" style={{ background: `linear-gradient(135deg, ${card.color}08, ${card.color}15, transparent)` }}>
            <DialogHeader>
              <div className="flex items-center gap-4">
                <div className="w-32 aspect-[1.586/1] rounded-xl overflow-hidden shadow-xl shadow-black/40 flex-shrink-0">
                  {card.image ? (
                    <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}88)` }} />
                  )}
                </div>
                <div>
                  <DialogTitle className="font-serif text-xl flex items-center gap-2">
                    {card.name}
                    <span className="flex items-center gap-1 text-sm font-normal">
                      <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                      <span className="text-sm">{card.rating}</span>
                    </span>
                  </DialogTitle>
                  <p className="text-xs text-muted-foreground">{card.issuer} · {card.network} · {card.type}</p>
                </div>
              </div>
            </DialogHeader>
          </div>

          <div className="p-6 pt-2 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[{ l: "Fee", v: card.fee }, { l: "Rewards", v: card.rewards }, { l: "Lounge", v: card.lounge }].map((s) => (
                <div key={s.l} className="text-center bg-secondary/30 rounded-xl p-3">
                  <p className="text-[10px] text-muted-foreground uppercase">{s.l}</p>
                  <p className="text-sm font-semibold text-gold mt-1">{s.v}</p>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground">Min. Income: <span className="text-foreground font-medium">{card.minIncome}</span></p>
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
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

export default function KnowYourCards() {
  const [quickViewCard, setQuickViewCard] = useState<CardType | null>(null);
  const { toggle: toggleFav, isFav } = useFavorites("card");
  const { toggle: toggleMyCard, has: isMyCard } = useMyCards();
  const [compareList, setCompareList] = useState<string[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Know Your Cards | CardPerks";
    return () => { document.title = "CardPerks"; };
  }, []);

  const toggleCompare = (id: string) => {
    setCompareList((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  };

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { All: cards.length };
    cards.forEach((c) => { counts[c.type] = (counts[c.type] || 0) + 1; });
    return counts;
  }, []);

  const filteredAndSorted = useMemo(() => {
    let filtered = typeFilter === "All" ? [...cards] : cards.filter((c) => c.type === typeFilter);
    const parseFee = (f: string) => parseInt(f.replace(/[₹,]/g, ""));
    switch (sortBy) {
      case "rating": filtered.sort((a, b) => b.rating - a.rating); break;
      case "fee-low": filtered.sort((a, b) => parseFee(a.fee) - parseFee(b.fee)); break;
      case "fee-high": filtered.sort((a, b) => parseFee(b.fee) - parseFee(a.fee)); break;
    }
    return filtered;
  }, [typeFilter, sortBy]);

  return (
    <PageLayout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Header with gradient accent */}
          <div className="relative mb-10">
            <div className="absolute inset-0 -mx-4 rounded-3xl bg-gradient-to-br from-gold/[0.04] via-transparent to-gold/[0.02] pointer-events-none" />
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative">
              <p className="text-sm font-medium tracking-widest uppercase text-gold mb-3">Know Your Cards</p>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Cards & <span className="gold-gradient">Expenses</span></h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5">
                <p className="text-muted-foreground max-w-xl">Deep-dive into every credit card's perks, compare benefits, and track your spending across all cards.</p>
                <Link to="/compare" className="px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 flex-shrink-0 w-fit border border-gold/30 text-gold hover:bg-gold/10 transition-all duration-300 font-medium backdrop-blur-sm">
                  <GitCompare className="w-4 h-4" /> Compare Cards
                </Link>
              </div>
              {/* Stats pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: CreditCard, text: `${cards.length} Cards` },
                  { icon: Globe, text: `${uniqueIssuers.length} Issuers` },
                  { icon: IndianRupee, text: `₹${feeRange.min.toLocaleString()} – ₹${feeRange.max.toLocaleString()} range` },
                ].map((stat) => (
                  <span key={stat.text} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/30 text-xs text-muted-foreground">
                    <stat.icon className="w-3 h-3 text-gold" /> {stat.text}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <Tabs defaultValue="cards" className="w-full">
            <TabsList className="bg-secondary/50 border border-border/50 mb-8">
              <TabsTrigger value="cards" className="data-[state=active]:bg-gold data-[state=active]:text-background"><CreditCard className="w-4 h-4 mr-2" /> Cards</TabsTrigger>
              <TabsTrigger value="expenses" className="data-[state=active]:bg-gold data-[state=active]:text-background"><PieChart className="w-4 h-4 mr-2" /> Expenses</TabsTrigger>
            </TabsList>

            <TabsContent value="cards">
              {/* Filter & Sort Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
                  {["All", ...uniqueTypes].map((type) => (
                    <button
                      key={type}
                      onClick={() => setTypeFilter(type)}
                      className={`text-xs px-3.5 py-2 rounded-lg whitespace-nowrap transition-all font-medium flex items-center gap-1.5 ${
                        typeFilter === type
                          ? "bg-gold text-background shadow-md shadow-gold/20"
                          : "glass-card hover:border-gold/30 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {type} <span className={`text-[10px] ${typeFilter === type ? "text-background/70" : "text-muted-foreground/60"}`}>({typeCounts[type] || 0})</span>
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider mr-1">Sort:</span>
                  {([["rating", "Rating"], ["fee-low", "Fee ↑"], ["fee-high", "Fee ↓"]] as [SortOption, string][]).map(([val, label]) => (
                    <button
                      key={val}
                      onClick={() => setSortBy(val)}
                      className={`text-[11px] px-2.5 py-1.5 rounded-lg transition-all ${
                        sortBy === val ? "bg-gold/15 text-gold font-semibold" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results count */}
              <p className="text-xs text-muted-foreground mb-4">Showing {filteredAndSorted.length} card{filteredAndSorted.length !== 1 ? "s" : ""}</p>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredAndSorted.map((card, i) => {
                  const isSelected = compareList.includes(card.id);
                  const isTopPick = card.id === highestRatedCard.id;
                  return (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      className={`tilt-card glass-card rounded-2xl overflow-hidden transition-all duration-300 ${isSelected ? "ring-2 ring-gold/50 shadow-lg shadow-gold/10" : ""}`}
                      style={{
                        // @ts-ignore
                        "--card-glow": card.color,
                      } as React.CSSProperties}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px -8px ${card.color}30`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = isSelected ? `0 10px 15px -3px rgba(248,197,52,0.1)` : "";
                      }}
                    >
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
                        {/* Top Pick badge */}
                        {isTopPick && (
                          <div className="absolute top-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 bg-gold px-2.5 py-1 rounded-full shadow-lg shadow-gold/30">
                            <Award className="w-3 h-3 text-background" />
                            <span className="text-[10px] font-bold text-background tracking-wide">TOP PICK</span>
                          </div>
                        )}
                        <div className="absolute top-7 right-7 flex items-center gap-1 bg-background/70 backdrop-blur-md px-2 py-1 rounded-lg shadow-lg">
                          <Star className="w-3 h-3 text-gold fill-gold" /><span className="text-xs font-medium">{card.rating}</span>
                        </div>
                        <div className="absolute top-7 left-7 z-10">
                          <FavoriteButton
                            isFav={isFav(card.id)}
                            onToggle={() => toggleFav(card.id)}
                            className="bg-background/70 backdrop-blur-md shadow-lg hover:bg-background/90"
                          />
                        </div>
                      </div>
                      <div className="px-5 pb-5">
                        {/* Tier badge */}
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: `${card.color}15`, color: card.color }}>
                            {card.type}
                          </span>
                        </div>
                        <h3 className="font-serif font-bold text-lg">{card.name}</h3>
                        <p className="text-xs text-muted-foreground mb-1.5">{card.issuer} · {card.network}</p>
                        {/* bestFor preview pills */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {card.bestFor.slice(0, 2).map((b) => (
                            <span key={b} className="text-[10px] px-2 py-0.5 rounded-full bg-gold/8 text-gold/80">{b}</span>
                          ))}
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-4">
                          <div className="text-center bg-secondary/30 rounded-xl py-2"><p className="text-[10px] text-muted-foreground uppercase">Fee</p><p className="text-sm font-semibold">{card.fee}</p></div>
                          <div className="text-center bg-secondary/30 rounded-xl py-2"><p className="text-[10px] text-muted-foreground uppercase">Rewards</p><p className="text-sm font-semibold text-gold">{card.rewards}</p></div>
                          <div className="text-center bg-secondary/30 rounded-xl py-2"><p className="text-[10px] text-muted-foreground uppercase">Lounge</p><p className="text-sm font-semibold">{card.lounge}</p></div>
                        </div>
                        {/* Consolidated action row */}
                        <div className="flex gap-2">
                          <button onClick={() => setQuickViewCard(card)} className="flex-1 text-xs py-2 rounded-lg gold-outline-btn flex items-center justify-center gap-1"><Eye className="w-3 h-3" /> Quick View</button>
                          <Link to={`/cards/${card.id}`} className="flex-1 text-xs py-2 rounded-lg gold-btn flex items-center justify-center gap-1"><ExternalLink className="w-3 h-3" /> Full View</Link>
                          <button
                            onClick={() => toggleCompare(card.id)}
                            className={`text-xs py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1 ${
                              isSelected
                                ? "bg-gold text-background"
                                : "glass-card hover:border-gold/30 text-muted-foreground hover:text-gold"
                            }`}
                          >
                            {isSelected ? <Check className="w-3 h-3" /> : <GitCompare className="w-3 h-3" />}
                          </button>
                          <button
                            onClick={() => toggleMyCard(card.id)}
                            className={`text-xs py-2 px-3 rounded-lg transition-all flex items-center justify-center ${
                              isMyCard(card.id)
                                ? "bg-gold/15 text-gold border border-gold/30"
                                : "glass-card hover:border-gold/30 text-muted-foreground hover:text-gold"
                            }`}
                            title={isMyCard(card.id) ? "In My Cards" : "Add to My Cards"}
                          >
                            {isMyCard(card.id) ? <Check className="w-3 h-3" /> : <Wallet className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
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
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`glass-card rounded-xl p-5 ${stat.up ? "bg-gradient-to-br from-green-500/[0.04] to-transparent" : "bg-gradient-to-br from-red-500/[0.04] to-transparent"}`}
                    >
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
                        <RechartsTooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 12% 18%)", borderRadius: 12, color: "#fff", fontSize: 12 }} formatter={(v: number) => [`₹${v.toLocaleString()}`, "Spent"]} />
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
                        {categoryExpenses.map((cat) => {
                          const pct = ((cat.value / totalExpense) * 100).toFixed(1);
                          return (
                            <div key={cat.name} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                                <cat.icon className="w-3 h-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{cat.name} <span className="text-foreground/50">{pct}%</span></span>
                              </div>
                              <span className="text-xs font-medium">₹{(cat.value / 1000).toFixed(1)}K</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card rounded-2xl p-6">
                  <h3 className="font-serif text-lg font-semibold mb-1">Card-wise Spending</h3>
                  <p className="text-xs text-muted-foreground mb-6">Spend distribution across your cards</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={[{ card: "Emeralde Private", amount: 22500 }, { card: "HSBC Premier", amount: 12800 }, { card: "ICICI MakeMyTrip", amount: 8500 }, { card: "Axis Neo", amount: 5400 }, { card: "ICICI Rubyx", amount: 4000 }, { card: "HDFC Shoppers", amount: 3200 }]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 12% 18%)" />
                      <XAxis dataKey="card" tick={{ fill: "hsl(220 10% 55%)", fontSize: 11 }} axisLine={false} />
                      <YAxis tick={{ fill: "hsl(220 10% 55%)", fontSize: 11 }} axisLine={false} tickFormatter={(v) => `₹${v / 1000}K`} />
                      <RechartsTooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 12% 18%)", borderRadius: 12, color: "#fff", fontSize: 12 }} formatter={(v: number) => [`₹${v.toLocaleString()}`, "Spent"]} />
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
                        {recentTransactions.map((tx, i) => {
                          const txColor = cardColorMap[tx.card] || "#888";
                          return (
                            <tr key={i} className="border-b border-border/10 hover:bg-secondary/20 transition-colors">
                              <td className="py-3 pr-4"><div><p className="text-sm font-medium">{tx.merchant}</p><p className="text-[10px] text-muted-foreground">{tx.date}</p></div></td>
                              <td className="py-3 pr-4 text-xs text-muted-foreground">{tx.category}</td>
                              <td className="py-3 pr-4">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: txColor }} />
                                  <span className="text-xs text-muted-foreground">{tx.card}</span>
                                </div>
                              </td>
                              <td className="py-3 pr-4 text-right text-sm font-medium">₹{tx.amount.toLocaleString()}</td>
                              <td className="py-3 text-right text-xs text-gold font-medium">{tx.reward}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Floating compare bar */}
      <AnimatePresence>
        {compareList.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-0 right-0 z-50 flex justify-center"
          >
            <TooltipProvider>
              <div className="glass-card rounded-2xl border border-gold/20 shadow-2xl shadow-gold/10 px-6 py-4 flex items-center gap-4">
                <div className="flex items-center gap-3">
                  {compareList.map((id) => {
                    const c = cards.find((card) => card.id === id);
                    if (!c) return null;
                    return (
                      <Tooltip key={id}>
                        <TooltipTrigger asChild>
                          <div className="relative group/chip text-center">
                            <div className="w-14 h-[36px] rounded-lg overflow-hidden shadow-md border border-border/20">
                              {c.image ? (
                                <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${c.color}, ${c.color}88)` }} />
                              )}
                            </div>
                            <p className="text-[9px] text-muted-foreground mt-1 max-w-14 truncate">{c.name.split(" ").slice(-1)[0]}</p>
                            <button
                              onClick={() => toggleCompare(id)}
                              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive flex items-center justify-center opacity-0 group-hover/chip:opacity-100 transition-opacity"
                            >
                              <X className="w-2.5 h-2.5 text-white" />
                            </button>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent><p>{c.name}</p></TooltipContent>
                      </Tooltip>
                    );
                  })}
                  {Array.from({ length: Math.max(0, 2 - compareList.length) }).map((_, i) => (
                    <div key={`empty-${i}`} className="w-14 h-[36px] rounded-lg border border-dashed border-border/50 flex items-center justify-center">
                      <span className="text-[10px] text-muted-foreground">+</span>
                    </div>
                  ))}
                </div>
                <div className="h-8 w-px bg-border/30" />
                <div className="text-xs text-muted-foreground">
                  <span className="text-gold font-semibold">{compareList.length}</span>/4 selected
                </div>
                <button
                  onClick={() => navigate(`/compare?cards=${compareList.join(",")}`)}
                  disabled={compareList.length < 2}
                  className={`px-5 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-all ${
                    compareList.length >= 2
                      ? "gold-btn"
                      : "bg-secondary/50 text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  <GitCompare className="w-3.5 h-3.5" /> Compare Now
                </button>
                <button
                  onClick={() => setCompareList([])}
                  className="p-2 rounded-lg hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </TooltipProvider>
          </motion.div>
        )}
      </AnimatePresence>

      <CardQuickView card={quickViewCard} open={!!quickViewCard} onClose={() => setQuickViewCard(null)} />
      <BackToTop />
    </PageLayout>
  );
}
