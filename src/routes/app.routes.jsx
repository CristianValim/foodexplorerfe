import { Route, Routes, useLocation } from "react-router-dom";
import { DishDescription } from "../components/DishDescription";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { useAuth } from "../hooks/auth";
import { CartPage } from "../pages/CartPage";
import { EditDish } from "../pages/EditDish";
import { Home } from "../pages/Home";
import { NewDish } from "../pages/NewDish";

export function AppRoutes() {
	const location = useLocation();
	const { isAdmin } = useAuth();
	return (
		<>
			<Header isAdmin={isAdmin} />
			<Routes isAdmin={isAdmin} location={location} key={location.pathname}>
				<Route exact path="/" element={<Home />} />
				<Route path="/dishes/newdish" element={<NewDish />} />
				<Route path="/dishes/editdish/:id" element={<EditDish />} />
				<Route path="/dishes/:id" element={<DishDescription />} />
				<Route path="/cart" element={<CartPage />} />
			</Routes>
			<Footer />
		</>
	);
}
