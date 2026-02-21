import { motion } from "framer-motion";
import { TrendingUp, CreditCard, PieChart } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Track Voucher Rates",
    description: "Monitor real-time voucher conversion rates across 500+ brands. Know exactly when to redeem for maximum value.",
  },
  {
    icon: CreditCard,
    title: "Compare Cards",
    description: "Side-by-side comparison of 160+ credit cards. Find the perfect card for your spending habits and lifestyle.",
  },
  {
    icon: PieChart,
    title: "Savings Dashboard",
    description: "Visualize your savings potential with personalized insights and track how much you've saved over time.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium tracking-widest uppercase text-gold mb-3">How It Works</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            Three Steps to <span className="gold-gradient">Smarter Savings</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="tilt-card glass-card rounded-2xl p-8 text-center group cursor-default"
            >
              <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-gold/20 transition-colors">
                <feature.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
