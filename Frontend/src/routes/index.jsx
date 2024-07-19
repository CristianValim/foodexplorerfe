import { AnimatePresence } from "framer-motion";
import { MdOutlineLightMode, MdLightMode } from "react-icons/md";
import { useAuth } from "../hooks/auth";
import { useTheme } from "../contexts/ThemeContext";
import { AppRoutes } from "../routes/app.routes";
import { AuthRoutes } from "../routes/auth.routes";
import styled from "styled-components";

const ToggleButton = styled.button`
  display: grid;
  place-content: center;

  position: fixed;
  width: 5rem;
  height: 5rem;
  bottom: 1rem;
  right: 1rem;
  background-color: ${(props) => props.theme.COLORS.TOMATO_100};
  color: ${(props) => props.theme.COLORS.LIGHT_100};
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

export function AnimatedRoutes() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <AnimatePresence>
      <ToggleButton onClick={toggleTheme}>
        {theme === "light" ? (<MdOutlineLightMode size={35} />) : (<MdLightMode size={35} />)}
      </ToggleButton>
      {user ? <AppRoutes /> : <AuthRoutes />}
    </AnimatePresence>
  );
}
