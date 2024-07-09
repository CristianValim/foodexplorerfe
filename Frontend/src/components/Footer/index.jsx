import { Container } from "./styles";
import logo from "../../assets/icons/logoFooter.svg";

export function Footer() {
  return (
    <Container>
      <section>
        <p>
          <img src={logo} />
          food explorer
        </p>
        <p>© 2023 - Todos os direitos reservados.</p>
      </section>
    </Container>
  );
}
