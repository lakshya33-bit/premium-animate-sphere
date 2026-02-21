import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Heart, TrendingUp, Sparkles, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FloatingParticles from "@/components/FloatingParticles";
import logo from "@/assets/cardperks-logo.png";

const features = [
  { icon: Heart, text: "Save favourites & wishlists" },
  { icon: TrendingUp, text: "Track expenses & savings" },
  { icon: Sparkles, text: "AI-powered recommendations" },
];

const fieldVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.3 + i * 0.1, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

function getPasswordStrength(pw: string): { label: string; color: string; width: string } {
  if (pw.length === 0) return { label: "", color: "", width: "0%" };
  if (pw.length < 6) return { label: "Weak", color: "bg-destructive", width: "25%" };
  if (pw.length < 8) return { label: "Fair", color: "bg-orange-400", width: "50%" };
  if (/[A-Z]/.test(pw) && /[0-9]/.test(pw) && pw.length >= 10) return { label: "Strong", color: "bg-green-500", width: "100%" };
  return { label: "Good", color: "bg-gold", width: "75%" };
}

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const strength = getPasswordStrength(password);

  const validateEmail = (val: string) => {
    if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email || !password) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    if (emailError) return;
    if (password.length < 6) {
      toast({ title: "Weak password", description: "Password must be at least 6 characters.", variant: "destructive" });
      return;
    }
    toast({ title: "Account created!", description: "Welcome to CardPerks. Please sign in." });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex relative overflow-hidden">
      <FloatingParticles />

      {/* Left: Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-lg">
          <Link to="/" className="flex items-center justify-center mb-10">
            <img src={logo} alt="CardPerks" className="h-12 w-auto rounded-lg" />
          </Link>

          <div className="glass-card rounded-2xl p-8">
            <h1 className="font-serif text-2xl font-bold text-center mb-2">Create Your Account</h1>
            <p className="text-sm text-muted-foreground text-center mb-8">Join thousands of smart savers</p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {features.map((f) => (
                <div key={f.text} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 text-xs text-gold">
                  <f.icon className="w-3.5 h-3.5" />
                  {f.text}
                </div>
              ))}
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible" className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm">First Name</Label>
                  <Input id="firstName" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="bg-secondary/50 border-border/50 focus:border-gold/50 focus:shadow-[0_0_0_3px_hsl(var(--gold)/0.1)] transition-all" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} className="bg-secondary/50 border-border/50 focus:border-gold/50 focus:shadow-[0_0_0_3px_hsl(var(--gold)/0.1)] transition-all" />
                </div>
              </motion.div>
              <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible" className="space-y-2">
                <Label htmlFor="email" className="text-sm">Email</Label>
                <Input
                  id="email" type="email" placeholder="you@example.com" value={email}
                  onChange={(e) => { setEmail(e.target.value); validateEmail(e.target.value); }}
                  onBlur={() => validateEmail(email)}
                  className={`bg-secondary/50 border-border/50 focus:border-gold/50 focus:shadow-[0_0_0_3px_hsl(var(--gold)/0.1)] transition-all ${emailError ? "border-destructive" : ""}`}
                />
                {emailError && <p className="text-[11px] text-destructive">{emailError}</p>}
              </motion.div>
              <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible" className="space-y-2">
                <Label htmlFor="password" className="text-sm">Password</Label>
                <div className="relative">
                  <Input
                    id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-secondary/50 border-border/50 focus:border-gold/50 focus:shadow-[0_0_0_3px_hsl(var(--gold)/0.1)] transition-all pr-10"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {password && (
                  <div className="space-y-1.5 mt-2">
                    <div className="h-1.5 rounded-full bg-secondary/50 overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-300 ${strength.color}`} style={{ width: strength.width }} />
                    </div>
                    <p className="text-[11px] text-muted-foreground">Password strength: <span className="font-medium text-foreground">{strength.label}</span></p>
                  </div>
                )}
              </motion.div>
              <motion.div custom={3} variants={fieldVariants} initial="hidden" animate="visible">
                <button type="submit" className="w-full gold-btn py-3 rounded-xl text-sm font-semibold">Create Account</button>
              </motion.div>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border/50" /></div>
              <div className="relative flex justify-center"><span className="bg-card px-3 text-xs text-muted-foreground">or</span></div>
            </div>

            <button onClick={() => toast({ title: "Google Sign-Up", description: "Google authentication coming soon!" })} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-border/50 hover:bg-secondary/30 transition-colors text-sm">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-gold hover:text-gold-light transition-colors font-medium">Sign In</Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right: 3D Card Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-l from-gold/5 via-transparent to-transparent" />
        <motion.div
          initial={{ opacity: 0, rotateY: 30 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative"
          style={{ perspective: "1000px" }}
        >
          <motion.div
            animate={{ rotateY: [0, -6, 8, -3, 0], rotateX: [0, 4, -3, 2, 0] }}
            transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
            className="w-80 h-[200px] rounded-2xl relative overflow-hidden shadow-2xl shadow-gold/20"
            style={{
              background: "linear-gradient(135deg, hsl(220 20% 12%), hsl(220 18% 18%), hsl(220 15% 22%))",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(196,163,90,0.2),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(196,163,90,0.1),transparent_60%)]" />
            <div className="absolute top-6 left-6">
              <div className="w-10 h-8 rounded bg-gradient-to-br from-gold/50 to-gold-dark/40 border border-gold/30" />
            </div>
            <div className="absolute bottom-6 left-6">
              <p className="text-xs text-gold/60 tracking-[0.3em] font-mono">•••• •••• •••• 7291</p>
              <p className="text-[10px] text-gold/40 mt-1 uppercase tracking-wider">YOUR NAME HERE</p>
            </div>
            <div className="absolute bottom-6 right-6">
              <p className="text-xs text-gold/50 font-bold tracking-wider">MASTERCARD</p>
            </div>
            <div className="absolute top-6 right-6">
              <Sparkles className="w-5 h-5 text-gold/30" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
