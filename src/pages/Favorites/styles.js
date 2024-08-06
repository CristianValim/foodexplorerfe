import styled from "styled-components";

// Estilos para o componente Container
export const Container = styled.main`
  min-height: 95dvh;
  margin-bottom: 2.4rem;
  position: relative;
  width: 100%;

  .swiper-container {
    position: relative;
  }

  &:hover {
    cursor: default;
  }

  .category, h1 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-left: 2.4rem;
    margin-top: 2rem;
    margin-bottom: 2.4rem;

    @media (min-width: 600px) {
      font-size: 3.2rem;
    }
  }
`;

// Estilos para o componente GradientOverlay
export const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: linear-gradient(
    to right,
    #00070a 0%,
    rgba(255, 255, 255, 0) 10%,
    rgba(255, 255, 255, 0) 90%,
    #00070a 100%
  );
  z-index: 10;
`;
