import { Container } from "./styles";
import logoFooter from "../../assets/icons/logoFooter.svg";
import { useTheme } from "../../contexts/ThemeContext";

export function Footer() {
  const { theme } = useTheme(); // Obtém o tema atual (light ou dark)

  const logoFilter =
    theme === "dark"
      ? "none"
      : "brightness(0) saturate(100%) invert(84%) sepia(4%) saturate(1847%) hue-rotate(314deg) brightness(103%) contrast(102%)";

  return (
    <Container>
      <section>
        <p>
          <img src={logoFooter} alt="Logo" style={{ filter: logoFilter }} /> food explorer
        </p>
        <p>© 2023 - Todos os direitos reservados.</p>
      </section>
    </Container>
  );
}
