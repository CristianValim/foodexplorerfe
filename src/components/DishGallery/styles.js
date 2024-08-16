import styled from "styled-components";

// 1. Estilização usando styled-components

// Estilos para o componente Container
export const Container = styled.div`
  position: relative;
  width: 100%;
  color: ${({ theme }) => theme.COLORS.FONT_600};

  .swiper-container {
    position: relative;
  }

  &:hover {
    cursor: default;
  }

  .category {
    font-size: 1.8rem;
    font-weight: 600;
    margin-left: 2.4rem;
    margin-bottom: 2.4rem;

    @media (min-width: 600px) {
      font-size: 3.2rem;
    }
  }
`;
