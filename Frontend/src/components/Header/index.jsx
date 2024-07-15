import { useEffect, useState } from "react";
import { Container } from "./styles";
import { useAuth } from "../../hooks/auth";
import { Menu } from "../Menu";
import { AnimatePresence } from "framer-motion";
import Switch from "react-switch";
import { Tooltip } from "react-tooltip";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { useIsMobile } from "../../hooks/useIsMobile";
import logo from "../../assets/icons/logo.svg";
import cart from "../../assets/icons/Receipt.svg";
import signout from "../../assets/icons/SignOut.svg";
import { Link } from "react-router-dom";
import { Twirl as Hamburger } from "hamburger-react";
import { InputSearch } from "../InputSearch";
import { useCart } from "../../contexts/CartContext";

export function Header({ isAdmin }) {
  const { updateUserRole, signOut, user } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const { getCartItemCount } = useCart();
  const [canToggleMenu, setCanToggleMenu] = useState(true);

  const [isGodMode, setIsGodMode] = useState(user.role === "admin");
  const isMobile = useIsMobile();
  const handleGodModeChange = async (checked) => {
    setIsGodMode(checked);
    const newRole = checked ? "admin" : "user";

    try {
      await updateUserRole(newRole);
    } catch (error) {
      console.error("Erro ao atualizar papel:", error);
    }
  };

  function handleMenuToggle() {
    if (canToggleMenu) {
      setOpen(!isOpen);
      setCanToggleMenu(false);
      setTimeout(() => {
        setCanToggleMenu(true);
      }, 1000);
    }
  }

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
      <Link to="/" style={{ margin: "auto" }}>
        <button className="logo-wrapp">
          <img className="logo" src={logo} alt="food explorer" />
          <span
            className="admin"
            style={{ display: isAdmin ? "block" : "none" }}
          >
            admin
          </span>
        </button>
      </Link>
      <div
        className="search-container"
        style={{ display: isMobile ? "none" : "block" }}
      >
        <InputSearch />
      </div>
      <button className="cart" style={{ display: isAdmin ? "none" : "flex" }}>
        <img src={cart} />
        <span className="desktop">Pedidos</span>
        <div className="badge">
          {isMobile ? "" : "("}
          {getCartItemCount()}
          {isMobile ? "" : ")"}
        </div>
      </button>
      <Link
        className="newDish"
        to="/dishes/newdish"
        style={{ display: isMobile ? "none" : isAdmin ? "block" : "none" }}
      >
        Novo prato
      </Link>

      <div className="signout">
        <button onClick={signOut}>
          <img src={signout} />
        </button>
      </div>
      <div className="godmode" style={{ display: isMobile ? "none" : "flex" }}>
        <span>GodMode</span>
        <FaRegCircleQuestion
          size={"2rem"}
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Godmode altera o estado entre usuário comum e administrador."
        />
        <Switch
          className="switch"
          onChange={handleGodModeChange}
          checked={isGodMode}
          uncheckedIcon={false}
          checkedIcon={false}
        />
        <Tooltip
          id="my-tooltip"
          place="right"
          style={{
            fontSize: "1.2rem",
            maxWidth: "20rem",
            textAlign: "center",
          }}
        />
      </div>
    </Container>
  );
}
