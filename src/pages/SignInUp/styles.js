import styled from "styled-components";

export const Container = styled.div`
  /* Layout base */
  margin-inline: 10%;

  .logo {
    width: 100%;
    max-width: 32.5rem;
    padding-top: 16rem;
    padding-bottom: 7.5rem;
  }

  .wrapper {
    position: relative;
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
    color: ${({ theme }) => theme.COLORS.FONT_400};
    font-size: 1.4rem;
    margin-inline: auto;
  }

  .DarkModeSwitch {
    position: fixed;
    bottom: 3rem;
    right: 2rem;
  }
  /* Layout para telas maiores */
  @media (min-width: 600px) {
    min-height: 100dvh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    a {
    color: ${({ theme }) => theme.COLORS.FONT_100};
    font-size: 1.4rem;
    margin-inline: auto;
  }
    .logo {
      margin-inline: auto;
      padding: 0;
    }

    .auto {
      margin-inline: auto;
    }

    .wrapper {
      background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
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
    .DarkModeSwitch {
    position: absolute;
    bottom: 3rem;
    right: 2rem;
  }
  }
`;
