import styled from "styled-components";

// Estilização do contêiner principal
export const Container = styled.div`
  background-color: ${({ theme }) => theme.COLORS.DARK_400};
  padding: 3.6rem 10% 5.5rem;
  font-size: 1.4rem;
  min-height: 79dvh;
  display: grid;
  place-content: center;

  // Estilização do botão de voltar
  .getBack {
    img {
      width: 3.2rem;
      height: 3.2rem;
    }
    font-size: 2.4rem;
    display: flex;
    align-items: center;
  }

  // Estilização da imagem do prato
  .dishPicture {
    margin: 1.6rem auto;
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 50%;
  }

  // Estilização do título (nome do prato)
  h1 {
    font-size: 2.4rem;
    margin-bottom: 2.4rem;
    font-weight: 500;
    text-align: center;
  }

  // Estilização da descrição do prato
  p {
    font-weight: 300;
    text-align: center;
  }

  // Estilização das tags do prato
  .tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2.5rem;
    margin-block: 2.4rem 4.8rem;
    li {
      background-color: ${({ theme }) => theme.COLORS.DARK_1000};
      padding: 0.4rem 0.8rem;
      border-radius: 0.5rem;
    }
  }

  // Estilização do contêiner de fazer pedido
  .place-order {
    justify-content: space-between;

    button {
      font-size: 1.2rem;
      max-width: 16rem;
    }
  }

  // Estilos específicos para telas maiores
  @media (min-width: 600px) {
    padding: 2.4rem 12rem 15rem;

    .dishPicture {
      margin: 4rem 5rem 0 0;
      max-width: 50rem;
      width: 100%;
    }

    .place-order {
      justify-content: start;
      gap: 3.3rem;
    }

    .description {
      display: flex;
      align-items: center;
      justify-content: center;

      .text {
        max-width: 70rem;
      }

      .text h1,
      p {
        text-align: start;
        margin-bottom: 2.4rem;
      }

      .text h1 {
        font-size: 4rem;
      }

      .text p {
        font-size: 2.4rem;
      }
    }
  }

  // Estilização do botão de editar prato
  .edit-dish button {
    max-width: 15rem;

    @media (max-width: 600px) {
      margin: ${({ isAdmin }) => (isAdmin ? "0" : "auto")};
    }
  }
`;

// Estilização do contêiner de carregamento
export const LoadingContainer = styled.div`
  height: 79dvh;
  display: grid;
  place-content: center;
`;
