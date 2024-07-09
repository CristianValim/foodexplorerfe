import { useEffect, useState } from "react";
import { Container } from "./styles";
import { Menu } from "../Menu";
import { AnimatePresence } from "framer-motion";
import { SlMagnifier } from "react-icons/sl";

import logo from "../../assets/icons/logo.svg";
import cart from "../../assets/icons/Receipt.svg";
import signout from "../../assets/icons/SignOut.svg";

import { Twirl as Hamburger } from "hamburger-react";
import { Input } from "../Input";
import { useAuth } from "../../hooks/auth";

export function Header({ isAdmin }) {
  const [isOpen, setOpen] = useState(false);
  const [cartQuantity, setCartQuantity] = useState("0");
  const [canToggleMenu, setCanToggleMenu] = useState(true);

  const { signOut } = useAuth();

  const handleMenuToggle = () => {
    if (canToggleMenu) {
      setOpen(!isOpen);
      setCanToggleMenu(false);
      setTimeout(() => {
        setCanToggleMenu(true);
      }, 1000);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        console.log("Esc");
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("keydown", handleKeyDown);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    const body = document.querySelector("body");
    if (isOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <Container>
      <div className="hamburguer">
        <AnimatePresence>
          <Hamburger
            isAdmin={isAdmin}
            toggled={isOpen}
            toggle={handleMenuToggle}
            label="Abrir menu"
            rounded
            size={24}
            distance="lg"
            hideOutline={false}
          />
          {isOpen && <Menu isOpen={isOpen} setOpen={setOpen} />}
        </AnimatePresence>
      </div>
      <div className="logo-wrapp">
        <img className="logo" src={logo} alt="food explorer" />
        <span className="admin">{isAdmin ? "admin" : ""}</span>
      </div>
      <form>
        <button className="searchButton">
          <SlMagnifier size="2.4rem" title="Buscar" className="react-icons" />
        </button>
        <Input
          className="searchBar"
          type="search"
          placeholder="Busque por pratos ou ingredientes"
        />
      </form>
      <button className="cart" style={{ display: isAdmin ? "none" : "block" }}>
        <img src={cart} />
        <span className="desktop">Pedidos</span>
        <div className="badge">{cartQuantity}</div>
      </button>

      <div className="signout">
        <button onClick={signOut}>
          <img src={signout} />
        </button>
      </div>
    </Container>
  );
}
