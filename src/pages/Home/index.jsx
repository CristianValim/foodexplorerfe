import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import macarons from "../../assets/icons/macarons.png";
import { DishGallery } from "../../components/DishGallery";
import { useIsMobile } from "../../hooks/useIsMobile";
import { Container, GradientOverlay } from "./styles";

export function Home() {
	const [showFavorites, setShowFavorites] = useState(false);

	const handleToggleFavorites = () => {
		setShowFavorites(!showFavorites);
	};

	const isMobile = useIsMobile();
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
				<section
					className="categories"
					style={{ marginInline: isMobile ? "0rem" : "5rem" }}
				>
					<Link className="favoriteslink" onClick={handleToggleFavorites}>
						{showFavorites ? "Todos pratos" : "Favoritos"}
					</Link>

					<DishGallery showFavorites={showFavorites} />
					<GradientOverlay />
				</section>

				<GradientOverlay />
			</Container>
		</AnimatePresence>
	);
}
