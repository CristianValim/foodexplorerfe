import { useState } from "react";
import { Container } from "./styles.js";

export function FileInput({ name, onChange }) {
	const [preview, setPreview] = useState(null);
	const [hovering, setHovering] = useState(false);

	// Função para lidar com a mudança de arquivo selecionado
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
		// Chama a função onChange passada como prop, se existir
		if (onChange) {
			onChange(event);
		}
	};

	// Funções para lidar com eventos de mouse
	const handleMouseEnter = () => {
		setHovering(true);
	};

	const handleMouseLeave = () => {
		setHovering(false);
	};

	return (
		<Container>
			<span>Imagem do prato</span>
			<div
				className="image-preview"
				style={{
					display: preview ? (hovering ? "block" : "none") : "none",
				}}
			>
				{preview && <img src={preview} alt="Preview" />}
			</div>
			<label
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				className="fileInputLabel"
				htmlFor={name}
			>
				{name}
				<input
					className="fileInput"
					type="file"
					name={name}
					id={name}
					onChange={handleFileChange}
				/>
			</label>
		</Container>
	);
}
