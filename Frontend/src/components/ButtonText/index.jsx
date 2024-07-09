import { Container } from "./styles.js";

export function ButtonText({ onClick, name }) {
  return (
    <Container
      onClick={onClick}>
      {name}
    </Container>
  );
}
