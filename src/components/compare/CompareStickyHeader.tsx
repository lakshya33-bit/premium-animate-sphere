import { motion } from "framer-motion";
import { X } from "lucide-react";
import { type CreditCard } from "@/data/cards";

interface StickyHeaderProps {
  selected: CreditCard[];
  onRemove: (id: string) => void;
  visible: boolean;
}

export default function CompareStickyHeader({ selected, onRemove, visible }: StickyHeaderProps) {
  if (!visible || selected.length < 2) return null;

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -60, opacity: 0 }}
      className="fixed top-20 left-0 right-0 z-30 backdrop-blur-xl bg-background/80 border-b border-border/30 shadow-lg shadow-black/10"
    >
      <div className="container mx-auto px-4 py-3">
        <div
          className={`grid gap-4 ${
            selected.length <= 2
              ? "grid-cols-2 max-w-2xl mx-auto"
              : selected.length <= 3
              ? "grid-cols-3 max-w-4xl mx-auto"
              : "grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {selected.map((card) => (
            <div key={card.id} className="flex items-center gap-2">
              <div className="w-10 h-[26px] rounded-lg overflow-hidden shadow-sm flex-shrink-0">
                {card.image ? (
                  <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
                ) : (
                  <div
                    className="w-full h-full"
                    style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}88)` }}
                  />
                )}
              </div>
              <span className="text-xs font-medium truncate flex-1">{card.name}</span>
              <button
                onClick={() => onRemove(card.id)}
                className="p-1 rounded-lg hover:bg-secondary/50 transition-colors flex-shrink-0"
              >
                <X className="w-3 h-3 text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
