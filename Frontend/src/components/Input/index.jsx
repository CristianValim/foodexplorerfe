import { Container } from "./styles.js";

export function Input({ name, placeholder, value, onChange, onKeyDown, type }) {
  return (
    <Container>
      <label className="textInput" htmlFor={name}>
        {name}
        <input
          className="textInput"
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </label>
    </Container>
  );
}
