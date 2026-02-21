import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, CreditCard, Heart, TrendingUp, Star, Settings, LogOut, Bell, Gift, BookOpen, ChevronRight, IndianRupee } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageLayout from "@/components/PageLayout";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { cards as allCards } from "@/data/cards";
import { useMyCards } from "@/hooks/use-my-cards";
import { useFavorites } from "@/hooks/use-favorites";
import { vouchers } from "@/data/vouchers";
import { guides } from "@/data/guides";

const rewardsSummary = [
  { month: "Sep", earned: 2400 },
  { month: "Oct", earned: 1800 },
  { month: "Nov", earned: 3200 },
  { month: "Dec", earned: 4500 },
  { month: "Jan", earned: 2800 },
  { month: "Feb", earned: 3100 },
];

const activity = [
  { text: "Redeemed ₹2,000 Flipkart voucher", time: "2 hours ago", icon: Gift },
  { text: "Added ICICI Emeralde Private to My Cards", time: "1 day ago", icon: CreditCard },
  { text: "Saved Voucher Stacking guide", time: "2 days ago", icon: BookOpen },
  { text: "Earned 1,500 points on HSBC Premier", time: "3 days ago", icon: Star },
  { text: "Compared ICICI Emeralde vs Axis Neo", time: "5 days ago", icon: TrendingUp },
];

const sparklineRewards = [
  { v: 12 }, { v: 18 }, { v: 15 }, { v: 22 }, { v: 19 }, { v: 25 },
];
const sparklineCards = [
  { v: 1 }, { v: 1 }, { v: 2 }, { v: 2 }, { v: 3 }, { v: 3 },
];
const sparklineVouchers = [
  { v: 2 }, { v: 4 }, { v: 6 }, { v: 10 }, { v: 18 }, { v: 24 },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("cards");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { has: isMyCard, count: myCardCount } = useMyCards();
  const { isFav: isVoucherFav } = useFavorites("voucher");
  const { isFav: isGuideFav } = useFavorites("guide");

  const savedCards = allCards.filter((c) => isMyCard(c.id));
  const favoriteVoucherList = vouchers.filter((v) => isVoucherFav(v.id));
  const savedGuideList = guides.filter((g) => isGuideFav(g.slug));

  const sidebarItems = [
    { icon: CreditCard, label: "My Cards", count: savedCards.length, tab: "cards" },
    { icon: Heart, label: "Favorites", count: favoriteVoucherList.length + savedGuideList.length, tab: "favorites" },
    { icon: BookOpen, label: "Saved Guides", count: savedGuideList.length, tab: "favorites" },
    { icon: Bell, label: "Notifications", count: 2, tab: "activity" },
    { icon: Settings, label: "Settings", tab: null as string | null },
  ];

  const handleSidebarClick = (item: typeof sidebarItems[0]) => {
    if (item.tab) {
      setActiveTab(item.tab);
    } else if (item.label === "Settings") {
      toast({ title: "Settings", description: "Settings page coming soon!" });
    }
  };

  const handleLogout = () => {
    toast({ title: "Signed out", description: "You've been signed out successfully." });
    navigate("/login");
  };

  const statCards = [
    { label: "Total Rewards", value: "₹17,800", icon: IndianRupee, sub: "Lifetime earned", sparkline: sparklineRewards, color: "hsl(var(--gold))" },
    { label: "Active Cards", value: String(savedCards.length), icon: CreditCard, sub: "Cards tracked", sparkline: sparklineCards, color: "hsl(var(--gold-light))" },
    { label: "Vouchers Redeemed", value: "24", icon: Gift, sub: "This year", sparkline: sparklineVouchers, color: "hsl(var(--gold))" },
  ];

  return (
    <PageLayout>
      {/* Gradient hero header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/8 via-transparent to-gold/3" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[150px]"
          style={{ background: "hsl(var(--gold) / 0.06)" }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ repeat: Infinity, duration: 6 }}
        />
        <div className="container mx-auto px-4 py-10 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm text-muted-foreground mb-1">{getGreeting()},</p>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-1">
              Rahul <span className="gold-gradient">Kumar</span>
            </h1>
            <p className="text-sm text-muted-foreground">Track your cards, vouchers, and rewards in one place.</p>
          </motion.div>
        </div>
      </section>

      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-6 -mt-2">
            {/* Sidebar profile */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
              <div className="glass-card rounded-2xl p-6 mb-6">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center">
                    <User className="w-8 h-8 text-gold" />
                  </div>
                  <motion.div
                    className="absolute -inset-1 rounded-full border-2 border-gold/30"
                    animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                  />
                </div>
                <h2 className="font-serif text-xl font-bold text-center">Rahul Kumar</h2>
                <p className="text-xs text-muted-foreground text-center mt-1">rahul@example.com</p>
                <div className="flex justify-center mt-3">
                  <span className="text-[10px] font-bold tracking-wider uppercase shimmer-badge px-4 py-1.5 rounded-full bg-gold/10">
                    ✦ Premium Member
                  </span>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-4 space-y-1">
                {sidebarItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleSidebarClick(item)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors text-sm ${
                      item.tab === activeTab ? "bg-gold/10 text-gold" : "hover:bg-secondary/30 text-muted-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-2"><item.icon className="w-4 h-4" /> {item.label}</span>
                    <span className="flex items-center gap-1">
                      {item.count !== undefined && item.count > 0 && <span className="text-[10px] bg-gold/10 text-gold px-2 py-0.5 rounded-full">{item.count}</span>}
                      <ChevronRight className="w-3 h-3 text-muted-foreground" />
                    </span>
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-destructive/10 transition-colors text-sm text-muted-foreground hover:text-destructive"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </motion.div>

            {/* Main content */}
            <div className="lg:col-span-3">
              {/* Summary stats with sparklines */}
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {statCards.map((s, i) => (
                  <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card rounded-xl p-5 hover:shadow-lg hover:shadow-gold/5 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center">
                        <s.icon className="w-4 h-4 text-gold" />
                      </div>
                      <div className="w-16 h-8">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={s.sparkline}>
                            <defs>
                              <linearGradient id={`spark-${i}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={s.color} stopOpacity={0.3} />
                                <stop offset="100%" stopColor={s.color} stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="v" stroke={s.color} strokeWidth={1.5} fill={`url(#spark-${i})`} dot={false} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <p className="text-2xl font-serif font-bold">{s.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                    <p className="text-[10px] text-muted-foreground">{s.sub}</p>
                  </motion.div>
                ))}
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="bg-secondary/50 border border-border/50 mb-6">
                  <TabsTrigger value="cards" className="data-[state=active]:bg-gold data-[state=active]:text-background text-xs"><CreditCard className="w-3.5 h-3.5 mr-1" /> My Cards</TabsTrigger>
                  <TabsTrigger value="favorites" className="data-[state=active]:bg-gold data-[state=active]:text-background text-xs"><Heart className="w-3.5 h-3.5 mr-1" /> Favorites</TabsTrigger>
                  <TabsTrigger value="rewards" className="data-[state=active]:bg-gold data-[state=active]:text-background text-xs"><TrendingUp className="w-3.5 h-3.5 mr-1" /> Rewards</TabsTrigger>
                  <TabsTrigger value="activity" className="data-[state=active]:bg-gold data-[state=active]:text-background text-xs"><Bell className="w-3.5 h-3.5 mr-1" /> Activity</TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <TabsContent value="cards" forceMount className={activeTab !== "cards" ? "hidden" : ""}>
                      {savedCards.length === 0 ? (
                        <div className="text-center py-16 glass-card rounded-2xl">
                          <CreditCard className="w-12 h-12 mx-auto mb-4 text-muted-foreground/30" />
                          <p className="text-lg font-serif font-semibold mb-2">No cards added yet</p>
                          <p className="text-sm text-muted-foreground mb-4">Add cards from the catalog to track them here.</p>
                          <Link to="/cards" className="gold-btn px-6 py-2.5 rounded-xl text-sm inline-block">Browse Cards</Link>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {savedCards.map((card, i) => (
                            <motion.div key={card.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                              <Link to={`/cards/${card.id}`} className="glass-card rounded-xl p-4 flex items-center justify-between group hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all block">
                                <div className="flex items-center gap-4">
                                  <div className="w-16 h-10 rounded-lg overflow-hidden shadow-lg shadow-black/30 flex-shrink-0">
                                    {card.image ? (
                                      <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
                                    ) : (
                                      <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}88)` }} />
                                    )}
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-sm group-hover:text-gold transition-colors">{card.name}</h3>
                                    <p className="text-xs text-muted-foreground">{card.network} · {card.issuer}</p>
                                  </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-gold transition-colors" />
                              </Link>
                            </motion.div>
                          ))}
                          <Link to="/cards" className="block text-center text-sm text-gold hover:text-gold-light transition-colors mt-4">+ Add more cards</Link>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="favorites" forceMount className={activeTab !== "favorites" ? "hidden" : ""}>
                      {favoriteVoucherList.length === 0 && savedGuideList.length === 0 ? (
                        <div className="text-center py-16 glass-card rounded-2xl">
                          <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground/30" />
                          <p className="text-lg font-serif font-semibold mb-2">No favorites yet</p>
                          <p className="text-sm text-muted-foreground mb-4">Heart vouchers and guides to save them here.</p>
                          <Link to="/vouchers" className="gold-btn px-6 py-2.5 rounded-xl text-sm inline-block">Browse Vouchers</Link>
                        </div>
                      ) : (
                        <>
                          {favoriteVoucherList.length > 0 && (
                            <div className="grid sm:grid-cols-2 gap-4 mb-6">
                              {favoriteVoucherList.map((v, i) => (
                                <motion.div key={v.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                                  <Link to={`/vouchers/${v.id}`} className="glass-card rounded-xl p-4 flex items-center justify-between group hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all block">
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: `${v.color}15` }} />
                                      <div>
                                        <h3 className="font-semibold text-sm group-hover:text-gold transition-colors">{v.name}</h3>
                                        <p className="text-xs text-muted-foreground">{v.discount}</p>
                                      </div>
                                    </div>
                                    <Heart className="w-4 h-4 text-gold fill-gold" />
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          )}
                          {savedGuideList.length > 0 && (
                            <>
                              <h3 className="font-semibold text-sm mb-3 mt-8">Saved Guides</h3>
                              <div className="space-y-3">
                                {savedGuideList.map((g) => (
                                  <Link key={g.slug} to={`/guides/${g.slug}`} className="glass-card rounded-xl p-4 flex items-center justify-between group hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all block">
                                    <div>
                                      <h4 className="text-sm font-medium group-hover:text-gold transition-colors">{g.title}</h4>
                                      <p className="text-xs text-muted-foreground">{g.readTime} read</p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                  </Link>
                                ))}
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </TabsContent>

                    <TabsContent value="rewards" forceMount className={activeTab !== "rewards" ? "hidden" : ""}>
                      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6">
                        <h3 className="font-serif text-lg font-semibold mb-1">Rewards Earned</h3>
                        <p className="text-xs text-muted-foreground mb-6">Monthly reward points value (₹)</p>
                        <ResponsiveContainer width="100%" height={250}>
                          <BarChart data={rewardsSummary}>
                            <defs>
                              <linearGradient id="barGold" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="hsl(var(--gold-light))" stopOpacity={1} />
                                <stop offset="100%" stopColor="hsl(var(--gold-dark))" stopOpacity={0.8} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-stroke))" />
                            <XAxis dataKey="month" tick={{ fill: "hsl(var(--chart-text))", fontSize: 12 }} axisLine={false} />
                            <YAxis tick={{ fill: "hsl(var(--chart-text))", fontSize: 12 }} axisLine={false} tickFormatter={(v) => `₹${v / 1000}K`} />
                            <Tooltip contentStyle={{ background: "hsl(var(--tooltip-bg))", border: "1px solid hsl(var(--tooltip-border))", borderRadius: 12, color: "hsl(var(--tooltip-text))", fontSize: 12 }} formatter={(v: number) => [`₹${v.toLocaleString()}`, "Earned"]} />
                            <Bar dataKey="earned" fill="url(#barGold)" radius={[8, 8, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </motion.div>
                    </TabsContent>

                    <TabsContent value="activity" forceMount className={activeTab !== "activity" ? "hidden" : ""}>
                      <div className="space-y-3">
                        {activity.map((a, i) => (
                          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="glass-card rounded-xl p-4 flex items-center gap-4 hover:shadow-lg hover:shadow-gold/5 hover:-translate-y-0.5 transition-all duration-300">
                            <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                              <a.icon className="w-4 h-4 text-gold" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm">{a.text}</p>
                              <p className="text-[10px] text-muted-foreground mt-0.5">{a.time}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </TabsContent>
                  </motion.div>
                </AnimatePresence>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
