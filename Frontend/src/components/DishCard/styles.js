import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.COLORS.DARK_200};

  width: 21rem;
  height: 30rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  padding: 2.4rem;
  font-size: 1.4rem;

  .favorite, .edit {
    position: absolute;
    background-color: transparent;
    top: 0;
    right: 0;

    width: 4.8rem;
    height: 4.8rem;

    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;

    &:active {
      transform: scale(1.1);
    }
  }

  figure {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;

    text-align: center;
    figcaption {
      white-space: nowrap;
    }
    img {
      max-width: 9rem;
    }
  }
  .description {
    font-size: 1.4rem;
    overflow-y: scroll;
  }
  .price p {
    color: ${({ theme }) => theme.COLORS.CAKE_200};
    font-family: ${({ theme }) => theme.FONTS.SECONDARY};
    font-size: 1.6rem;
  }

  button:nth-child(2) {
    padding: 0.4rem;
  }

  @media (min-width: 600px) {
    width: max-content;
    height: 46rem;
    font-size: 2.4rem;

    figure {
      gap: 1.5rem;
      img {
        max-width: 17rem;
      }
    }

    .quantity-include {
      display: flex;

      button:nth-child(2) {
        padding: 0.4rem 2.4rem;
      }
    }
  }
`;
