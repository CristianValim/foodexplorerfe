import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../../hooks/auth";
import { Link } from "react-router-dom";
import { Container } from "./styles";
import Switch from "react-switch";
import { Tooltip } from "react-tooltip";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { Footer } from "../Footer";
import { InputSearch } from "../InputSearch";
import { Twirl as Hamburger } from "hamburger-react";
import { api } from "../../services/api";

export function Menu({ isOpen, setOpen }) {
  const { signOut, user, updateUserRole, isAdmin } = useAuth();

  const [isGodMode, setIsGodMode] = useState(user.role === "admin");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    try {
      const response = await api.get(`/dishes/index?term=${searchTerm}`);
      console.log(response); // Verifique o objeto de resposta

      if (response.status !== 200) {
        throw new Error("Erro ao buscar pratos.");
      }

      const data = response.data; // Acessa diretamente response.data

      console.log(data); // Verifique os dados recebidos da API
      setSearchResults(data);
    } catch (error) {
      console.error("Erro ao buscar pratos:", error);
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
        <InputSearch
          placeholder="Busque por pratos ou ingredientes"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        {searchResults.length > 0 && (
          <ul>
            {searchResults.map((dish) => (
              <li key={dish.id}>
                <Link to={`/dishes/${dish.id}`} onClick={handleLinkClick}>
                  {dish.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <Link
          to="/dishes/newdish"
          onClick={handleLinkClick}
          style={{ display: isAdmin ? "block" : "none" }}
        >
          Novo Prato
        </Link>
        <Link onClick={signOut} to="/">
          Sair
        </Link>
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
      </main>
      <Footer />
    </Container>
  );
}
