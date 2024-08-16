import { Container } from './styles';
import { useTheme } from '../../contexts/ThemeContext';
import arrowBack from '../../assets/icons/CaretLeft.svg';

export function GetBack() {
    const { theme } = useTheme(); // Obtém o tema atual (light ou dark)

    // Define o filtro para a seta com base no tema
    const arrowFilter =
        theme === "light"
            ? "brightness(0) saturate(100%) invert(35%) sepia(45%) saturate(808%) hue-rotate(306deg) brightness(92%) contrast(81%)"
            : "none"; // Sem filtro no dark theme, mantendo a cor original

    function handleGetBack() {
        window.history.back();
    }

    return (
        <Container type="button" onClick={handleGetBack} className="getBack">
            <img
                src={arrowBack}
                alt="Voltar"
                style={{ filter: arrowFilter }} // Aplica o filtro à seta
            /> 
            voltar
        </Container>
    );
}
