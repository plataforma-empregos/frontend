import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function AuthLayout() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.25 }}
      >
        <Outlet />{" "}
      </motion.main>
    </AnimatePresence>
  );
}

export default AuthLayout;
