import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function NavigationProgress() {
  const location = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => setShow(false), 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-[100] h-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-gold via-gold-light to-gold"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ boxShadow: "0 0 10px hsl(var(--gold) / 0.5)" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
