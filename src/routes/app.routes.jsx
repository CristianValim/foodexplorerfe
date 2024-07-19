import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "../pages/Home";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { NewDish } from "../pages/NewDish";
import { EditDish } from "../pages/EditDish";
import { useAuth } from "../hooks/auth";
import { DishDescription } from "../components/DishDescription";

export function AppRoutes() {
  const location = useLocation();
  const { isAdmin }= useAuth()
  return (
    <>
      <Header isAdmin={isAdmin}/>
      <Routes isAdmin={isAdmin} location={location} key={location.pathname}>
        <Route exact path="/" element={<Home />} />
        <Route path="/dishes/newdish" element={<NewDish />} />
        <Route path="/dishes/editdish/:id" element={<EditDish />} />
        <Route path="/dishes/:id" element={<DishDescription />} />
      </Routes>
      <Footer />
    </>
  );
}
