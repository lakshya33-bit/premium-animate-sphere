import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Star, CreditCard, Shield, Fuel, Globe, Gift, Trophy, Heart, Search, ChevronDown, Check } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { cards, type CreditCard as CardType } from "@/data/cards";
import { Input } from "@/components/ui/input";

const MAX_CARDS = 4;

const compareFields: { key: keyof CardType; label: string; icon: typeof Star }[] = [
  { key: "fee", label: "Annual Fee", icon: CreditCard },
  { key: "network", label: "Network", icon: Globe },
  { key: "type", label: "Card Type", icon: Shield },
  { key: "issuer", label: "Issuer", icon: CreditCard },
  { key: "minIncome", label: "Min Income", icon: Trophy },
  { key: "rewardRate", label: "Reward Rate", icon: Gift },
  { key: "rewards", label: "Reward Value", icon: Star },
  { key: "welcomeBonus", label: "Welcome Bonus", icon: Gift },
  { key: "lounge", label: "Lounge Access", icon: Shield },
  { key: "fuelSurcharge", label: "Fuel Surcharge", icon: Fuel },
  { key: "forexMarkup", label: "Forex Markup", icon: Globe },
];

function CardSelector({ onSelect, selectedIds, slotIndex }: { onSelect: (card: CardType) => void; selectedIds: string[]; slotIndex: number }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const available = cards.filter((c) => !selectedIds.includes(c.id) && (c.name.toLowerCase().includes(search.toLowerCase()) || c.issuer.toLowerCase().includes(search.toLowerCase())));

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
        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Add Card {slotIndex + 1}</span>
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
              {available.length === 0 && <p className="text-xs text-muted-foreground p-4 text-center">No cards available</p>}
              {available.map((card) => (
                <button
                  key={card.id}
                  onClick={() => { onSelect(card); setOpen(false); setSearch(""); }}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-secondary/50 transition-colors text-left"
                >
                  <div className="w-10 h-[26px] rounded-lg overflow-hidden shadow-sm flex-shrink-0">
                    {card.image ? (
                      <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}88)` }} />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-medium">{card.name}</p>
                    <p className="text-[10px] text-muted-foreground">{card.issuer} · {card.fee}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CompareCards() {
  const [searchParams] = useSearchParams();
  const [selected, setSelected] = useState<CardType[]>(() => {
    const cardIds = searchParams.get("cards")?.split(",").filter(Boolean) || [];
    return cardIds.map((id) => cards.find((c) => c.id === id)).filter(Boolean) as CardType[];
  });

  const addCard = (card: CardType) => {
    if (selected.length < MAX_CARDS) setSelected([...selected, card]);
  };
  const removeCard = (id: string) => setSelected(selected.filter((c) => c.id !== id));

  const emptySlots = MAX_CARDS - selected.length;

  return (
    <PageLayout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <p className="text-sm font-medium tracking-widest uppercase text-gold mb-3">Compare</p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Compare <span className="gold-gradient">Credit Cards</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Select up to 4 credit cards to compare features, fees, rewards, and benefits side by side.
            </p>
          </motion.div>

          {/* Card selection slots */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`grid gap-4 mb-10 ${selected.length + emptySlots <= 2 ? 'grid-cols-2 max-w-2xl mx-auto' : selected.length + emptySlots <= 3 ? 'grid-cols-3 max-w-4xl mx-auto' : 'grid-cols-2 lg:grid-cols-4'}`}
          >
            {selected.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative glass-card rounded-2xl p-5 flex flex-col items-center text-center"
              >
                <button
                  onClick={() => removeCard(card.id)}
                  className="absolute top-3 right-3 p-1 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                </button>
                <div className="w-20 h-[50px] rounded-xl overflow-hidden shadow-lg shadow-black/30 mb-3">
                  {card.image ? (
                    <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}88)` }} />
                  )}
                </div>
                <h3 className="font-serif text-sm font-bold mb-1">{card.name}</h3>
                <p className="text-[10px] text-muted-foreground">{card.issuer}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="w-3 h-3 text-gold fill-gold" />
                  <span className="text-xs font-medium">{card.rating}</span>
                </div>
                <span className="mt-2 text-[10px] px-2.5 py-0.5 rounded-full bg-gold/10 text-gold font-medium">{card.fee}/yr</span>
              </motion.div>
            ))}
            {Array.from({ length: emptySlots }).map((_, i) => (
              <CardSelector key={`empty-${i}`} onSelect={addCard} selectedIds={selected.map((c) => c.id)} slotIndex={selected.length + i} />
            ))}
          </motion.div>

          {/* Comparison table */}
          {selected.length >= 2 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className={selected.length <= 2 ? 'max-w-2xl mx-auto' : ''}>
              {/* Standard fields */}
              {compareFields.map((field) => {
                const FieldIcon = field.icon;
                return (
                  <div key={field.key} className="mb-4">
                    <div className="flex items-center gap-2 mb-2 px-1">
                      <FieldIcon className="w-3.5 h-3.5 text-gold" />
                      <span className="text-xs font-medium text-muted-foreground">{field.label}</span>
                    </div>
                    <div className={`grid gap-4 ${selected.length <= 2 ? 'grid-cols-2' : selected.length <= 3 ? 'grid-cols-3' : 'grid-cols-2 lg:grid-cols-4'}`}>
                      {selected.map((card) => (
                        <div key={card.id} className="glass-card rounded-xl p-4">
                          <p className="text-xs font-semibold mb-1" style={{ color: card.color }}>{card.name}</p>
                          <p className="text-sm">{String(card[field.key])}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* List-based fields */}
              {[
                { key: "perks" as const, label: "Key Perks", icon: Star },
                { key: "milestones" as const, label: "Milestone Benefits", icon: Trophy },
                { key: "insurance" as const, label: "Insurance", icon: Shield },
                { key: "bestFor" as const, label: "Best For", icon: Heart },
                { key: "vouchers" as const, label: "Top Vouchers", icon: Gift },
              ].map((section) => {
                const SectionIcon = section.icon;
                return (
                  <div key={section.key} className="mb-4">
                    <div className="flex items-center gap-2 mb-2 px-1">
                      <SectionIcon className="w-3.5 h-3.5 text-gold" />
                      <span className="text-xs font-medium text-muted-foreground">{section.label}</span>
                    </div>
                    <div className={`grid gap-4 ${selected.length <= 2 ? 'grid-cols-2' : selected.length <= 3 ? 'grid-cols-3' : 'grid-cols-2 lg:grid-cols-4'}`}>
                      {selected.map((card) => (
                        <div key={card.id} className="glass-card rounded-xl p-4">
                          <p className="text-xs font-semibold mb-3" style={{ color: card.color }}>{card.name}</p>
                          <ul className="space-y-2">
                            {(card[section.key] as string[]).map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                                <Check className="w-3 h-3 text-gold mt-0.5 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {selected.length < 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 text-muted-foreground">
              <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-serif">Select at least 2 cards to compare</p>
              <p className="text-sm mt-2">Pick any 2–{MAX_CARDS} from {cards.length} available cards above</p>
            </motion.div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
