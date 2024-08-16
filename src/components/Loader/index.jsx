import BounceLoader from 'react-spinners/BounceLoader';
import { useTheme } from '../../contexts/ThemeContext'; // Importe o contexto de tema
import { Container } from './styles'; // Importe o container de estilos

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
