import { Container } from "./styles.js";

// Componente Button que recebe as props: name, img, onClick e toDelete
export function Button({ name, img, onClick, toDelete }) {
	return (
		// Passa as props toDelete e onClick para o Container
		<Container $toDelete={toDelete} onClick={onClick}>
			{/* Exibe a imagem se a prop img estiver presente */}
			<img
				src={img}
				alt=""
				style={{
					display: img ? "" : "none",
				}}
			/>
			{name}
		</Container>
	);
}
