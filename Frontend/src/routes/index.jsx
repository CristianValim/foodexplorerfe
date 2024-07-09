import { AnimatePresence } from "framer-motion";
import { useAuth } from "../hooks/auth";

import { AppRoutes } from "../routes/app.routes";
import { AuthRoutes } from "../routes/auth.routes";

export function AnimatedRoutes() {
  const { user } = useAuth();

  return (
    <AnimatePresence>
      {user ? <AppRoutes /> : <AuthRoutes />}
    </AnimatePresence>
  );
}
