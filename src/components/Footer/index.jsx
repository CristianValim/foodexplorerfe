import { Container } from "./styles";
import logoFooter from "../../assets/icons/logoFooter.svg"; // Importação do ícone do logo

export function Footer() {
	return (
		<Container>
			<section>
				{/* Logo e texto do rodapé */}
				<p>
					<img src={logoFooter} alt="Logo" /> food explorer
				</p>
				{/* Texto de direitos autorais */}
				<p>© 2023 - Todos os direitos reservados.</p>
			</section>
		</Container>
	);
}
