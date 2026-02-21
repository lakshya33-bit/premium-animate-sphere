import { motion } from "framer-motion";
import { Target, Users, TrendingUp, Shield, Heart, Zap } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const values = [
  { icon: Target, title: "Transparency", description: "We show real-time data, unbiased comparisons, and never hide fees or conditions." },
  { icon: Users, title: "Community First", description: "Built by credit card enthusiasts for credit card enthusiasts. Your feedback shapes our platform." },
  { icon: TrendingUp, title: "Data-Driven", description: "Every recommendation is backed by data analysis across 500+ brands and 160+ cards." },
  { icon: Shield, title: "Trust & Security", description: "We never ask for your card details. Your privacy and security are our top priorities." },
];

const team = [
  { name: "Arjun Mehta", role: "Founder & CEO", bio: "Former fintech product lead with a passion for maximizing credit card rewards." },
  { name: "Priya Sharma", role: "Head of Data", bio: "Data scientist who tracks voucher rates across every major platform daily." },
  { name: "Rohan Gupta", role: "Lead Engineer", bio: "Full-stack developer building the most comprehensive card perks platform in India." },
];

export default function About() {
  return (
    <PageLayout>
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <p className="text-sm font-medium tracking-widest uppercase text-gold mb-3">About Us</p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
              The Story Behind <span className="gold-gradient">CardPerks</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              CardPerks was born from a simple frustration — credit card rewards are confusing, voucher rates change daily, and no one tracks them properly. We set out to build India's most comprehensive credit card perks and voucher tracking platform.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card rounded-2xl p-8 sm:p-10 mb-16 text-center">
            <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-5">
              <Zap className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-serif text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              To help every credit card holder in India understand, compare, and maximize the value of their rewards — saving them thousands of rupees every year.
            </p>
          </motion.div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="font-serif text-2xl font-bold text-center mb-10">What We <span className="gold-gradient">Stand For</span></h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {values.map((v, i) => (
                <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card rounded-2xl p-6">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                    <v.icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="mb-16">
            <h2 className="font-serif text-2xl font-bold text-center mb-10">Meet the <span className="gold-gradient">Team</span></h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {team.map((t, i) => (
                <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card rounded-2xl p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mx-auto mb-4">
                    <span className="font-serif text-xl font-bold text-gold">{t.name.split(" ").map((n) => n[0]).join("")}</span>
                  </div>
                  <h3 className="font-semibold text-sm">{t.name}</h3>
                  <p className="text-xs text-gold mb-3">{t.role}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card rounded-2xl p-8 text-center">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { value: "50K+", label: "Monthly Users" },
                { value: "519+", label: "Brands Tracked" },
                { value: "160+", label: "Cards Compared" },
                { value: "₹2Cr+", label: "Savings Unlocked" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-serif text-2xl font-bold text-gold">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}
