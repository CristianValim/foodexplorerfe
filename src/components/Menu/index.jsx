import { motion, AnimatePresence } from "framer-motion";
import { Twirl as Hamburger } from "hamburger-react";
import { useState } from "react";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Switch from "react-switch";
import { toast } from "react-toastify";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { Tooltip } from "react-tooltip";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../hooks/auth";
import { Footer } from "../Footer";
import { InputSearch } from "../InputSearch";
import { Container } from "./styles";

export function Menu({ isOpen, setOpen }) {
  const { signOut, user, updateUserRole, isAdmin } = useAuth();
  const [isGodMode, setIsGodMode] = useState(user.role === "admin");
  const { theme, toggleTheme } = useTheme();

  // Função para lidar com cliques em links
  function handleLinkClick() {
    setOpen(false);
  }

  // Função para alterar o modo GodMode
  async function handleGodModeChange(checked) {
    setIsGodMode(checked);
    const newRole = checked ? "admin" : "user";

    try {
      await updateUserRole(newRole);
    } catch (error) {
      toast.error("Erro ao atualizar papel:", error);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }} // Duração da transição
          style={{ position: "fixed", inset: 0, zIndex: 1000 }}
        >
          <Container>
            <div className="menu-header">
              <Hamburger
                toggled={isOpen}
                toggle={setOpen}
                label="Abrir menu"
                rounded
                size={24}
                distance="lg"
                hideOutline={false}
              />
              <h1>Menu</h1>
              <DarkModeSwitch
                style={{ marginLeft: "auto", marginRight: "1rem" }}
                checked={theme === "light"}
                onChange={toggleTheme}
                moonColor="#FFFAF1"
                sunColor="#FFFAF1"
                size={40}
              />
            </div>
            <main>
              <div className="search-container">
                <InputSearch setOpen={setOpen} />
              </div>

              {isAdmin && (
                <>
                  <Link to="/dishes/newdish" onClick={handleLinkClick}>
                    Novo Prato
                  </Link>
                  <span />
                </>
              )}

              <Link onClick={signOut} to="/">
                Sair
              </Link>
              <span />

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
              <span />
            </main>
            <Footer />
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
