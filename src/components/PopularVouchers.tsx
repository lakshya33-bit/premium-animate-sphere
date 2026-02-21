import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, UtensilsCrossed, Car, ShoppingCart, Package } from "lucide-react";
import { Link } from "react-router-dom";

const vouchers = [
  { name: "Flipkart", category: "Shopping", discount: "Up to 7%", icon: ShoppingBag, color: "#F8C534" },
  { name: "Zomato", category: "Food & Dining", discount: "Up to 10%", icon: UtensilsCrossed, color: "#E23744" },
  { name: "Uber", category: "Travel & Rides", discount: "Up to 5%", icon: Car, color: "#000000" },
  { name: "BigBasket", category: "Groceries", discount: "Up to 8%", icon: ShoppingCart, color: "#84C225" },
  { name: "Amazon", category: "Shopping", discount: "Up to 6%", icon: Package, color: "#FF9900" },
];

export default function PopularVouchers() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-sm font-medium tracking-widest uppercase text-gold mb-3">Popular Vouchers</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              Trending <span className="gold-gradient">Brands</span>
            </h2>
          </div>
          <Link
            to="/vouchers"
            className="hidden sm:flex items-center gap-1 text-sm text-gold hover:text-gold-light transition-colors group"
          >
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 snap-x">
          {vouchers.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="min-w-[260px] snap-start tilt-card glass-card rounded-2xl p-6 group cursor-pointer flex-shrink-0"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${v.color}20` }}
                >
                  <v.icon className="w-5 h-5" style={{ color: v.color }} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{v.name}</h3>
                  <p className="text-xs text-muted-foreground">{v.category}</p>
                </div>
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-medium">
                {v.discount}
              </div>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                Redeem your credit card reward points for {v.name} vouchers at competitive rates.
              </p>
            </motion.div>
          ))}
        </div>

        <Link
          to="/vouchers"
          className="sm:hidden flex items-center justify-center gap-1 text-sm text-gold mt-6 hover:text-gold-light transition-colors"
        >
          View All Vouchers <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
