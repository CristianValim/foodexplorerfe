import styled from "styled-components";

export const Container = styled.div`
  margin-inline: 10%;

  .logo {
    width: 100%;
    max-width: 32.5rem;

    padding-top: 16rem;
    padding-bottom: 7.5rem;
  }

  .wrapper {
    display: grid;
    max-width: 50rem;

    h1 {
      display: none;
    }
  }

  button {
    margin-bottom: 3.2rem;
  }

  a {
    font-size: 1.4rem;
    margin-inline: auto;
  }

  @media (min-width: 600px) {
    min-height: 100dvh;

    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    .logo {
      margin-inline: auto;
      padding: 0;
    }

    .auto {
      margin-inline: auto
    }

    .wrapper {
      background-color: ${({ theme }) => theme.COLORS.DARK_700};

      min-width: 48rem;
      padding: 6.4rem;
      border-radius: 1.6rem;

      h1 {
        position: relative;
        display: block;
        font-size: 3.2rem;
        font-weight: 400;
        margin-inline: auto;
        margin-bottom: 3.2rem;
      }
    }
  }
`;
