import { forwardRef } from "react";
import { Container } from "./styles.js";

export const Input = forwardRef(
	(
		{ name, placeholder, value, onChange, style, onKeyDown, type, minLength },
		ref,
	) => {
		return (
			<Container>
				{/* Label para o input */}
				<label className="textInput" htmlFor={name}>
					{name}
					{/* Campo de input */}
					<input
						style={style}
						className="textInput"
						type={type}
						name={name}
						id={name}
						placeholder={placeholder}
						value={value}
						onChange={onChange}
						onKeyDown={onKeyDown}
						minLength={minLength}
						ref={ref}
					/>
				</label>
			</Container>
		);
	},
);

export default Input;
