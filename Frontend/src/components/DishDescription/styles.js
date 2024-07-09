import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.COLORS.DARK_400};
  padding: 3.6rem 10% 5.5rem;
  font-size: 1.4rem;
  min-height: 79dvh;

  .getBack {
    img {
      width: 3.2rem;
      height: 3.2rem;
    }

    font-size: 2.4rem;
    display: flex;
    align-items: center;
  }

  .dishPicture {
    padding-inline: 2.6rem;
    margin: 1.6rem auto;
  }

  h1 {
    font-size: 2.4rem;
    margin-bottom: 2.4rem;
  }

  p,
  h1 {
    text-align: center;
    }

  .tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2.5rem;
  margin-block: 2.4rem 4.8rem;
    li {
    flex-grow: ;
      background-color: ${({ theme }) => theme.COLORS.DARK_1000};
      padding: 0.4rem 0.8rem;
      border-radius: 0.5rem;
    }
  }

  .place-order {
    display: flex;
    gap: 1.6rem;

    button {
      font-size: 1.2rem;
      max-width: 16rem;
    }
  }
  @media (min-width: 600px) {
    padding: 2.4rem 12rem 15rem;

    .dishPicture {
      margin: 4rem 5rem 0 0;
      max-width: 39rem;
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

      .place-order {
        margin-top: 4.8rem;
      }
    }
  }
`;

export const LoadingContainer = styled.div`
  height: 79dvh;
  display: grid;
  place-content: center;
`;
