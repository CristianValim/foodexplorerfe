import BounceLoader from "react-spinners/BounceLoader";
import { useTheme } from "../../contexts/ThemeContext";
import { Container } from "./styles";

export function Loader() {
	const { theme } = useTheme(); // Obtém o tema atual (light ou dark)

	// Define a cor do loader com base no tema
	const loaderColor = theme === "dark" ? "#82F3FF" : "#AB4D55";

	return (
		<Container>
			<BounceLoader
				size={150}
				color={loaderColor}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</Container>
	);
}
