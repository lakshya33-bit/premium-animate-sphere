import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Eye, ExternalLink, Heart } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PageLayout from "@/components/PageLayout";
import { guides, guideCategories, type Guide } from "@/data/guides";

function GuideQuickView({ guide, open, onClose }: { guide: Guide | null; open: boolean; onClose: () => void }) {
  if (!guide) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="glass-card border-border/50 sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${guide.color}15` }}>
              <guide.icon className="w-5 h-5" style={{ color: guide.color }} />
            </div>
            <div>
              <DialogTitle className="font-serif text-lg leading-snug">{guide.title}</DialogTitle>
              <p className="text-xs text-muted-foreground mt-1">{guide.category} · {guide.readTime} read</p>
            </div>
          </div>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <p className="text-sm text-muted-foreground leading-relaxed">{guide.description}</p>
          <div className="glass-card rounded-xl p-4 text-sm text-muted-foreground leading-relaxed">
            {guide.content[0]}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {guide.tags.map((t) => <span key={t} className="text-[10px] px-2.5 py-1 rounded-full bg-secondary/60 text-muted-foreground">{t}</span>)}
          </div>
          <Link to={`/guides/${guide.slug}`} onClick={onClose} className="gold-btn w-full py-2.5 rounded-xl text-sm flex items-center justify-center gap-2">
            Read Full Guide <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function GuidesHub() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [quickViewGuide, setQuickViewGuide] = useState<Guide | null>(null);
  const { toggle: toggleFav, isFav } = useFavorites("guide");
  const filtered = guides.filter((g) => activeCategory === "All" || g.category === activeCategory);
  const featured = filtered.filter((g) => g.featured);
  const rest = filtered.filter((g) => !g.featured);

  return (
    <PageLayout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-sm font-medium tracking-widest uppercase text-gold mb-3">Guides Hub</p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Expert <span className="gold-gradient">Guides</span></h1>
            <p className="text-muted-foreground max-w-xl mb-8">Master the art of credit card rewards with our comprehensive guides written by industry experts.</p>
          </motion.div>

          <div className="flex gap-2 flex-wrap mb-10">
            {guideCategories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${activeCategory === cat ? "bg-gold text-background" : "glass-card text-muted-foreground hover:text-foreground"}`}>{cat}</button>
            ))}
          </div>

          {featured.length > 0 && (
            <div className="grid md:grid-cols-2 gap-5 mb-8">
              {featured.map((guide, i) => (
                <motion.div key={guide.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.4 }} className="glass-card rounded-2xl p-8 group relative overflow-hidden">
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button onClick={(e) => { e.stopPropagation(); toggleFav(guide.slug); }} className="p-1.5 rounded-lg hover:bg-secondary/50 transition-colors z-10">
                      <Heart className={`w-4 h-4 transition-colors ${isFav(guide.slug) ? "text-gold fill-gold" : "text-muted-foreground hover:text-gold"}`} />
                    </button>
                    <span className="px-2.5 py-1 rounded-full bg-gold/20 text-gold text-[10px] font-medium">Featured</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: `${guide.color}15` }}>
                    <guide.icon className="w-5 h-5" style={{ color: guide.color }} />
                  </div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{guide.category}</span>
                  <h3 className="font-serif text-xl font-semibold mt-2 mb-3">{guide.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{guide.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" /> {guide.readTime} read</span>
                    <span className="text-xs text-muted-foreground">{guide.author}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setQuickViewGuide(guide)} className="flex-1 text-xs py-2 rounded-lg gold-outline-btn flex items-center justify-center gap-1"><Eye className="w-3 h-3" /> Quick View</button>
                    <Link to={`/guides/${guide.slug}`} className="flex-1 text-xs py-2 rounded-lg gold-btn flex items-center justify-center gap-1"><ExternalLink className="w-3 h-3" /> Read Full</Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((guide, i) => (
              <motion.div key={guide.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.4 }} className="tilt-card glass-card rounded-2xl p-6 group relative">
                <button onClick={(e) => { e.stopPropagation(); toggleFav(guide.slug); }} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-secondary/50 transition-colors z-10">
                  <Heart className={`w-4 h-4 transition-colors ${isFav(guide.slug) ? "text-gold fill-gold" : "text-muted-foreground hover:text-gold"}`} />
                </button>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${guide.color}15` }}>
                    <guide.icon className="w-4 h-4" style={{ color: guide.color }} />
                  </div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{guide.category}</span>
                </div>
                <h3 className="font-serif text-base font-semibold mb-2 leading-snug">{guide.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">{guide.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><Clock className="w-3 h-3" /> {guide.readTime}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setQuickViewGuide(guide)} className="flex-1 text-xs py-2 rounded-lg gold-outline-btn flex items-center justify-center gap-1"><Eye className="w-3 h-3" /> Quick</button>
                  <Link to={`/guides/${guide.slug}`} className="flex-1 text-xs py-2 rounded-lg gold-btn flex items-center justify-center gap-1"><ExternalLink className="w-3 h-3" /> Read</Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GuideQuickView guide={quickViewGuide} open={!!quickViewGuide} onClose={() => setQuickViewGuide(null)} />
    </PageLayout>
  );
}
