// 1. Bibliotecas externas
import { useState } from "react";
import { Link } from "react-router-dom";
import Switch from "react-switch";
import { Tooltip } from "react-tooltip";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { Twirl as Hamburger } from "hamburger-react";

// 2. Componentes internos
import { Container } from "./styles";
import { Footer } from "../Footer";
import { InputSearch } from "../InputSearch";

// 3. Hooks personalizados
import { useAuth } from "../../hooks/auth";

// Componente Menu
export function Menu({ isOpen, setOpen }) {
  const { signOut, user, updateUserRole, isAdmin } = useAuth(); // Hook de autenticação
  const [isGodMode, setIsGodMode] = useState(user.role === "admin"); // Estado para GodMode

  // Função para lidar com cliques em links
  const handleLinkClick = () => {
    setOpen(false);
  };

  // Função para alterar o modo GodMode
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
      </div>
      <main>
        <div className="search-container">
          <InputSearch setOpen={setOpen} />
        </div>

        {/* Link para adicionar novo prato, visível apenas para administradores */}
        {isAdmin && (
          <>
            <Link to="/dishes/newdish" onClick={handleLinkClick}>
              Novo Prato
            </Link>
            <span></span>
          </>
        )}

        {/* Link para sair */}
        <Link onClick={signOut} to="/">
          Sair
        </Link>
        <span></span>

        {/* Switch para GodMode */}
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
