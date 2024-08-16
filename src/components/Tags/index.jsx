// 1. Bibliotecas externas
import { forwardRef, useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

// 2. Componentes internos
import { Container } from "./styles";

// Componente Tags
export const Tags = forwardRef(
	({ isnew, onAddTag, onRemoveTag, tag, ...props }, ref) => {
		const [newTag, setNewTag] = useState("");

		// Função para adicionar uma nova tag
		function handleAddTag() {
			if (newTag.trim() === "") return;

			onAddTag(newTag);
			setNewTag("");
		}

		return (
			<Container isnew={isnew} ref={ref}>
				{/* Campo de input para adicionar ou exibir uma tag */}
				<input
					type="text"
					value={isnew ? newTag : tag}
					readOnly={!isnew}
					placeholder="Adicionar"
					onChange={(e) => setNewTag(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							handleAddTag();
						}
					}}
				/>

				{/* Botão para adicionar ou remover uma tag */}
				<button
					type="button"
					onClick={() => {
						if (isnew) {
							handleAddTag();
						} else {
							onRemoveTag(tag);
						}
					}}
				>
					{isnew ? <FiPlus size={15} /> : <FiX size={15} />}
				</button>
			</Container>
		);
	},
);
