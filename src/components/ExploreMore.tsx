import { motion } from "framer-motion";
import { CreditCard, Sparkles, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  {
    icon: CreditCard,
    title: "Know Your Cards",
    description: "Deep-dive into every credit card's perks, fees, and hidden benefits. Make informed decisions.",
    href: "/cards",
  },
  {
    icon: Sparkles,
    title: "Perk AI",
    description: "AI-powered recommendations tailored to your spending patterns. Discover perks you didn't know existed.",
    href: "/perk-ai",
  },
  {
    icon: BookOpen,
    title: "Guides Hub",
    description: "Expert guides on maximizing rewards, credit card hacks, and smart redemption strategies.",
    href: "/guides",
  },
];

export default function ExploreMore() {
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
          <p className="text-sm font-medium tracking-widest uppercase text-gold mb-3">Explore More</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold">
            Unlock Your <span className="gold-gradient">Full Potential</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {sections.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <Link
                to={s.href}
                className="block glass-card rounded-2xl p-8 group hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-gold/5 h-full"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                  <s.icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{s.description}</p>
                <span className="inline-flex items-center gap-1 text-sm text-gold font-medium group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
