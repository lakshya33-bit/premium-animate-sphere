import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, User, Tag, ArrowRight, Share2, Copy, Check, List, ChevronDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import PageLayout from "@/components/PageLayout";
import BackToTop from "@/components/BackToTop";
import FavoriteButton from "@/components/FavoriteButton";
import { useFavorites } from "@/hooks/use-favorites";
import { useIsMobile } from "@/hooks/use-mobile";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { getGuideBySlug, guides } from "@/data/guides";

function extractHeadings(content: string[]): { text: string; id: string; sectionIndex: number }[] {
  const headings: { text: string; id: string; sectionIndex: number }[] = [];
  content.forEach((section, si) => {
    section.split("\n").forEach((line) => {
      if (line.startsWith("## ")) {
        const text = line.replace("## ", "");
        headings.push({ text, id: text.toLowerCase().replace(/[^a-z0-9]+/g, "-"), sectionIndex: si });
      }
    });
  });
  return headings;
}

export default function GuideDetail() {
  const { slug } = useParams<{ slug: string }>();
  const guide = getGuideBySlug(slug || "");
  const { toggle, isFav } = useFavorites("guide");
  const isMobile = useIsMobile();
  const articleRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeHeading, setActiveHeading] = useState("");
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    if (guide) document.title = `${guide.title} | CardPerks`;
    return () => { document.title = "CardPerks"; };
  }, [guide]);

  // Reading progress
  useEffect(() => {
    const onScroll = () => {
      if (!articleRef.current) return;
      const rect = articleRef.current.getBoundingClientRect();
      const total = articleRef.current.scrollHeight - window.innerHeight;
      const scrolled = -rect.top + 80;
      setProgress(Math.min(1, Math.max(0, scrolled / total)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active heading tracking
  useEffect(() => {
    if (!guide) return;
    const headings = extractHeadings(guide.content);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHeading(entry.target.id);
        });
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [guide]);

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied!");
  }, []);

  if (!guide) {
    return (
      <PageLayout>
        <div className="py-32 text-center">
          <p className="text-lg text-muted-foreground">Guide not found</p>
          <Link to="/guides" className="text-gold text-sm mt-4 inline-block">← Back to Guides</Link>
        </div>
      </PageLayout>
    );
  }

  const headings = extractHeadings(guide.content);
  const relatedGuides = guides.filter((g) => g.slug !== guide.slug && g.category === guide.category).slice(0, 3);
  const nextGuide = guides.find((g) => g.slug !== guide.slug && g.category === guide.category);

  const markdownComponents = {
    strong: ({ children }: any) => <strong className="font-semibold text-gold">{children}</strong>,
    h2: ({ children }: any) => {
      const text = typeof children === "string" ? children : Array.isArray(children) ? children.join("") : String(children);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return <h2 id={id} className="font-serif text-xl font-bold text-foreground mt-6 mb-3 scroll-mt-24">{children}</h2>;
    },
    table: ({ children }: any) => (
      <div className="overflow-x-auto my-4 rounded-lg border border-border/30">
        <table className="w-full text-xs">{children}</table>
      </div>
    ),
    thead: ({ children }: any) => <thead className="bg-secondary/40 text-left">{children}</thead>,
    th: ({ children }: any) => <th className="px-3 py-2 font-semibold text-foreground border-b border-border/30">{children}</th>,
    td: ({ children }: any) => <td className="px-3 py-2 border-b border-border/15 text-muted-foreground">{children}</td>,
    li: ({ children }: any) => <li className="ml-4 text-muted-foreground flex items-start gap-2"><span className="text-gold mt-1.5 text-[8px]">●</span><span>{children}</span></li>,
    ol: ({ children }: any) => <ol className="space-y-1.5 my-2">{children}</ol>,
    ul: ({ children }: any) => <ul className="space-y-1.5 my-2">{children}</ul>,
    p: ({ children }: any) => <p className="text-muted-foreground leading-relaxed">{children}</p>,
    em: ({ children }: any) => <em className="italic text-muted-foreground">{children}</em>,
  };

  const TOCList = () => (
    <nav className="space-y-1">
      {headings.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          onClick={(e) => { e.preventDefault(); document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" }); setTocOpen(false); }}
          className={`block text-xs py-1.5 px-3 rounded-lg transition-colors ${activeHeading === h.id ? "bg-gold/10 text-gold font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"}`}
        >
          {h.text}
        </a>
      ))}
    </nav>
  );

  return (
    <PageLayout>
      {/* Reading progress bar */}
      <div className="fixed top-[80px] left-0 right-0 z-30 h-0.5 bg-secondary/20">
        <motion.div className="h-full bg-gold" style={{ width: `${progress * 100}%` }} transition={{ duration: 0.1 }} />
      </div>

      <article className="py-12" ref={articleRef}>
        <div className="container mx-auto px-4">
          {/* Gold gradient accent */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[radial-gradient(ellipse_at_center,hsl(var(--gold)/0.06),transparent_70%)] pointer-events-none" />

          <div className="max-w-5xl mx-auto relative">
            <div className="flex gap-8">
              {/* Desktop TOC sidebar */}
              {!isMobile && headings.length > 0 && (
                <aside className="hidden lg:block w-56 flex-shrink-0">
                  <div className="sticky top-28">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-3 flex items-center gap-1.5 px-3">
                      <List className="w-3 h-3" /> Contents
                    </p>
                    <TOCList />
                  </div>
                </aside>
              )}

              {/* Main content */}
              <div className="flex-1 max-w-3xl">
                <Link to="/guides" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-gold transition-colors mb-8">
                  <ArrowLeft className="w-4 h-4" /> Back to Guides
                </Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  {/* Header */}
                  <div className="mb-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider" style={{ backgroundColor: `${guide.color}15`, color: guide.color }}>
                          {guide.category}
                        </span>
                        {guide.featured && <span className="px-3 py-1 rounded-full bg-gold/20 text-gold text-[10px] font-medium">Featured</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        <FavoriteButton isFav={isFav(guide.slug)} onToggle={() => toggle(guide.slug)} className="hover:bg-secondary/50" />
                        <button onClick={handleShare} className="p-1.5 rounded-lg hover:bg-secondary/50 transition-colors" aria-label="Share">
                          <Share2 className="w-4 h-4 text-muted-foreground hover:text-gold transition-colors" />
                        </button>
                      </div>
                    </div>
                    <h1 className="font-serif text-3xl sm:text-4xl font-bold leading-tight mb-5">{guide.title}</h1>
                    <p className="text-muted-foreground leading-relaxed mb-6">{guide.description}</p>
                    <div className="flex items-center gap-6 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {guide.author}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {guide.readTime} read</span>
                      <span>{guide.date}</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      {guide.tags.map((t) => (
                        <span key={t} className="text-[10px] px-2.5 py-1 rounded-full bg-secondary/60 text-muted-foreground flex items-center gap-1">
                          <Tag className="w-2.5 h-2.5" /> {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Mobile TOC */}
                  {isMobile && headings.length > 0 && (
                    <Collapsible open={tocOpen} onOpenChange={setTocOpen} className="mb-6">
                      <CollapsibleTrigger className="w-full glass-card rounded-xl p-3 flex items-center justify-between text-xs font-semibold text-muted-foreground">
                        <span className="flex items-center gap-1.5"><List className="w-3.5 h-3.5" /> Table of Contents</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${tocOpen ? "rotate-180" : ""}`} />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2 glass-card rounded-xl p-3">
                        <TOCList />
                      </CollapsibleContent>
                    </Collapsible>
                  )}

                  {/* Content rendered with react-markdown */}
                  <div className="space-y-6">
                    {guide.content.map((section, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i, duration: 0.4 }}
                        className="glass-card rounded-2xl p-6 sm:p-8"
                      >
                        <div className="prose prose-sm prose-invert max-w-none text-sm leading-relaxed">
                          <ReactMarkdown components={markdownComponents}>{section}</ReactMarkdown>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Related guides */}
                {relatedGuides.length > 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-16">
                    <h3 className="font-serif text-xl font-semibold mb-6">Related <span className="gold-gradient">Guides</span></h3>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {relatedGuides.map((rg) => {
                        const isNext = rg.slug === nextGuide?.slug;
                        return (
                          <Link
                            key={rg.slug}
                            to={`/guides/${rg.slug}`}
                            className={`glass-card rounded-xl p-5 group transition-all relative overflow-hidden ${isNext ? "border-gold/30 ring-1 ring-gold/10" : "hover:border-gold/30"}`}
                          >
                            {isNext && (
                              <span className="absolute top-0 right-0 text-[9px] px-2 py-0.5 bg-gold/15 text-gold font-bold rounded-bl-lg">Next</span>
                            )}
                            <div className="flex items-center gap-2.5 mb-3">
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${rg.color}15` }}>
                                <rg.icon className="w-4 h-4" style={{ color: rg.color }} />
                              </div>
                              <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><Clock className="w-3 h-3" /> {rg.readTime}</span>
                            </div>
                            <h4 className="font-semibold text-sm group-hover:text-gold transition-colors mb-1.5 leading-snug">{rg.title}</h4>
                            <p className="text-[11px] text-muted-foreground line-clamp-1">{rg.description}</p>
                            <p className="text-[10px] text-muted-foreground mt-2">{rg.author}</p>
                            {/* Hover glow */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" style={{ background: `radial-gradient(circle at 50% 100%, ${rg.color}08, transparent 70%)` }} />
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
      <BackToTop />
    </PageLayout>
  );
}
