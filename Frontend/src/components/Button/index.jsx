import { Container } from "./styles.js";

export function Button({ name, img, onClick, toDelete }) {
  return (
    <Container toDelete={toDelete} onClick={onClick}>
      <img
        src={img}
        alt=""
        style={{
          display: img ? "" : "none",
        }}
      />{" "}
      {name}
    </Container>
  );
}
