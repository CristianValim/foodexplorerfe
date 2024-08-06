// 1. Componentes internos
import { Container } from "./styles.js";

// Componente Input
export function Input({
	name,
	placeholder,
	value,
	onChange,
	onKeyDown,
	type,
	minLength,
}) {
	return (
		<Container>
			{/* Label para o input */}
			<label className="textInput" htmlFor={name}>
				{name}
				{/* Campo de input */}
				<input
					className="textInput"
					type={type}
					name={name}
					id={name}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					onKeyDown={onKeyDown}
					minLength={minLength}
				/>
			</label>
		</Container>
	);
}
