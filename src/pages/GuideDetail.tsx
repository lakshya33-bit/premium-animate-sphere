import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, Tag, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { getGuideBySlug, guides } from "@/data/guides";

export default function GuideDetail() {
  const { slug } = useParams<{ slug: string }>();
  const guide = getGuideBySlug(slug || "");

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

  const relatedGuides = guides.filter((g) => g.slug !== guide.slug && g.category === guide.category).slice(0, 3);

  return (
    <PageLayout>
      <article className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link to="/guides" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-gold transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Guides
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Header */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider" style={{ backgroundColor: `${guide.color}15`, color: guide.color }}>
                  {guide.category}
                </span>
                {guide.featured && <span className="px-3 py-1 rounded-full bg-gold/20 text-gold text-[10px] font-medium">Featured</span>}
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

            {/* Content */}
            <div className="space-y-6">
              {guide.content.map((section, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                  className="glass-card rounded-2xl p-6 sm:p-8"
                >
                  <div className="prose prose-sm prose-invert max-w-none text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                    {section.split('\n').map((line, j) => {
                      if (line.startsWith('## ')) return <h2 key={j} className="font-serif text-xl font-bold text-foreground mt-2 mb-3">{line.replace('## ', '')}</h2>;
                      if (line.startsWith('**') && line.endsWith('**')) return <p key={j} className="font-semibold text-foreground">{line.replace(/\*\*/g, '')}</p>;
                      if (line.startsWith('- ')) return <div key={j} className="flex items-start gap-2 ml-2"><span className="text-gold mt-1">•</span><span>{line.replace('- ', '')}</span></div>;
                      if (line.match(/^\d+\./)) return <div key={j} className="flex items-start gap-2 ml-2"><span className="text-gold font-medium">{line.match(/^\d+/)?.[0]}.</span><span>{line.replace(/^\d+\.\s*/, '')}</span></div>;
                      if (line.startsWith('|')) return <p key={j} className="font-mono text-xs bg-secondary/30 rounded px-2 py-1">{line}</p>;
                      if (line.trim() === '') return <br key={j} />;
                      return <p key={j}>{line.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1')}</p>;
                    })}
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
                {relatedGuides.map((rg) => (
                  <Link key={rg.slug} to={`/guides/${rg.slug}`} className="glass-card rounded-xl p-5 group hover:border-gold/30 transition-all">
                    <h4 className="font-semibold text-sm group-hover:text-gold transition-colors mb-2 leading-snug">{rg.title}</h4>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" /> {rg.readTime}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </article>
    </PageLayout>
  );
}
