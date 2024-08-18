import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.COLORS.CARD_BACKGROUND};
  color: ${({ theme }) => theme.COLORS.FONT_100};
  width: 20rem;
  height: 30rem;
  border-radius: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 3rem;
  padding: 2.4rem;
  font-size: 1.4rem;
    overflow: hidden;

  .favorite,
  .edit {
    position: absolute;
    background-color: transparent;
    top: 0;
    right: 0;
    width: 4.8rem;
    height: 4.8rem;
    transition: all 0.3s;

    img {
      display: inline;
    }

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
    }

    img {
      width: 100%;
      max-width: 9rem;
      aspect-ratio: 1;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  .description {
    font-size: 1.4rem;
    overflow-y: scroll;
  }

  .price p {
    color: ${({ theme }) => theme.COLORS.ADMIN};
    font-family: ${({ theme }) => theme.FONTS.SECONDARY};
    font-size: 1.6rem;
  }

  button:nth-child(2) {
    padding: 0.4rem;
  }

  @media (max-width: 600px) {
    .quantity-include {
      flex-direction: column;
    }
  }

  @media (min-width: 600px) {
    width: 100%;
    min-width: 30rem;
    height: 46rem;
    font-size: 2.4rem;
    margin-bottom: 5rem;

    figure {
      gap: 1.5rem;

      img {
        max-width: 17rem;
      }

      figcaption {
        white-space: wrap;
        max-width: 25rem;
      }

      .description {
        max-width: 25rem;
      }
    }

    .price p {
      font-size: 3.2rem;
    }

    .quantity-include {
      button:nth-child(2) {
        padding: 0.4rem 2.4rem;
      }
    }
  }
`;
