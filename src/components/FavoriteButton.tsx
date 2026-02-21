import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface FavoriteButtonProps {
  isFav: boolean;
  onToggle: () => void;
  className?: string;
  size?: "sm" | "md";
}

const particles = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  angle: (360 / 6) * i,
}));

export default function FavoriteButton({ isFav, onToggle, className = "", size = "sm" }: FavoriteButtonProps) {
  const [showBurst, setShowBurst] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      const willFav = !isFav;
      onToggle();
      if (willFav) {
        setShowBurst(true);
        setShowToast(true);
        setTimeout(() => setShowBurst(false), 600);
        setTimeout(() => setShowToast(false), 1800);
      }
    },
    [isFav, onToggle]
  );

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className={`p-1.5 rounded-lg transition-colors z-10 relative ${className}`}
        aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
      >
        {/* Particle burst */}
        <AnimatePresence>
          {showBurst && (
            <>
              {particles.map((p) => {
                const rad = (p.angle * Math.PI) / 180;
                const x = Math.cos(rad) * 18;
                const y = Math.sin(rad) * 18;
                return (
                  <motion.span
                    key={p.id}
                    initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    animate={{ opacity: 0, scale: 0, x, y }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-gold -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  />
                );
              })}
              {/* Ring burst */}
              <motion.span
                initial={{ opacity: 0.6, scale: 0.5 }}
                animate={{ opacity: 0, scale: 2.5 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 rounded-full border-2 border-gold pointer-events-none"
              />
            </>
          )}
        </AnimatePresence>

        <motion.div
          animate={showBurst ? { scale: [1, 1.4, 0.9, 1.1, 1] } : { scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Heart
            className={`${iconSize} transition-all duration-300 ${
              isFav ? "text-gold fill-gold drop-shadow-[0_0_6px_hsl(var(--gold)/0.5)]" : "text-muted-foreground hover:text-gold"
            }`}
          />
        </motion.div>
      </button>

      {/* Floating toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.8 }}
            animate={{ opacity: 1, y: -8, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap z-50 pointer-events-none"
          >
            <div className="px-3 py-1.5 rounded-full bg-gold text-background text-[10px] font-bold shadow-xl shadow-gold/30 flex items-center gap-1">
              <Heart className="w-2.5 h-2.5 fill-background" />
              Added to Favorites
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
