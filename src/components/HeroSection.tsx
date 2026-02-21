import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Users } from "lucide-react";
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
  { value: 12, label: "Brands" },
  { value: 6, label: "Cards" },
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
          className="text-sm font-medium tracking-widest uppercase text-gold mb-5"
        >
          India's Premier Credit Card Perks Platform
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-5"
        >
          Track Voucher Rates.
          <br />
          <span className="gold-gradient">Maximize Savings.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="max-w-xl mx-auto text-muted-foreground text-base sm:text-lg mb-8"
        >
          Compare credit card voucher rates across brands and platforms. 
          Never miss the best deal on your rewards again.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
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

        {/* Stats with glow ring */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="relative inline-block mb-8"
        >
          {/* Animated glow ring */}
          <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-transparent via-gold/30 to-transparent animate-[shimmer_3s_linear_infinite] bg-[length:200%_100%]" />
          <div className="relative inline-flex items-center gap-6 sm:gap-10 glass-card rounded-2xl px-8 py-4">
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
          </div>
        </motion.div>

        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="flex items-center justify-center gap-2 text-xs text-muted-foreground"
        >
          <div className="flex -space-x-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full border-2 border-background bg-secondary flex items-center justify-center"
              >
                <Users className="w-3 h-3 text-muted-foreground" />
              </div>
            ))}
          </div>
          <span>Trusted by <span className="text-gold font-medium">10,000+</span> cardholders</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-muted-foreground/50"
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
