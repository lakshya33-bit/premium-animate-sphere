import { Star, CreditCard, Globe, Shield, Trophy, Gift, Fuel, Heart, Check } from "lucide-react";
import { type CreditCard as CardType } from "@/data/cards";
import { getWinner, getWinnerLabel } from "./CompareWinnerUtils";
import { Badge } from "@/components/ui/badge";

const fieldSections = [
  {
    label: "Basics",
    fields: [
      { key: "fee" as const, label: "Annual Fee", icon: CreditCard },
      { key: "network" as const, label: "Network", icon: Globe },
      { key: "type" as const, label: "Card Type", icon: Shield },
      { key: "issuer" as const, label: "Issuer", icon: CreditCard },
    ],
  },
  {
    label: "Income & Rewards",
    fields: [
      { key: "minIncome" as const, label: "Min Income", icon: Trophy },
      { key: "rewardRate" as const, label: "Reward Rate", icon: Gift },
      { key: "rewards" as const, label: "Reward Value", icon: Star },
      { key: "welcomeBonus" as const, label: "Welcome Bonus", icon: Gift },
    ],
  },
  {
    label: "Travel & Forex",
    fields: [
      { key: "lounge" as const, label: "Lounge Access", icon: Shield },
      { key: "fuelSurcharge" as const, label: "Fuel Surcharge", icon: Fuel },
      { key: "forexMarkup" as const, label: "Forex Markup", icon: Globe },
    ],
  },
];

const listSections = [
  { key: "perks" as const, label: "Key Perks", icon: Star },
  { key: "milestones" as const, label: "Milestone Benefits", icon: Trophy },
  { key: "insurance" as const, label: "Insurance", icon: Shield },
  { key: "bestFor" as const, label: "Best For", icon: Heart },
  { key: "vouchers" as const, label: "Top Vouchers", icon: Gift },
];

interface CompareTableProps {
  selected: CardType[];
}

export default function CompareTable({ selected }: CompareTableProps) {
  const gridCols =
    selected.length <= 2
      ? "grid-cols-2"
      : selected.length <= 3
      ? "grid-cols-3"
      : "grid-cols-2 lg:grid-cols-4";

  return (
    <div className={selected.length <= 2 ? "max-w-2xl mx-auto" : ""}>
      {fieldSections.map((section, si) => (
        <div key={section.label}>
          {/* Section divider */}
          <div className="flex items-center gap-3 mb-4 mt-6 first:mt-0">
            <div className="h-px flex-1 bg-border/40" />
            <span className="text-xs font-semibold uppercase tracking-widest text-gold/80">{section.label}</span>
            <div className="h-px flex-1 bg-border/40" />
          </div>

          {section.fields.map((field) => {
            const FieldIcon = field.icon;
            const winnerId = getWinner(field.key, selected);
            const winnerLabel = winnerId ? getWinnerLabel(field.key) : null;

            return (
              <div key={field.key} className="mb-4">
                <div className="flex items-center gap-2 mb-2 px-1">
                  <FieldIcon className="w-3.5 h-3.5 text-gold" />
                  <span className="text-xs font-medium text-muted-foreground">{field.label}</span>
                </div>
                <div className={`grid gap-4 ${gridCols}`}>
                  {selected.map((card) => {
                    const isWinner = winnerId === card.id;
                    return (
                      <div
                        key={card.id}
                        className={`glass-card rounded-xl p-4 transition-all ${
                          isWinner ? "ring-1 ring-gold/40" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-semibold" style={{ color: card.color }}>
                            {card.name}
                          </p>
                          {isWinner && winnerLabel && (
                            <Badge className="text-[9px] px-1.5 py-0 h-4 bg-gold/15 text-gold border-gold/30 hover:bg-gold/20">
                              {winnerLabel}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm">{String(card[field.key])}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {/* Perks & Benefits section */}
      <div className="flex items-center gap-3 mb-4 mt-6">
        <div className="h-px flex-1 bg-border/40" />
        <span className="text-xs font-semibold uppercase tracking-widest text-gold/80">Perks & Benefits</span>
        <div className="h-px flex-1 bg-border/40" />
      </div>

      {listSections.map((section) => {
        const SectionIcon = section.icon;
        return (
          <div key={section.key} className="mb-4">
            <div className="flex items-center gap-2 mb-2 px-1">
              <SectionIcon className="w-3.5 h-3.5 text-gold" />
              <span className="text-xs font-medium text-muted-foreground">{section.label}</span>
            </div>
            <div className={`grid gap-4 ${gridCols}`}>
              {selected.map((card) => (
                <div key={card.id} className="glass-card rounded-xl p-4">
                  <p className="text-xs font-semibold mb-3" style={{ color: card.color }}>
                    {card.name}
                  </p>
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
    </div>
  );
}
