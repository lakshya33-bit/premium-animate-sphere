import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";
import { cards, type CreditCard as CardType } from "@/data/cards";

const popularPairs: [string, string][] = [
  ["hsbc-premier", "icici-emeralde-private"],
  ["axis-neo", "icici-makemytrip"],
  ["icici-rubyx", "hsbc-premier"],
];

interface EmptyStateProps {
  maxCards: number;
  onSelectPair: (cards: CardType[]) => void;
}

export default function CompareEmptyState({ maxCards, onSelectPair }: EmptyStateProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 text-muted-foreground">
      <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-30" />
      <p className="text-lg font-serif">Select at least 2 cards to compare</p>
      <p className="text-sm mt-2">Pick any 2–{maxCards} from {cards.length} available cards above</p>

      <div className="mt-8">
        <p className="text-xs font-medium text-gold mb-4 uppercase tracking-widest">Popular Comparisons</p>
        <div className="flex flex-wrap justify-center gap-3">
          {popularPairs.map(([id1, id2]) => {
            const c1 = cards.find((c) => c.id === id1);
            const c2 = cards.find((c) => c.id === id2);
            if (!c1 || !c2) return null;
            return (
              <motion.button
                key={`${id1}-${id2}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelectPair([c1, c2])}
                className="glass-card rounded-xl px-4 py-3 flex items-center gap-3 hover:border-gold/30 border border-border/30 transition-colors"
              >
                <div className="flex -space-x-2">
                  {[c1, c2].map((card) => (
                    <div key={card.id} className="w-10 h-[26px] rounded-lg overflow-hidden shadow-sm border border-background">
                      {card.image ? (
                        <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full" style={{ background: card.color }} />
                      )}
                    </div>
                  ))}
                </div>
                <span className="text-xs font-medium">
                  {c1.name} <span className="text-muted-foreground">vs</span> {c2.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
