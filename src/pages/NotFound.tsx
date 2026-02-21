import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    document.title = "Page Not Found — CardPerks";
  }, [location.pathname]);

  return (
    <PageLayout>
      <section className="py-32 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <h1 className="font-serif text-7xl font-bold gold-gradient mb-4">404</h1>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <p className="text-xl font-serif font-semibold mb-2">Page not found</p>
            <p className="text-sm text-muted-foreground mb-8">The page you're looking for doesn't exist or has been moved.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/" className="gold-btn px-6 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2">
                <Home className="w-4 h-4" /> Go Home
              </Link>
              <Link to="/cards" className="gold-outline-btn px-6 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2">
                <Search className="w-4 h-4" /> Browse Cards
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default NotFound;
