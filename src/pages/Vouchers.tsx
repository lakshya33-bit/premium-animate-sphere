import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ShoppingBag, UtensilsCrossed, Car, ShoppingCart, Package, Fuel, Plane, Smartphone, Tv, Dumbbell, GraduationCap, Gift } from "lucide-react";
import { Input } from "@/components/ui/input";
import PageLayout from "@/components/PageLayout";

const categories = ["All", "Shopping", "Food & Dining", "Travel", "Groceries", "Fuel", "Entertainment", "Fitness", "Education", "Electronics"];

const iconMap: Record<string, any> = {
  Shopping: ShoppingBag, "Food & Dining": UtensilsCrossed, Travel: Plane, Groceries: ShoppingCart,
  Fuel: Fuel, Entertainment: Tv, Fitness: Dumbbell, Education: GraduationCap, Electronics: Smartphone,
};

const vouchers = [
  { name: "Flipkart", category: "Shopping", discount: "Up to 7%", description: "India's leading e-commerce platform. Redeem for electronics, fashion & more.", cards: ["HDFC Infinia", "ICICI Emeralde"], bestRate: "7.2%", color: "#F8C534" },
  { name: "Amazon", category: "Shopping", discount: "Up to 6%", description: "Shop millions of products with competitive voucher rates.", cards: ["ICICI Amazon Pay", "SBI Elite"], bestRate: "6.5%", color: "#FF9900" },
  { name: "Zomato", category: "Food & Dining", discount: "Up to 10%", description: "Order food, dine out, and enjoy premium dining experiences.", cards: ["HDFC Diners Black", "Axis Vistara"], bestRate: "10%", color: "#E23744" },
  { name: "Swiggy", category: "Food & Dining", discount: "Up to 8%", description: "Food delivery, Instamart groceries, and Dineout reservations.", cards: ["HDFC Swiggy", "Kotak 811"], bestRate: "8.5%", color: "#FC8019" },
  { name: "Uber", category: "Travel", discount: "Up to 5%", description: "Ride-hailing and Uber Eats food delivery vouchers.", cards: ["Axis Flipkart", "HDFC Millennia"], bestRate: "5%", color: "#276EF1" },
  { name: "BigBasket", category: "Groceries", discount: "Up to 8%", description: "Online grocery shopping with fresh produce and essentials.", cards: ["HDFC Infinia", "SBI SimplyCLICK"], bestRate: "8%", color: "#84C225" },
  { name: "HPCL", category: "Fuel", discount: "Up to 5%", description: "Fuel vouchers for HPCL petrol pumps across India.", cards: ["HDFC Indian Oil", "SBI BPCL"], bestRate: "5%", color: "#006838" },
  { name: "MakeMyTrip", category: "Travel", discount: "Up to 12%", description: "Book flights, hotels, and holiday packages at great rates.", cards: ["HDFC Diners Black", "Axis Atlas"], bestRate: "12%", color: "#EE2E24" },
  { name: "BookMyShow", category: "Entertainment", discount: "Up to 15%", description: "Movie tickets, events, and live entertainment vouchers.", cards: ["Kotak Royale", "HDFC Millennia"], bestRate: "15%", color: "#C4242B" },
  { name: "Cult.fit", category: "Fitness", discount: "Up to 10%", description: "Gym memberships, fitness classes, and wellness products.", cards: ["ICICI Coral", "Axis Ace"], bestRate: "10%", color: "#FF6B35" },
  { name: "Coursera", category: "Education", discount: "Up to 20%", description: "Online courses and professional certifications.", cards: ["HDFC Regalia", "SBI Elite"], bestRate: "20%", color: "#0056D2" },
  { name: "Croma", category: "Electronics", discount: "Up to 6%", description: "Electronics, gadgets, and home appliances from Tata's retail chain.", cards: ["HDFC Infinia", "Axis Privilege"], bestRate: "6%", color: "#00A651" },
];

export default function Vouchers() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

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
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Browse <span className="gold-gradient">Vouchers</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mb-8">Compare voucher rates across 500+ brands. Find the best redemption deals for your credit card reward points.</p>
          </motion.div>

          {/* Search & Filter */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search brands or categories..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-secondary/50 border-border/50" />
            </div>
          </motion.div>

          {/* Category pills */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} className="flex gap-2 flex-wrap mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat ? "bg-gold text-background" : "glass-card text-muted-foreground hover:text-foreground hover:border-gold/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Voucher Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((v, i) => {
              const Icon = iconMap[v.category] || Gift;
              return (
                <motion.div
                  key={v.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="tilt-card glass-card rounded-2xl p-6 group cursor-pointer"
                >
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
                  <div className="border-t border-border/30 pt-3">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Top Cards</p>
                    <div className="flex flex-wrap gap-1">
                      {v.cards.map((c) => (
                        <span key={c} className="text-[10px] px-2 py-0.5 rounded bg-secondary/60 text-muted-foreground">{c}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg">No vouchers found</p>
              <p className="text-sm mt-2">Try a different search or category</p>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
