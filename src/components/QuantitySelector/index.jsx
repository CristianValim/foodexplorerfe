// 1. Componentes internos
import { Container } from "./styles";
import { Tooltip } from "react-tooltip";
import { useTheme } from "../../contexts/ThemeContext";

// 2. Assets e Ícones
import minus from "../../assets/icons/Minus.svg";
import plus from "../../assets/icons/Plus.svg";

// Componente QuantitySelector
export function QuantitySelector({ quantity, setQuantity }) {
  const { theme } = useTheme(); // Obtendo o tema atual

  // Definir o filtro baseado no tema
  const filter = theme === 'dark'
    ? 'none'
    : 'brightness(0) saturate(100%) invert(35%) sepia(45%) saturate(808%) hue-rotate(306deg) brightness(92%) contrast(81%)';

  return (
    <Container className={`quantitySelector ${theme}`}>
      {/* Botão para diminuir a quantidade */}
      <button
        type="button"
        onClick={() =>
          setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1))
        }
        className={quantity <= 1 ? "disabled" : ""}
        data-tooltip-id="minus-tooltip"
        data-tooltip-content="Remover"
        disabled={quantity <= 1}
      >
        <img src={minus} alt="Remover" style={{ filter }} />
      </button>

      {/* Exibição da quantidade */}
      <span>0{quantity}</span>

      {/* Botão para aumentar a quantidade */}
      <button
        type="button"
        onClick={() =>
          setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 3))
        }
        className={quantity >= 3 ? "disabled" : ""}
        data-tooltip-id="plus-tooltip"
        data-tooltip-content="Adicionar"
        disabled={quantity >= 3}
      >
        <img src={plus} alt="Adicionar" style={{ filter }} />
      </button>

      {/* Tooltips */}
      <Tooltip
        id="minus-tooltip"
        place="top"
        style={{
          fontSize: "1.2rem",
          maxWidth: "20rem",
          textAlign: "center",
        }}
      />
      <Tooltip
        id="plus-tooltip"
        place="top"
        style={{
          fontSize: "1.2rem",
          maxWidth: "20rem",
          textAlign: "center",
        }}
      />
    </Container>
  );
}
