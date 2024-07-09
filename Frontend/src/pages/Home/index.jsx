import { Container } from "./styles";
import macarons from "../../assets/icons/macarons.png";
import { DishGallery } from "../../components/DishGallery";
import { AnimatePresence, motion } from "framer-motion";

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
        <section className="banner">
          <img src={macarons} alt="" />
          <h2>Sabores inigualáveis</h2>
          <h3>Sinta o cuidado do preparo com ingredientes selecionados.</h3>
        </section>

        <section className="categories">
          <DishGallery />
        </section>
      </Container>
    </AnimatePresence>
  );
}
