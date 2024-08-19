import { Tooltip } from "react-tooltip";
import minus from "../../assets/icons/Minus.svg";
import plus from "../../assets/icons/Plus.svg";
import { useTheme } from "../../contexts/ThemeContext";
import { Container } from "./styles";

const Button = ({ onClick, disabled, icon, alt, tooltipId }) => {
	const { theme } = useTheme();
	const filter =
		theme === "dark"
			? "none"
			: "brightness(0) saturate(100%) invert(35%) sepia(45%) saturate(808%) hue-rotate(306deg) brightness(92%) contrast(81%)";

	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			className={disabled ? "disabled" : ""}
			data-tooltip-id={tooltipId}
			data-tooltip-content={alt}
		>
			<img src={icon} alt={alt} style={{ filter }} />
		</button>
	);
};

export function QuantitySelector({ quantity, setQuantity }) {
	return (
		<Container>
			<Button
				type="button"
				onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
				disabled={quantity <= 1}
				icon={minus}
				alt="Remover"
				tooltipId="minus-tooltip"
			/>

			<span>0{quantity}</span>

			<Button
				onClick={() => setQuantity((prev) => Math.min(prev + 1, 3))}
				disabled={quantity >= 3}
				icon={plus}
				alt="Adicionar"
				tooltipId="plus-tooltip"
			/>

			<Tooltip
				id="minus-tooltip"
				place="top"
				style={{ fontSize: "1.2rem", maxWidth: "20rem", textAlign: "center" }}
			/>
			<Tooltip
				id="plus-tooltip"
				place="top"
				style={{ fontSize: "1.2rem", maxWidth: "20rem", textAlign: "center" }}
			/>
		</Container>
	);
}
