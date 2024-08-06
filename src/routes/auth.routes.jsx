// AuthRoutes.js
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { SignInUp } from "../pages/SignInUp";

export function AuthRoutes() {
	const location = useLocation();

	return (
		<Routes location={location} key={location.pathname}>
			<Route path="/" element={<SignInUp mode="login" />} />
			<Route path="/signup" element={<SignInUp mode="signup" />} />
		</Routes>
	);
}
