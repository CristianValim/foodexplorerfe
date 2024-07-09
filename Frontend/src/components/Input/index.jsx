import { Container } from "./styles.js";

export function Input({ type, name, placeholder, value, onChange, onKeyDown }) {
  let inputClass = "";

  if (type === "file") {
    inputClass = "fileInput";
  } else {
    inputClass = "textInput";
  }
  
  return (
    <Container>
      <span className={inputClass}>Imagem do prato</span>
      <label className={inputClass} htmlFor={name}>
        {name}
        <input
          className={inputClass}
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
