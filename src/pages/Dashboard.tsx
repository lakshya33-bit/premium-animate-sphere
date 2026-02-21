import { useState } from "react";
import { motion } from "framer-motion";
import { User, CreditCard, Heart, TrendingUp, Star, Settings, LogOut, Bell, Gift, BookOpen, ChevronRight, IndianRupee } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageLayout from "@/components/PageLayout";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { cards as allCards } from "@/data/cards";

const savedCardIds = ["hdfc-infinia", "axis-atlas", "hdfc-diners-black"];
const savedCards = allCards.filter((c) => savedCardIds.includes(c.id));

const favoriteVouchers = [
  { name: "Flipkart", discount: "Up to 7%", color: "#F8C534", id: "flipkart" },
  { name: "Zomato", discount: "Up to 10%", color: "#E23744", id: "zomato" },
  { name: "Amazon", discount: "Up to 6%", color: "#FF9900", id: "amazon" },
  { name: "MakeMyTrip", discount: "Up to 12%", color: "#EE2E24", id: "makemytrip" },
];

const savedGuides = [
  { title: "SmartBuy 10x Strategy", slug: "smartbuy-10x-hack", readTime: "12 min" },
  { title: "Credit Card Rewards 101", slug: "credit-card-rewards-101", readTime: "8 min" },
  { title: "Voucher Stacking Tips", slug: "voucher-stacking", readTime: "9 min" },
];

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
  { text: "Added Axis Atlas to My Cards", time: "1 day ago", icon: CreditCard },
  { text: "Saved Voucher Stacking guide", time: "2 days ago", icon: BookOpen },
  { text: "Earned 1,500 points on HDFC Infinia", time: "3 days ago", icon: Star },
  { text: "Compared ICICI Emeralde vs Diners Black", time: "5 days ago", icon: TrendingUp },
];

const sidebarItems = [
  { icon: CreditCard, label: "My Cards", count: 3, tab: "cards" },
  { icon: Heart, label: "Favorites", count: 4, tab: "favorites" },
  { icon: BookOpen, label: "Saved Guides", count: 3, tab: "favorites" },
  { icon: Bell, label: "Notifications", count: 2, tab: "activity" },
  { icon: Settings, label: "Settings", tab: null as string | null },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("cards");
  const { toast } = useToast();
  const navigate = useNavigate();

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

  return (
    <PageLayout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar profile */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
              <div className="glass-card rounded-2xl p-6 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-gold" />
                </div>
                <h2 className="font-serif text-xl font-bold text-center">Rahul Kumar</h2>
                <p className="text-xs text-muted-foreground text-center mt-1">rahul@example.com</p>
                <p className="text-[10px] text-gold text-center mt-2 px-3 py-1 rounded-full bg-gold/10 inline-block mx-auto">Premium Member</p>
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
                      {item.count && <span className="text-[10px] bg-gold/10 text-gold px-2 py-0.5 rounded-full">{item.count}</span>}
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
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="font-serif text-3xl font-bold mb-2">My <span className="gold-gradient">Dashboard</span></h1>
                <p className="text-sm text-muted-foreground mb-8">Track your cards, vouchers, and rewards in one place.</p>
              </motion.div>

              {/* Summary stats */}
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                {[
                  { label: "Total Rewards", value: "₹17,800", icon: IndianRupee, sub: "Lifetime earned" },
                  { label: "Active Cards", value: "3", icon: CreditCard, sub: "Cards tracked" },
                  { label: "Vouchers Redeemed", value: "24", icon: Gift, sub: "This year" },
                ].map((s, i) => (
                  <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card rounded-xl p-5">
                    <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center mb-3">
                      <s.icon className="w-4 h-4 text-gold" />
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

                <TabsContent value="cards">
                  <div className="space-y-4">
                    {savedCards.map((card, i) => (
                      <motion.div key={card.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                        <Link to={`/cards/${card.id}`} className="glass-card rounded-xl p-4 flex items-center justify-between group hover:border-gold/30 transition-all block">
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
                </TabsContent>

                <TabsContent value="favorites">
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {favoriteVouchers.map((v, i) => (
                      <motion.div key={v.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                        <Link to={`/vouchers/${v.id}`} className="glass-card rounded-xl p-4 flex items-center justify-between group hover:border-gold/30 transition-all block">
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
                  <h3 className="font-semibold text-sm mb-3 mt-8">Saved Guides</h3>
                  <div className="space-y-3">
                    {savedGuides.map((g) => (
                      <Link key={g.slug} to={`/guides/${g.slug}`} className="glass-card rounded-xl p-4 flex items-center justify-between group hover:border-gold/30 transition-all block">
                        <div>
                          <h4 className="text-sm font-medium group-hover:text-gold transition-colors">{g.title}</h4>
                          <p className="text-xs text-muted-foreground">{g.readTime} read</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </Link>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="rewards">
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6">
                    <h3 className="font-serif text-lg font-semibold mb-1">Rewards Earned</h3>
                    <p className="text-xs text-muted-foreground mb-6">Monthly reward points value (₹)</p>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={rewardsSummary}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 12% 18%)" />
                        <XAxis dataKey="month" tick={{ fill: "hsl(220 10% 55%)", fontSize: 12 }} axisLine={false} />
                        <YAxis tick={{ fill: "hsl(220 10% 55%)", fontSize: 12 }} axisLine={false} tickFormatter={(v) => `₹${v / 1000}K`} />
                        <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 12% 18%)", borderRadius: 12, color: "#fff", fontSize: 12 }} formatter={(v: number) => [`₹${v.toLocaleString()}`, "Earned"]} />
                        <Bar dataKey="earned" fill="hsl(43 55% 56%)" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                </TabsContent>

                <TabsContent value="activity">
                  <div className="space-y-3">
                    {activity.map((a, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="glass-card rounded-xl p-4 flex items-center gap-4">
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
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
