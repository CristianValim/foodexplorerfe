import { AnimatePresence } from "framer-motion";
import { useAuth } from "../hooks/auth";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export function AnimatedRoutes() {
	const { user } = useAuth();
	
	return (
		<AnimatePresence>
			{user ? <AppRoutes /> : <AuthRoutes />}
		</AnimatePresence>
	);
}
