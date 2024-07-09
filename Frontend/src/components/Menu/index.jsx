import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../../hooks/auth";
import { Link } from "react-router-dom";
import { Container } from "./styles";
import Switch from "react-switch";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { Footer } from "../Footer";
import { Input } from "../Input";
import { SlMagnifier } from "react-icons/sl";
import { Twirl as Hamburger } from "hamburger-react";

export function Menu({ isOpen, setOpen }) {
  const { signOut, user, updateUserRole, isAdmin } = useAuth();

  const [isGodMode, setIsGodMode] = useState(user.role === "admin");

  const handleLinkClick = () => {
    setOpen(false);
  };

  const handleGodModeChange = async (checked) => {
    setIsGodMode(checked);
    const newRole = checked ? "admin" : "user";

    try {
      await updateUserRole(newRole);
    } catch (error) {
      console.error("Erro ao atualizar papel:", error);
    }
  };

  return (
    <Container
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="menu-header">
        <AnimatePresence>
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            label="Abrir menu"
            rounded
            size={24}
            distance="lg"
            hideOutline={false}
          />
        </AnimatePresence>
        <h1>Menu</h1>
      </div>
      <main>
        <div className="search">
          <button className="searchButton">
            <SlMagnifier size="2.4rem" title="Buscar" className="react-icons" />
          </button>
          <Input
            type="search"
            placeholder="Busque por pratos ou ingredientes"
          />
        </div>
        <Link
          to="/dishes/newdish"
          onClick={handleLinkClick}
          style={{ display: isAdmin ? "block" : "none" }}
        >
          Novo Prato
        </Link>
        <span style={{ display: isAdmin ? "block" : "none" }}></span>
        <Link onClick={signOut} to="/">
          Sair
        </Link>
        <span></span>
        <div className="godmode">
          GodMode
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
        <span></span>
      </main>
      <Footer />
    </Container>
  );
}
