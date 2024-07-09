import { Container } from "./styles.js";
import { SlMagnifier } from "react-icons/sl"; // Importe o ícone de lupa

export function InputSearch({ placeholder, value, onChange, onKeyDown }) {
  return (
    <Container>
      <SlMagnifier className="searchIcon" size="2.4rem" />
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </Container>
  );
}
