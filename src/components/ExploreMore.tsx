import { motion } from "framer-motion";
import { CreditCard, Sparkles, BookOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  {
    icon: CreditCard,
    title: "Know Your Cards",
    description: "Deep-dive into every credit card's perks, fees, and hidden benefits. Make informed decisions.",
    href: "/cards",
    badge: "6 premium cards",
    iconBg: "bg-gold/10",
    iconHoverBg: "group-hover:bg-gold/20",
    iconColor: "text-gold",
    gradientFrom: "from-gold/[0.03]",
  },
  {
    icon: Sparkles,
    title: "Perk AI",
    description: "AI-powered recommendations tailored to your spending patterns. Discover perks you didn't know existed.",
    href: "/perk-ai",
    badge: "AI-powered",
    iconBg: "bg-blue-500/10",
    iconHoverBg: "group-hover:bg-blue-500/20",
    iconColor: "text-blue-400",
    gradientFrom: "from-blue-500/[0.03]",
  },
  {
    icon: BookOpen,
    title: "Guides Hub",
    description: "Expert guides on maximizing rewards, credit card hacks, and smart redemption strategies.",
    href: "/guides",
    badge: "12+ guides",
    iconBg: "bg-emerald-500/10",
    iconHoverBg: "group-hover:bg-emerald-500/20",
    iconColor: "text-emerald-400",
    gradientFrom: "from-emerald-500/[0.03]",
  },
];

export default function ExploreMore() {
  return (
    <section className="py-16 relative">
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
                className={`block glass-card rounded-2xl p-8 group hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-gold/5 h-full bg-gradient-to-br ${s.gradientFrom} to-transparent`}
              >
                {/* Badge */}
                <span className="inline-block text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full bg-gold/10 text-gold mb-4">
                  {s.badge}
                </span>

                <div className={`w-12 h-12 rounded-xl ${s.iconBg} flex items-center justify-center mb-5 ${s.iconHoverBg} transition-colors`}>
                  <s.icon className={`w-5 h-5 ${s.iconColor}`} />
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
