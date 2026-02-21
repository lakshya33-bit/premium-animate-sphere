import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Bell, Menu, X, ChevronDown, User, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import logo from "@/assets/cardperks-logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Vouchers", href: "/vouchers" },
  { label: "Know Your Cards", href: "/cards" },
  { label: "Banking", href: "/banking" },
  { label: "Perk AI", href: "/perk-ai" },
  { label: "Guides Hub", href: "/guides" },
];

const moreLinks = [
  { label: "About Us", href: "/about" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-background/50"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="CardPerks" className="h-9 w-auto rounded-lg" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-gold transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-3/4" />
              </Link>
            ))}
            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={() => setMoreOpen(!moreOpen)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-gold transition-colors flex items-center gap-1"
              >
                More <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute top-full right-0 mt-1 w-44 glass-card rounded-lg overflow-hidden py-1"
                    onMouseLeave={() => setMoreOpen(false)}
                  >
                    {moreLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-gold hover:bg-secondary/50 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right side icons */}
          <div className="hidden lg:flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2 text-muted-foreground hover:text-gold transition-colors rounded-lg hover:bg-secondary/50">
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link to="/dashboard" className="p-2 text-muted-foreground hover:text-gold transition-colors rounded-lg hover:bg-secondary/50">
              <Heart className="w-4 h-4" />
            </Link>
            <Link to="/dashboard" className="p-2 text-muted-foreground hover:text-gold transition-colors rounded-lg hover:bg-secondary/50">
              <Bell className="w-4 h-4" />
            </Link>
            <Link to="/dashboard" className="p-2 text-muted-foreground hover:text-gold transition-colors rounded-lg hover:bg-secondary/50">
              <User className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="ml-2 px-5 py-2 text-sm font-medium gold-outline-btn rounded-lg"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-72 z-50 bg-background/95 backdrop-blur-xl border-l border-border p-6 pt-20 lg:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-gold hover:bg-secondary/30 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              {moreLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-gold hover:bg-secondary/30 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 flex gap-3">
                <button onClick={toggleTheme} className="p-2 text-muted-foreground hover:text-gold transition-colors">
                  {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="p-2 text-muted-foreground hover:text-gold transition-colors"><Heart className="w-5 h-5" /></Link>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="p-2 text-muted-foreground hover:text-gold transition-colors"><Bell className="w-5 h-5" /></Link>
              </div>
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-4 text-center px-5 py-3 text-sm font-medium gold-btn rounded-lg"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />
      )}
    </>
  );
}
