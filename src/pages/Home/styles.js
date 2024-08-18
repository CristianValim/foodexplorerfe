import styled from "styled-components";

export const Container = styled.main`
  min-height: 80svh;
  position: relative;
  padding-top: 4.4rem;
  .banner {
    background-color: ${({ theme }) => theme.COLORS.BANNER_BACKGROUND};
    position: relative;

    margin-left: 3.6rem;
    margin-right: 1.6rem;

    padding: 3.6rem 2.1rem 2.2rem 15rem;
    border-radius: .3rem;

    cursor: default;

    img {
      max-width: 18rem;
      position: absolute;
      top: -2.8rem;
      left: -3rem;
      z-index: 50;
    }

    h2 {
      font-size: 1.8rem;
      font-weight: 600;
    }

    h3 {
      font-size: 1.2rem;
    }
  }

  .categories {
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_500};
    position: relative;
    min-height: 40dvh;
    z-index: 100;
    padding-top: 6.2rem;
    .favoriteslink {
    color: ${({ theme }) => theme.COLORS.FONT_600};font-size: 1.8rem;
    font-weight: 600;
    position: absolute;
      z-index: 200;

      right: 10%;
      @media (min-width: 600px) {
      font-size: 3.2rem;
    }
  }
  }



  @media (min-width: 1300px) {
    padding-top: 16.4rem;
    .banner {
    margin-left: 12.4rem;
    margin-right: 12.4rem;

    padding: 8.8rem 8% 9.2rem 40%;
    border-radius: .8rem;

    img {
      max-width: 60%;
      position: absolute;
      top: -14rem;
      left: -3rem;
    }

    h2 {
      font-size: 4rem;
    }

    h3 {
      font-size: 1.6rem;
      white-space: nowrap;
    }
  }

  .category {
    margin-left: 12.4rem;
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
  ${({ theme }) => theme.COLORS.BACKGROUND_500} 0%,
  rgba(255, 255, 255, 0) 10%,
  rgba(255, 255, 255, 0) 90%,
  ${({ theme }) => theme.COLORS.BACKGROUND_500} 100%
);

  z-index: 10;
`;