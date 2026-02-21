import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Scene3D from "./Scene3D";

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 40;
          const increment = target / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: 519, label: "Brands" },
  { value: 160, label: "Cards" },
  { value: 5, label: "Platforms" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Scene3D />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background z-[1]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[1]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-sm font-medium tracking-widest uppercase text-gold mb-6"
        >
          India's Premier Credit Card Perks Platform
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          Track Voucher Rates.
          <br />
          <span className="gold-gradient">Maximize Savings.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="max-w-xl mx-auto text-muted-foreground text-base sm:text-lg mb-10"
        >
          Compare credit card voucher rates across brands and platforms. 
          Never miss the best deal on your rewards again.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            to="/vouchers"
            className="gold-btn px-8 py-3.5 rounded-xl text-sm flex items-center gap-2 group"
          >
            Browse Vouchers
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/cards"
            className="gold-outline-btn px-8 py-3.5 rounded-xl text-sm"
          >
            Compare Cards
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="inline-flex items-center gap-6 sm:gap-10 glass-card rounded-2xl px-8 py-4"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-3">
              {i > 0 && <div className="w-px h-8 bg-border" />}
              <div className="text-center">
                <div className="font-serif text-2xl sm:text-3xl font-bold text-gold">
                  <CountUp target={stat.value} />
                  {stat.label === "Brands" ? "+" : ""}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-3">
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <div className="text-xs font-medium text-gold">Updated</div>
              <div className="text-xs text-muted-foreground mt-0.5">Daily</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
