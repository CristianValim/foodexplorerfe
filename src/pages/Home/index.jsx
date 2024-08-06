// 1. Bibliotecas externas
import { AnimatePresence, motion } from "framer-motion";

// 2. Componentes internos
import { Container } from "./styles";
import { DishGallery } from "../../components/DishGallery";

// 3. Assets
import macarons from "../../assets/icons/macarons.png";

export function Home() {
	return (
		<AnimatePresence>
			<Container
				as={motion.div}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.3 }}
			>
				{/* Seção do banner com imagem e texto */}
				<section className="banner">
					<img src={macarons} alt="Banner de macarons" />
					<h2>Sabores inigualáveis</h2>
					<h3>Sinta o cuidado do preparo com ingredientes selecionados.</h3>
				</section>

				{/* Seção com a galeria de pratos */}
				<section className="categories">
					<DishGallery />
				</section>
			</Container>
		</AnimatePresence>
	);
}
