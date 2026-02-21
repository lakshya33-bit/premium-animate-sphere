import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { type CreditCard } from "@/data/cards";

interface CardSelectorProps {
  cards: CreditCard[];
  onSelect: (card: CreditCard) => void;
  selectedIds: string[];
  slotIndex: number;
}

export default function CompareCardSelector({ cards, onSelect, selectedIds, slotIndex }: CardSelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const available = cards.filter(
    (c) =>
      !selectedIds.includes(c.id) &&
      (c.name.toLowerCase().includes(search.toLowerCase()) || c.issuer.toLowerCase().includes(search.toLowerCase()))
  );

  // Group by issuer for separators
  let lastIssuer = "";

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(!open)}
        className="w-full h-48 rounded-2xl border-2 border-dashed border-border/50 hover:border-gold/40 transition-all flex flex-col items-center justify-center gap-3 group"
      >
        <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
          <Plus className="w-5 h-5 text-gold" />
        </div>
        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
          Add Card {slotIndex + 1}
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-full left-0 right-0 mt-2 z-50 glass-card rounded-xl border border-border/50 shadow-xl overflow-hidden"
          >
            <div className="p-3 border-b border-border/30">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  autoFocus
                  placeholder="Search cards..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 h-9 text-xs bg-secondary/50 border-border/30"
                />
              </div>
            </div>
            <div className="max-h-56 overflow-y-auto">
              {available.length === 0 && (
                <p className="text-xs text-muted-foreground p-4 text-center">No cards available</p>
              )}
              {available.map((card) => {
                const showSeparator = card.issuer !== lastIssuer && lastIssuer !== "";
                lastIssuer = card.issuer;
                return (
                  <div key={card.id}>
                    {showSeparator && <div className="h-px bg-border/30 mx-3" />}
                    <button
                      onClick={() => {
                        onSelect(card);
                        setOpen(false);
                        setSearch("");
                      }}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-secondary/50 transition-colors text-left border-l-2"
                      style={{ borderLeftColor: card.color + "60" }}
                    >
                      <div className="w-12 h-[30px] rounded-lg overflow-hidden shadow-sm flex-shrink-0">
                        {card.image ? (
                          <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
                        ) : (
                          <div
                            className="w-full h-full"
                            style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}88)` }}
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{card.name}</p>
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                          <span>{card.issuer} · {card.fee}</span>
                          <span className="flex items-center gap-0.5">
                            <Star className="w-2.5 h-2.5 text-gold fill-gold" />
                            {card.rating}
                          </span>
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
