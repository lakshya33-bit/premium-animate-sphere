import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Share2 } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import BackToTop from "@/components/BackToTop";
import { cards, type CreditCard as CardType } from "@/data/cards";
import CompareCardSelector from "@/components/compare/CompareCardSelector";
import CompareStickyHeader from "@/components/compare/CompareStickyHeader";
import CompareTable from "@/components/compare/CompareTable";
import CompareEmptyState from "@/components/compare/CompareEmptyState";
import { toast } from "sonner";

const MAX_CARDS = 4;

export default function CompareCards() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState<CardType[]>(() => {
    const cardIds = searchParams.get("cards")?.split(",").filter(Boolean) || [];
    return cardIds.map((id) => cards.find((c) => c.id === id)).filter(Boolean) as CardType[];
  });
  const [stickyVisible, setStickyVisible] = useState(false);
  const slotsRef = useRef<HTMLDivElement>(null);

  // Document title
  useEffect(() => {
    document.title = "Compare Cards | CardPerks";
    return () => { document.title = "CardPerks"; };
  }, []);

  // URL sync
  useEffect(() => {
    if (selected.length > 0) {
      setSearchParams({ cards: selected.map((c) => c.id).join(",") }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [selected, setSearchParams]);

  // Sticky header observer
  useEffect(() => {
    const el = slotsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting && selected.length >= 2),
      { threshold: 0, rootMargin: "-80px 0px 0px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [selected.length]);

  const addCard = (card: CardType) => {
    if (selected.length < MAX_CARDS) setSelected([...selected, card]);
  };
  const removeCard = (id: string) => setSelected(selected.filter((c) => c.id !== id));
  const selectPair = (pair: CardType[]) => setSelected(pair);

  const shareComparison = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied!");
  };

  const emptySlots = MAX_CARDS - selected.length;

  return (
    <PageLayout>
      <AnimatePresence>
        <CompareStickyHeader selected={selected} onRemove={removeCard} visible={stickyVisible} />
      </AnimatePresence>

      <section className="py-12 relative">
        {/* Gold gradient accent */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <p className="text-sm font-medium tracking-widest uppercase text-gold mb-3">Compare</p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Compare <span className="gold-gradient">Credit Cards</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Select up to 4 credit cards to compare features, fees, rewards, and benefits side by side.
            </p>
            {selected.length >= 2 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={shareComparison}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-card border border-border/30 hover:border-gold/30 text-xs font-medium transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-gold" />
                Share Comparison
              </motion.button>
            )}
          </motion.div>

          {/* Card selection slots */}
          <motion.div
            ref={slotsRef}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`grid gap-4 mb-10 ${
              selected.length + emptySlots <= 2
                ? "grid-cols-2 max-w-2xl mx-auto"
                : selected.length + emptySlots <= 3
                ? "grid-cols-3 max-w-4xl mx-auto"
                : "grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {selected.map((card) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -2 }}
                className="relative glass-card rounded-2xl p-5 flex flex-col items-center text-center border-t-2 transition-shadow hover:shadow-lg"
                style={{ borderTopColor: card.color }}
              >
                <button
                  onClick={() => removeCard(card.id)}
                  className="absolute top-3 right-3 p-1 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                </button>
                {/* Card image with glow */}
                <div className="relative mb-3">
                  <div
                    className="absolute inset-0 rounded-xl blur-lg opacity-30"
                    style={{ background: card.color }}
                  />
                  <div className="relative w-20 h-[50px] rounded-xl overflow-hidden shadow-lg shadow-black/30">
                    {card.image ? (
                      <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
                    ) : (
                      <div
                        className="w-full h-full"
                        style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}88)` }}
                      />
                    )}
                  </div>
                </div>
                <h3 className="font-serif text-sm font-bold mb-1">{card.name}</h3>
                <p className="text-[10px] text-muted-foreground">{card.issuer}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-3 h-3 text-gold fill-gold" />
                  <span className="text-xs font-medium">{card.rating}</span>
                </div>
                <span className="mt-2 text-[10px] px-2.5 py-0.5 rounded-full bg-gold/10 text-gold font-medium">
                  {card.fee}/yr
                </span>
              </motion.div>
            ))}
            {Array.from({ length: emptySlots }).map((_, i) => (
              <CompareCardSelector
                key={`empty-${i}`}
                cards={cards}
                onSelect={addCard}
                selectedIds={selected.map((c) => c.id)}
                slotIndex={selected.length + i}
              />
            ))}
          </motion.div>

          {/* Comparison table */}
          {selected.length >= 2 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <CompareTable selected={selected} />
            </motion.div>
          )}

          {selected.length < 2 && <CompareEmptyState maxCards={MAX_CARDS} onSelectPair={selectPair} />}
        </div>
      </section>

      <BackToTop />
    </PageLayout>
  );
}
