import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center font-serif font-bold text-background text-sm">
                CP
              </div>
              <span className="font-serif text-xl font-bold">
                Card<span className="text-gold">Perks</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              India's premier credit card perks and voucher tracking platform. Track rates, compare cards, maximize savings.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <h4 className="font-semibold text-sm mb-4 text-gold">Platform</h4>
              <div className="flex flex-col gap-3">
                <Link to="/vouchers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Vouchers</Link>
                <Link to="/cards" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Know Your Cards</Link>
                <Link to="/perk-ai" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Perk AI</Link>
                <Link to="/guides" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Guides Hub</Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4 text-gold">Company</h4>
              <div className="flex flex-col gap-3">
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</Link>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-gold">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-4">Get weekly insights on the best credit card deals.</p>
            <div className="flex gap-2">
              <Input
                placeholder="your@email.com"
                className="bg-secondary/50 border-border/50 text-sm h-10"
              />
              <button className="gold-btn px-4 rounded-lg flex items-center">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-border/30 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">©2026 CardPerks. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Made with ♥ for smart savers</p>
        </div>
      </div>
    </footer>
  );
}
