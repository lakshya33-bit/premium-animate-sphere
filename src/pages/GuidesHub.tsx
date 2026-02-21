import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight, Eye, ExternalLink, BookOpen, Sparkles, TrendingUp, Users, Search } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
import FavoriteButton from "@/components/FavoriteButton";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PageLayout from "@/components/PageLayout";
import { guides, guideCategories, type Guide } from "@/data/guides";

function GuideQuickView({ guide, open, onClose }: { guide: Guide | null; open: boolean; onClose: () => void }) {
  if (!guide) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="border-0 bg-transparent shadow-none p-0 sm:max-w-lg max-h-[85vh] overflow-hidden">
        <div className="glass-card rounded-3xl border border-border/30 overflow-hidden">
          {/* Header with gradient */}
          <div className="relative p-6 pb-5" style={{ background: `linear-gradient(135deg, ${guide.color}10, transparent)` }}>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: `linear-gradient(135deg, ${guide.color}25, ${guide.color}10)`, border: `1px solid ${guide.color}20` }}>
                <guide.icon className="w-6 h-6" style={{ color: guide.color }} />
              </div>
              <div className="flex-1">
                <DialogTitle className="font-serif text-xl font-bold leading-snug">{guide.title}</DialogTitle>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-secondary/60 text-muted-foreground font-medium">{guide.category}</span>
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><Clock className="w-2.5 h-2.5" /> {guide.readTime} read</span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 pb-6 space-y-4 max-h-[50vh] overflow-y-auto">
            <p className="text-sm text-muted-foreground leading-relaxed">{guide.description}</p>
            <div className="rounded-xl p-4 text-sm text-muted-foreground leading-relaxed border border-border/20" style={{ background: `${guide.color}05` }}>
              {guide.content[0]}
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="font-medium">{guide.author}</span>
              <span>·</span>
              <span>{guide.date}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {guide.tags.map((t) => <span key={t} className="text-[10px] px-2.5 py-1 rounded-full bg-secondary/40 text-muted-foreground">{t}</span>)}
            </div>
            <Link to={`/guides/${guide.slug}`} onClick={onClose} className="gold-btn w-full py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-gold/15">
              Read Full Guide <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function GuidesHub() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [quickViewGuide, setQuickViewGuide] = useState<Guide | null>(null);
  const { toggle: toggleFav, isFav } = useFavorites("guide");

  const filtered = guides.filter((g) => {
    const matchCategory = activeCategory === "All" || g.category === activeCategory;
    const matchSearch = !search || g.title.toLowerCase().includes(search.toLowerCase()) || g.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCategory && matchSearch;
  });
  const featured = filtered.filter((g) => g.featured);
  const rest = filtered.filter((g) => !g.featured);

  return (
    <PageLayout>
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Premium Hero */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="relative w-20 h-20 mx-auto mb-6"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/25 to-gold/5 shadow-2xl shadow-gold/15" />
              <div className="absolute inset-0 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-gold" />
              </div>
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -inset-2 rounded-2xl border border-gold/15"
              />
            </motion.div>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-gold mb-4">Guides Hub</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 tracking-tight">
              Expert <span className="gold-gradient">Guides</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
              Master the art of credit card rewards with comprehensive guides written by industry experts.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-12">
            {[
              { label: "Guides", value: `${guides.length}+`, icon: BookOpen },
              { label: "Categories", value: `${guideCategories.length - 1}`, icon: Sparkles },
              { label: "Expert Authors", value: "3", icon: Users },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="glass-card rounded-2xl p-4 text-center border border-border/20 hover:border-gold/20 transition-all duration-300 group"
              >
                <div className="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-2 group-hover:bg-gold/15 transition-colors">
                  <stat.icon className="w-4 h-4 text-gold" />
                </div>
                <p className="text-lg font-serif font-bold">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Search */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search guides by title or tag..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-11 bg-secondary/30 border-border/30 rounded-xl focus-visible:ring-gold/30"
              />
            </div>
          </motion.div>

          {/* Category filter */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex gap-2 flex-wrap justify-center mb-12">
            {guideCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-gold text-background shadow-lg shadow-gold/20"
                    : "glass-card text-muted-foreground hover:text-foreground hover:border-gold/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Featured guides */}
          {featured.length > 0 && (
            <div className="mb-12">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="flex items-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-gold" />
                <h2 className="font-serif text-xl font-bold">Featured</h2>
              </motion.div>
              <div className="grid md:grid-cols-2 gap-6">
                {featured.map((guide, i) => (
                  <motion.div
                    key={guide.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + i * 0.1, duration: 0.5 }}
                    className="group relative"
                  >
                    {/* Glow border on hover */}
                    <div className="absolute -inset-[1px] rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: `linear-gradient(135deg, ${guide.color}30, transparent 50%, ${guide.color}10)` }} />

                    <div className="relative glass-card rounded-[22px] overflow-hidden border border-border/20 hover:border-border/40 transition-all duration-500">
                      {/* Gradient accent header */}
                      <div className="relative p-8 pb-6" style={{ background: `linear-gradient(135deg, ${guide.color}10, ${guide.color}03, transparent)` }}>
                        <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-[0.04]" style={{ background: `radial-gradient(circle, ${guide.color}, transparent)` }} />

                        <div className="flex items-start justify-between relative z-10 mb-5">
                          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: `linear-gradient(135deg, ${guide.color}25, ${guide.color}10)`, boxShadow: `0 8px 24px ${guide.color}15` }}>
                            <guide.icon className="w-6 h-6" style={{ color: guide.color }} />
                          </div>
                          <div className="flex items-center gap-2">
                            <FavoriteButton isFav={isFav(guide.slug)} onToggle={() => toggleFav(guide.slug)} className="hover:bg-secondary/50" />
                            <span className="px-3 py-1 rounded-full bg-gold/15 text-gold text-[10px] font-bold uppercase tracking-wider">Featured</span>
                          </div>
                        </div>

                        <span className="text-[10px] text-muted-foreground uppercase tracking-[0.15em] font-bold">{guide.category}</span>
                        <h3 className="font-serif text-xl font-bold mt-2 mb-3 leading-snug group-hover:text-gold transition-colors duration-300">{guide.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{guide.description}</p>
                      </div>

                      <div className="px-8 pb-7">
                        {/* Meta */}
                        <div className="flex items-center gap-4 mb-5 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {guide.readTime} read</span>
                          <span>·</span>
                          <span className="font-medium">{guide.author}</span>
                          <span>·</span>
                          <span>{guide.date}</span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {guide.tags.map((t) => (
                            <span key={t} className="text-[10px] px-3 py-1 rounded-lg bg-secondary/40 text-muted-foreground font-medium border border-border/15">{t}</span>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                          <button onClick={() => setQuickViewGuide(guide)} className="flex-1 text-xs py-2.5 rounded-xl gold-outline-btn flex items-center justify-center gap-1.5 font-semibold"><Eye className="w-3.5 h-3.5" /> Quick View</button>
                          <Link to={`/guides/${guide.slug}`} className="flex-1 text-xs py-2.5 rounded-xl gold-btn flex items-center justify-center gap-1.5 font-semibold shadow-lg shadow-gold/15"><ExternalLink className="w-3.5 h-3.5" /> Read Full</Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* All guides */}
          {rest.length > 0 && (
            <div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-4 h-4 text-gold" />
                <h2 className="font-serif text-xl font-bold">All Guides</h2>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-gold/10 text-gold font-semibold">{rest.length}</span>
              </motion.div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map((guide, i) => (
                  <motion.div
                    key={guide.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.06, duration: 0.4 }}
                    className="group relative"
                  >
                    <div className="absolute -inset-[1px] rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${guide.color}20, transparent 60%)` }} />

                    <div className="relative glass-card rounded-[20px] p-6 border border-border/20 hover:border-border/40 transition-all duration-500 h-full flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl flex items-center justify-center shadow-md" style={{ background: `linear-gradient(135deg, ${guide.color}20, ${guide.color}08)`, boxShadow: `0 4px 12px ${guide.color}10` }}>
                            <guide.icon className="w-5 h-5" style={{ color: guide.color }} />
                          </div>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-[0.12em] font-bold">{guide.category}</span>
                        </div>
                        <FavoriteButton isFav={isFav(guide.slug)} onToggle={() => toggleFav(guide.slug)} className="hover:bg-secondary/50" />
                      </div>

                      <h3 className="font-serif text-base font-bold mb-2 leading-snug group-hover:text-gold transition-colors duration-300">{guide.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">{guide.description}</p>

                      <div className="flex items-center gap-3 mb-4 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {guide.readTime}</span>
                        <span>·</span>
                        <span className="font-medium">{guide.author}</span>
                      </div>

                      <div className="flex gap-2">
                        <button onClick={() => setQuickViewGuide(guide)} className="flex-1 text-xs py-2 rounded-xl gold-outline-btn flex items-center justify-center gap-1 font-semibold"><Eye className="w-3 h-3" /> Quick</button>
                        <Link to={`/guides/${guide.slug}`} className="flex-1 text-xs py-2 rounded-xl gold-btn flex items-center justify-center gap-1 font-semibold shadow-md shadow-gold/10"><ExternalLink className="w-3 h-3" /> Read</Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {filtered.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <div className="w-20 h-20 rounded-2xl bg-secondary/30 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-muted-foreground/40" />
              </div>
              <p className="font-serif text-lg mb-2">No guides found</p>
              <p className="text-sm text-muted-foreground">Try a different search or category</p>
            </motion.div>
          )}
        </div>
      </section>

      <GuideQuickView guide={quickViewGuide} open={!!quickViewGuide} onClose={() => setQuickViewGuide(null)} />
    </PageLayout>
  );
}
