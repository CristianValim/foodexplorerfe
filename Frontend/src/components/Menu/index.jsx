import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../../hooks/auth";
import { Link } from "react-router-dom";
import { Container } from "./styles";
import Switch from "react-switch";
import { Footer } from "../Footer";
import { Input } from "../Input";
import { SlMagnifier } from "react-icons/sl";
import { Twirl as Hamburger } from "hamburger-react";
import { toast } from "react-toastify"; // para exibir notificações

export function Menu({ isOpen, setOpen, isAdmin }) {
  const { signOut, user, updateUserRole } = useAuth();

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

      <main className="search">
        <form>
          <button className="searchButton">
            <SlMagnifier size="2.4rem" title="Buscar" className="react-icons" />
          </button>
          <Input
            type="search"
            placeholder="Busque por pratos ou ingredientes"
          />
        </form>
        <Link
          to="/dishes/newdish"
          onClick={handleLinkClick}
          style={{ display: isAdmin ? "none" : "block" }}
        >
          Novo Prato
        </Link>
        <span style={{ display: isAdmin ? "none" : "block" }}></span>
        <Link onClick={signOut} to="/">
          Sair
        </Link>
        <span></span>
        <div className="godmode">
          GodMode
          <Switch onChange={handleGodModeChange} checked={isGodMode} />
        </div>
      </main>

      <Footer />
    </Container>
  );
}
