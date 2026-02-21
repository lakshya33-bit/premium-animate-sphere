import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import PopularVouchers from "@/components/PopularVouchers";
import ExploreMore from "@/components/ExploreMore";
import FloatingParticles from "@/components/FloatingParticles";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import BackToTop from "@/components/BackToTop";
import { Link } from "react-router-dom";
import { cards } from "@/data/cards";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Ambient floating particles */}
      <FloatingParticles />

      <Navbar />
      <HeroSection />

      {/* Section divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <ScrollReveal>
        <HowItWorks />
      </ScrollReveal>

      <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <ScrollReveal delay={0.1}>
        <PopularVouchers />
      </ScrollReveal>

      <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Featured Cards Section */}
      <ScrollReveal delay={0.15}>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-sm font-medium tracking-widest uppercase text-gold mb-2">Featured Cards</p>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold">Premium Cards, <span className="gold-gradient">Premium Perks</span></h2>
              </div>
              <Link to="/cards" className="hidden sm:flex items-center gap-1.5 text-sm text-gold hover:text-gold-light transition-colors font-medium">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.slice(0, 6).map((card) => (
                <Link key={card.id} to={`/cards/${card.id}`} className="group glass-card rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-gold/10 hover:-translate-y-1 transition-all duration-300 relative">
                  <div className="relative aspect-[1.586/1] overflow-hidden">
                    {card.image ? (
                      <img src={card.image} alt={card.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full" style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}66)` }} />
                    )}
                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                    {/* Network badge */}
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-background/70 backdrop-blur-sm text-foreground border border-border/30">
                      {card.network}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <h3 className="font-serif font-bold text-sm text-foreground">{card.name}</h3>
                      <p className="text-[10px] text-muted-foreground">{card.issuer} · {card.rewards} rewards · {card.fee}/yr</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/cards" className="sm:hidden flex items-center justify-center gap-1.5 text-sm text-gold hover:text-gold-light transition-colors font-medium mt-6">
              View All Cards <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </ScrollReveal>

      <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <ScrollReveal delay={0.1}>
        <ExploreMore />
      </ScrollReveal>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
