import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Star, TrendingUp, TrendingDown, IndianRupee, PieChart, ArrowUpDown, Receipt, ShoppingBag, UtensilsCrossed, Car, Fuel, Plane, Smartphone } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageLayout from "@/components/PageLayout";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell, LineChart, Line, CartesianGrid } from "recharts";

const cards = [
  { name: "HDFC Infinia", network: "Visa", fee: "₹12,500", rating: 4.8, rewards: "3.3% value", lounge: "Unlimited", vouchers: ["Flipkart 7%", "Amazon 5%", "BigBasket 8%"], color: "#003D8F", perks: ["10x on SmartBuy", "Golf access", "Concierge service"] },
  { name: "ICICI Emeralde", network: "Visa", fee: "₹12,000", rating: 4.7, rewards: "3.5% value", lounge: "Unlimited", vouchers: ["Amazon 6%", "Zomato 10%", "MakeMyTrip 12%"], color: "#F58220", perks: ["2 int'l lounge", "Cleartrip rewards", "Buy 1 Get 1 movies"] },
  { name: "Axis Atlas", network: "Visa", fee: "₹5,000", rating: 4.6, rewards: "2% value", lounge: "8/quarter", vouchers: ["MakeMyTrip 10%", "Uber 5%", "Zomato 8%"], color: "#97144D", perks: ["5x on travel", "Edge Miles", "Complimentary insurance"] },
  { name: "SBI Elite", network: "Visa", fee: "₹4,999", rating: 4.4, rewards: "2.5% value", lounge: "6/year", vouchers: ["Amazon 5%", "BigBasket 6%", "Croma 5%"], color: "#0033A0", perks: ["Milestone benefits", "Movie tickets", "Dining discounts"] },
  { name: "HDFC Diners Black", network: "Diners", fee: "₹10,000", rating: 4.7, rewards: "3.3% value", lounge: "Unlimited", vouchers: ["Zomato 10%", "Swiggy 8%", "MakeMyTrip 12%"], color: "#1A1A2E", perks: ["10x SmartBuy", "Golf worldwide", "Concierge"] },
  { name: "Kotak Royale", network: "Visa", fee: "₹3,000", rating: 4.2, rewards: "1.5% value", lounge: "4/quarter", vouchers: ["BookMyShow 10%", "Flipkart 5%", "Cult.fit 8%"], color: "#ED1C24", perks: ["PVR BOGO", "Airport lounge", "Fuel surcharge waiver"] },
];

const expenseData = [
  { month: "Sep", amount: 42500 },
  { month: "Oct", amount: 38900 },
  { month: "Nov", amount: 51200 },
  { month: "Dec", amount: 67800 },
  { month: "Jan", amount: 45600 },
  { month: "Feb", amount: 53200 },
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

export default function KnowYourCards() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  return (
    <PageLayout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-sm font-medium tracking-widest uppercase text-gold mb-3">Know Your Cards</p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Cards & <span className="gold-gradient">Expenses</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mb-10">Deep-dive into every credit card's perks, compare benefits, and track your spending across all cards.</p>
          </motion.div>

          <Tabs defaultValue="cards" className="w-full">
            <TabsList className="bg-secondary/50 border border-border/50 mb-8">
              <TabsTrigger value="cards" className="data-[state=active]:bg-gold data-[state=active]:text-background">
                <CreditCard className="w-4 h-4 mr-2" /> Cards
              </TabsTrigger>
              <TabsTrigger value="expenses" className="data-[state=active]:bg-gold data-[state=active]:text-background">
                <PieChart className="w-4 h-4 mr-2" /> Expenses
              </TabsTrigger>
            </TabsList>

            {/* Cards Tab */}
            <TabsContent value="cards">
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {cards.map((card, i) => (
                  <motion.div
                    key={card.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className={`tilt-card glass-card rounded-2xl overflow-hidden cursor-pointer transition-all ${selectedCard === i ? "ring-2 ring-gold" : ""}`}
                    onClick={() => setSelectedCard(selectedCard === i ? null : i)}
                  >
                    {/* Card header with gradient */}
                    <div className="h-24 relative" style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}88)` }}>
                      <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                      <div className="absolute bottom-3 left-5 right-5 flex items-end justify-between">
                        <div>
                          <h3 className="font-serif font-bold text-lg text-foreground">{card.name}</h3>
                          <p className="text-xs text-foreground/70">{card.network}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-background/30 backdrop-blur px-2 py-1 rounded-lg">
                          <Star className="w-3 h-3 text-gold fill-gold" />
                          <span className="text-xs font-medium">{card.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="text-center">
                          <p className="text-[10px] text-muted-foreground uppercase">Fee</p>
                          <p className="text-sm font-semibold">{card.fee}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] text-muted-foreground uppercase">Rewards</p>
                          <p className="text-sm font-semibold text-gold">{card.rewards}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] text-muted-foreground uppercase">Lounge</p>
                          <p className="text-sm font-semibold">{card.lounge}</p>
                        </div>
                      </div>

                      {selectedCard === i && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="border-t border-border/30 pt-4 space-y-3">
                          <div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Key Perks</p>
                            <div className="flex flex-wrap gap-1.5">
                              {card.perks.map((p) => (
                                <span key={p} className="text-[10px] px-2.5 py-1 rounded-full bg-gold/10 text-gold">{p}</span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Top Voucher Rates</p>
                            <div className="flex flex-wrap gap-1.5">
                              {card.vouchers.map((v) => (
                                <span key={v} className="text-[10px] px-2.5 py-1 rounded-full bg-secondary/60 text-foreground">{v}</span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Expenses Tab */}
            <TabsContent value="expenses">
              <div className="space-y-8">
                {/* Summary cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Total Spend", value: `₹${(totalExpense / 1000).toFixed(1)}K`, icon: IndianRupee, change: "+8.2%", up: true },
                    { label: "Rewards Earned", value: "₹4,850", icon: Star, change: "+12%", up: true },
                    { label: "Avg. Daily", value: "₹1,900", icon: TrendingUp, change: "-3%", up: false },
                    { label: "Transactions", value: "147", icon: ArrowUpDown, change: "+5%", up: true },
                  ].map((stat, i) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center">
                          <stat.icon className="w-4 h-4 text-gold" />
                        </div>
                        <span className={`text-xs font-medium flex items-center gap-0.5 ${stat.up ? "text-green-400" : "text-red-400"}`}>
                          {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {stat.change}
                        </span>
                      </div>
                      <p className="text-2xl font-serif font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Charts row */}
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Spending trend */}
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

                  {/* Category breakdown */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card rounded-2xl p-6">
                    <h3 className="font-serif text-lg font-semibold mb-1">Category Breakdown</h3>
                    <p className="text-xs text-muted-foreground mb-6">Where your money goes</p>
                    <div className="flex items-center gap-6">
                      <ResponsiveContainer width={140} height={140}>
                        <RePieChart>
                          <Pie data={categoryExpenses} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value" stroke="none">
                            {categoryExpenses.map((entry) => (
                              <Cell key={entry.name} fill={entry.color} />
                            ))}
                          </Pie>
                        </RePieChart>
                      </ResponsiveContainer>
                      <div className="flex-1 space-y-2.5">
                        {categoryExpenses.map((cat) => (
                          <div key={cat.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                              <span className="text-xs text-muted-foreground">{cat.name}</span>
                            </div>
                            <span className="text-xs font-medium">₹{(cat.value / 1000).toFixed(1)}K</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Card-wise spending */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card rounded-2xl p-6">
                  <h3 className="font-serif text-lg font-semibold mb-1">Card-wise Spending</h3>
                  <p className="text-xs text-muted-foreground mb-6">Spend distribution across your cards</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={[
                      { card: "HDFC Infinia", amount: 22500 },
                      { card: "Diners Black", amount: 12800 },
                      { card: "Axis Atlas", amount: 8500 },
                      { card: "SBI Elite", amount: 5400 },
                      { card: "ICICI Emeralde", amount: 4000 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 12% 18%)" />
                      <XAxis dataKey="card" tick={{ fill: "hsl(220 10% 55%)", fontSize: 11 }} axisLine={false} />
                      <YAxis tick={{ fill: "hsl(220 10% 55%)", fontSize: 11 }} axisLine={false} tickFormatter={(v) => `₹${v / 1000}K`} />
                      <Tooltip contentStyle={{ background: "hsl(220 18% 10%)", border: "1px solid hsl(220 12% 18%)", borderRadius: 12, color: "#fff", fontSize: 12 }} formatter={(v: number) => [`₹${v.toLocaleString()}`, "Spent"]} />
                      <Bar dataKey="amount" fill="hsl(43 55% 56%)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* Recent transactions */}
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
                            <td className="py-3 pr-4">
                              <div className="text-sm font-medium">{tx.merchant}</div>
                              <div className="text-[10px] text-muted-foreground">{tx.date}</div>
                            </td>
                            <td className="py-3 pr-4">
                              <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/60">{tx.category}</span>
                            </td>
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
    </PageLayout>
  );
}
