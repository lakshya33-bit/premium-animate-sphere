import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Landmark, Diamond, Crown, Heart, Check, ChevronDown, ChevronUp, Users, Shield, ArrowRight, Star, Sparkles, CreditCard, Globe, Award, TrendingUp, Wallet, CircleDot } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import BackToTop from "@/components/BackToTop";
import { banks, type BankData, type BankingTier } from "@/data/banking";
import { useFavorites } from "@/hooks/use-favorites";
import FavoriteButton from "@/components/FavoriteButton";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

const tierIcons = [CircleDot, Diamond, Crown, Award];

function highlightAmounts(text: string) {
  return text.split(/(₹[\d,.]+\s*(?:Lakhs?|Lakh|Crores?|Cr)?)/gi).map((part, i) =>
    /₹/.test(part) ? <span key={i} className="text-gold font-semibold">{part}</span> : part
  );
}

function EligibilityBullets({ text, color }: { text: string; color: string }) {
  const parts = text.split(/ OR /i);
  if (parts.length <= 1) {
    return <p className="text-[11px] leading-[1.7] text-muted-foreground">{highlightAmounts(text)}</p>;
  }
  return (
    <ul className="space-y-2">
      {parts.map((part, i) => (
        <li key={i} className="flex items-start gap-2">
          <div className="w-4 h-4 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${color}12` }}>
            <Check className="w-2.5 h-2.5" style={{ color }} />
          </div>
          <span className="text-[11px] leading-[1.7] text-muted-foreground">{highlightAmounts(part.trim())}</span>
          {i < parts.length - 1 && (
            <span className="ml-auto text-[9px] font-bold text-muted-foreground/50 uppercase tracking-wider self-center">or</span>
          )}
        </li>
      ))}
    </ul>
  );
}

function TierCard({ tier, bankColor, bankName, index, totalTiers }: { tier: BankingTier; bankColor: string; bankName: string; index: number; totalTiers: number }) {
  const [expanded, setExpanded] = useState(false);
  const { toggle, isFav } = useFavorites("banking");
  const tierId = `banking-${tier.name.toLowerCase().replace(/\s+/g, "-")}`;
  const visibleBenefits = expanded ? tier.benefits : tier.benefits.slice(0, 4);
  const hasMore = tier.benefits.length > 4;
  const isInviteOnly = tier.eligibility.toLowerCase().includes("invitation");
  const TierIcon = tierIcons[Math.min(index, tierIcons.length - 1)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      className="group relative"
      whileHover={{ y: -4 }}
    >
      <div className="absolute -inset-[1px] rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: `linear-gradient(135deg, ${tier.color}30, transparent 50%, ${tier.color}10)` }} />

      <div className="relative glass-card rounded-[22px] overflow-hidden flex flex-col border border-border/20 hover:border-border/40 transition-all duration-500">
        {/* Colored top border */}
        <div className="h-[2px] w-full" style={{ background: tier.color }} />

        {/* Gradient header */}
        <div className="relative p-6 pb-5" style={{ background: `linear-gradient(135deg, ${tier.color}12, ${tier.color}04, transparent)` }}>
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-[0.06]" style={{ background: `radial-gradient(circle, ${tier.color}, transparent)` }} />
          
          <div className="flex items-start justify-between relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: `linear-gradient(135deg, ${tier.color}25, ${tier.color}10)`, boxShadow: `0 8px 24px ${tier.color}15` }}>
                  <TierIcon className="w-5 h-5" style={{ color: tier.color }} />
                </div>
                <div className="flex flex-col gap-1">
                  <Badge variant="outline" className="text-[9px] px-2 py-0 h-4 w-fit" style={{ borderColor: `${tier.color}40`, color: tier.color }}>
                    Tier {index + 1}
                  </Badge>
                  {isInviteOnly && (
                    <Badge className="text-[9px] px-2 py-0 h-4 w-fit bg-purple-500/15 text-purple-400 border-purple-500/20 hover:bg-purple-500/15">
                      Invite Only
                    </Badge>
                  )}
                </div>
              </div>
              <h3 className="font-serif text-xl font-bold tracking-tight" style={{ color: tier.color }}>{tier.name}</h3>
              <p className="text-[11px] text-muted-foreground mt-1 font-medium">{bankName}</p>
            </div>
            <FavoriteButton
              isFav={isFav(tierId)}
              onToggle={() => toggle(tierId)}
              className="hover:bg-secondary/50"
              size="md"
            />
          </div>
        </div>

        {/* Eligibility */}
        <div className="px-6 pb-4">
          <div className="rounded-xl p-4" style={{ background: `${tier.color}06`, border: `1px solid ${tier.color}12` }}>
            <p className="text-[9px] uppercase tracking-[0.15em] font-bold mb-2 flex items-center gap-1.5" style={{ color: tier.color }}>
              <Shield className="w-3 h-3" /> Eligibility
            </p>
            <EligibilityBullets text={tier.eligibility} color={tier.color} />
          </div>
        </div>

        {/* Eligible Cards */}
        <div className="px-6 pb-4">
          <p className="text-[9px] text-muted-foreground uppercase tracking-[0.15em] mb-2.5 flex items-center gap-1.5 font-bold">
            <CreditCard className="w-3 h-3" /> Eligible Cards
          </p>
          <div className="flex flex-wrap gap-1.5">
            {tier.eligibleCards.map((card) => (
              <span key={card} className="text-[10px] px-3 py-1.5 rounded-lg bg-secondary/40 text-foreground font-medium border border-border/20">{card}</span>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="px-6 pb-4 flex-1">
          <p className="text-[9px] text-muted-foreground uppercase tracking-[0.15em] mb-3 flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3 h-3" /> Benefits
          </p>
          <ul className="space-y-2.5">
            {visibleBenefits.map((b, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[12px] text-muted-foreground group/item">
                <div className="w-4 h-4 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${tier.color}12` }}>
                  <Check className="w-2.5 h-2.5" style={{ color: tier.color }} />
                </div>
                <span className="leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
          {hasMore && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1.5 text-[11px] hover:opacity-80 transition-all mt-3.5 font-semibold" style={{ color: tier.color }}
            >
              {expanded ? (
                <>Show less <ChevronUp className="w-3 h-3" /></>
              ) : (
                <>+{tier.benefits.length - 4} more <ChevronDown className="w-3 h-3" /></>
              )}
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 space-y-3">
          {tier.hasRM && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gold/15" style={{ background: `linear-gradient(135deg, hsl(var(--gold) / 0.06), transparent)` }}>
              <div className="w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center shadow-sm">
                <Users className="w-3.5 h-3.5 text-gold" />
              </div>
              <div>
                <span className="text-[11px] text-gold font-bold block">Dedicated RM</span>
                <span className="text-[10px] text-muted-foreground">Personal relationship manager</span>
              </div>
            </div>
          )}

          <div className="rounded-xl p-4 bg-secondary/15 border border-border/15">
            <p className="text-[10px] font-bold text-gold mb-2 flex items-center gap-1.5">
              <Star className="w-3 h-3" /> Key Takeaways
            </p>
            <ul className="space-y-1.5">
              {tier.keyTakeaways.map((t, i) => (
                <li key={i} className="text-[11px] text-muted-foreground leading-relaxed flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BankSection({ bank }: { bank: BankData }) {
  return (
    <div className={`grid gap-6 ${bank.tiers.length === 2 ? "md:grid-cols-2 max-w-3xl mx-auto" : bank.tiers.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2 xl:grid-cols-4"}`}>
      {bank.tiers.map((tier, i) => (
        <TierCard key={tier.name} tier={tier} bankColor={bank.color} bankName={bank.name} index={i} totalTiers={bank.tiers.length} />
      ))}
    </div>
  );
}

function extractLoungeAccess(benefits: string[]): string {
  const lounge = benefits.find(b => /lounge/i.test(b));
  if (!lounge) return "—";
  if (/unlimited/i.test(lounge)) return "Unlimited";
  const match = lounge.match(/(\d+)\/year/);
  return match ? `${match[1]}/yr` : "Yes";
}

function extractMinAMB(eligibility: string): string {
  const match = eligibility.match(/₹[\d,.]+\s*(?:Lakhs?|Lakh|Crores?|Cr)?/i);
  return match ? match[0] : "—";
}

function CrossBankComparison() {
  const rows = banks.flatMap(bank =>
    bank.tiers.map(tier => ({
      bank: bank.name,
      bankColor: bank.color,
      tierName: tier.name,
      tierColor: tier.color,
      minAMB: extractMinAMB(tier.eligibility),
      hasRM: tier.hasRM,
      lounge: extractLoungeAccess(tier.benefits),
      benefitCount: tier.benefits.length,
    }))
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-16"
    >
      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center mb-2">
        Compare <span className="gold-gradient">All Tiers</span>
      </h2>
      <p className="text-xs text-muted-foreground text-center mb-8">Side-by-side comparison across all banks</p>

      <div className="glass-card rounded-2xl border border-border/20 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/20">
              <TableHead className="text-[11px] font-bold text-foreground">Bank</TableHead>
              <TableHead className="text-[11px] font-bold text-foreground">Tier</TableHead>
              <TableHead className="text-[11px] font-bold text-foreground">Min. AMB</TableHead>
              <TableHead className="text-[11px] font-bold text-foreground text-center">RM</TableHead>
              <TableHead className="text-[11px] font-bold text-foreground">Lounge</TableHead>
              <TableHead className="text-[11px] font-bold text-foreground text-center">Benefits</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i} className="border-border/10 hover:bg-secondary/20">
                <TableCell className="text-[11px] font-medium">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: row.bankColor }} />
                    {row.bank}
                  </span>
                </TableCell>
                <TableCell className="text-[11px] font-semibold" style={{ color: row.tierColor }}>{row.tierName}</TableCell>
                <TableCell className="text-[11px] text-gold font-medium">{row.minAMB}</TableCell>
                <TableCell className="text-center">
                  {row.hasRM ? <Check className="w-3.5 h-3.5 text-green-400 mx-auto" /> : <span className="text-muted-foreground/40">—</span>}
                </TableCell>
                <TableCell className="text-[11px] text-muted-foreground">{row.lounge}</TableCell>
                <TableCell className="text-[11px] text-muted-foreground text-center">{row.benefitCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}

function FamilyBankingContent() {
  const familyBankPrograms = [
    { bank: "HDFC Bank", color: "#003D8F", requirement: "Combined AMB of ₹30L for Imperia benefits", available: true },
    { bank: "ICICI Bank", color: "#F58220", requirement: "Pooled NRV of ₹25L for Wealth tier", available: true },
    { bank: "Axis Bank", color: "#97144D", requirement: "Combined balance of ₹30L for Burgundy", available: true },
    { bank: "Kotak Mahindra", color: "#ED1C24", requirement: "Family pooling for Privy League Signature", available: true },
    { bank: "SBI", color: "#0033A0", requirement: "Limited family banking features", available: false },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-12">
      {/* Hero card */}
      <div className="glass-card rounded-3xl p-10 text-center border border-border/20">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-gold/10">
          <Users className="w-9 h-9 text-gold" />
        </div>
        <h3 className="font-serif text-3xl font-bold mb-4">Family Banking Programs</h3>
        <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto leading-relaxed">
          Pool balances across family members to qualify for higher wealth tiers with shared benefits.
        </p>
      </div>

      {/* How it works steps */}
      <div>
        <h4 className="font-serif text-xl font-bold text-center mb-6">How Family Banking Works</h4>
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { step: 1, icon: Wallet, label: "Pool Balances", desc: "Add family members' savings, FDs, and current accounts into a single relationship value" },
            { step: 2, icon: TrendingUp, label: "Qualify Higher Tier", desc: "Combined balances often cross thresholds for premium tiers like Imperia or Burgundy" },
            { step: 3, icon: Users, label: "Share Benefits", desc: "All family members enjoy lounge access, RM support, and exclusive perks together" },
          ].map((item) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: item.step * 0.1 }}
              className="glass-card rounded-2xl p-6 border border-border/15 hover:border-gold/20 transition-all duration-300 group relative"
            >
              <div className="absolute top-4 right-4 text-[40px] font-serif font-bold text-gold/10">{item.step}</div>
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/15 transition-colors">
                <item.icon className="w-5 h-5 text-gold" />
              </div>
              <p className="text-sm font-bold text-gold mb-1.5">{item.label}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bank programs comparison */}
      <div>
        <h4 className="font-serif text-xl font-bold text-center mb-6">Banks with Family Programs</h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {familyBankPrograms.map((prog) => (
            <div
              key={prog.bank}
              className="glass-card rounded-xl p-5 border border-border/15 hover:border-border/30 transition-all"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: prog.color }} />
                <span className="text-sm font-bold">{prog.bank}</span>
                {!prog.available && (
                  <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4 text-muted-foreground">Limited</Badge>
                )}
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{prog.requirement}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link to="/perk-ai" className="gold-btn px-8 py-3.5 rounded-xl text-sm inline-flex items-center gap-2 shadow-lg shadow-gold/15 font-semibold">
          Ask Perk AI about Family Banking <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function Banking() {
  const [activeBank, setActiveBank] = useState("hdfc");
  const [activeSection, setActiveSection] = useState<"wealth" | "family">("wealth");
  const selectedBank = banks.find((b) => b.id === activeBank) || banks[0];

  useEffect(() => {
    document.title = "Banking | CardPerks";
  }, []);

  return (
    <PageLayout>
      <section className="py-16 min-h-screen">
        {/* Gold gradient accent behind hero */}
        <div className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center top, hsl(var(--gold) / 0.06), transparent 70%)" }} />

        <div className="container mx-auto px-4 relative">
          {/* Premium Hero - tightened spacing */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="relative w-[72px] h-[72px] mx-auto mb-6"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-gold/20 to-gold/5 shadow-2xl shadow-gold/15" />
              <div className="absolute inset-0 rounded-3xl flex items-center justify-center">
                <Landmark className="w-8 h-8 text-gold" />
              </div>
              <div className="absolute -inset-3 rounded-3xl border border-gold/10 animate-pulse" />
            </motion.div>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-gold mb-4">Premium Banking</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 tracking-tight">
              Wealth <span className="gold-gradient">Banking</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
              Compare wealth tiers, eligibility criteria, and exclusive benefits across India's top banks
            </p>
          </motion.div>

          {/* Section toggle with sliding indicator */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="flex justify-center gap-1 mb-8">
            <div className="relative flex gap-1 p-1 rounded-2xl bg-secondary/30 border border-border/20">
              {/* Sliding background */}
              <motion.div
                className="absolute top-1 bottom-1 rounded-xl bg-gold shadow-lg shadow-gold/20"
                layout
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={{
                  left: activeSection === "wealth" ? 4 : "50%",
                  right: activeSection === "family" ? 4 : "50%",
                }}
              />
              {[
                { key: "wealth" as const, icon: Diamond, label: "Wealth Banking" },
                { key: "family" as const, icon: Users, label: "Family Banking" },
              ].map((s) => (
                <button
                  key={s.key}
                  onClick={() => setActiveSection(s.key)}
                  className={`relative z-10 px-8 py-3.5 rounded-xl text-sm font-semibold flex items-center gap-2.5 transition-colors duration-300 ${
                    activeSection === s.key ? "text-background" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <s.icon className="w-4 h-4" /> {s.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Stats row - tightened */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
            {[
              { label: "Banks", value: "5+", icon: Landmark },
              { label: "Wealth Tiers", value: "14+", icon: Crown },
              { label: "Min. AMB", value: "₹1L", icon: TrendingUp },
              { label: "Top Tier", value: "₹10Cr+", icon: Award },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 + i * 0.05 }}
                className="glass-card rounded-2xl p-4 text-center border border-border/20 hover:border-gold/20 transition-all duration-300 group"
              >
                <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-2.5 group-hover:bg-gold/15 transition-colors">
                  <stat.icon className="w-4 h-4 text-gold" />
                </div>
                <p className="text-lg font-serif font-bold">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Eligibility CTA */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="max-w-2xl mx-auto mb-14">
            <div className="glass-card rounded-2xl p-6 flex items-center justify-between border border-gold/10" style={{ background: `linear-gradient(135deg, hsl(var(--gold) / 0.05), transparent)` }}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gold/15 flex items-center justify-center shadow-lg shadow-gold/10">
                  <Shield className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-sm font-bold">Check My Eligibility</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Find which wealth tier you qualify for</p>
                </div>
              </div>
              <Link to="/perk-ai" className="gold-btn px-6 py-3 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg shadow-gold/15">
                <Sparkles className="w-3.5 h-3.5" /> Check Now
              </Link>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {activeSection === "wealth" ? (
              <motion.div
                key="wealth"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Bank filter pills with tier counts and brand dots */}
                <TooltipProvider>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="flex gap-2.5 flex-wrap justify-center mb-8">
                    {banks.map((bank) => (
                      <Tooltip key={bank.id}>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => setActiveBank(bank.id)}
                            className={`px-6 py-3 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 flex items-center gap-2 ${
                              activeBank === bank.id
                                ? "bg-gold text-background shadow-xl shadow-gold/25 scale-105"
                                : "glass-card text-muted-foreground hover:text-foreground hover:border-gold/20 hover:shadow-md"
                            }`}
                          >
                            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: activeBank === bank.id ? "currentColor" : bank.color }} />
                            {bank.name}
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${activeBank === bank.id ? "bg-background/20" : "bg-secondary/50"}`}>
                              {bank.tiers.length}
                            </span>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">{bank.tiers.length} wealth tiers available</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </motion.div>
                </TooltipProvider>

                {/* Bank heading */}
                <motion.div
                  key={selectedBank.id + "-heading"}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-10"
                >
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                    {selectedBank.name} <span className="text-muted-foreground font-normal">Tiers</span>
                  </h2>
                  <p className="text-xs text-muted-foreground mt-2">{selectedBank.tiers.length} tiers available</p>
                </motion.div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedBank.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <BankSection bank={selectedBank} />
                  </motion.div>
                </AnimatePresence>

                {/* Cross-bank comparison table */}
                <CrossBankComparison />
              </motion.div>
            ) : (
              <motion.div
                key="family"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <FamilyBankingContent />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      <BackToTop />
    </PageLayout>
  );
}
