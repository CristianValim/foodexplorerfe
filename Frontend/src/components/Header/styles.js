import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 11.4rem;
  padding-top: 4.2rem;
  padding-inline: 1.6rem;
  background-color: ${({ theme }) => theme.COLORS.DARK_700};

  .logo-wrapp {
    display: flex;
    align-items: center;
    margin-inline: auto;
    gap: 0.8rem;
    font-family: ${({ theme }) => theme.FONTS.SECONDARY};
    font-size: 1.2rem;
    color: ${({ theme }) => theme.COLORS.CAKE_200};

    pointer-events: none;
    .logo {
      max-width: 16rem;
    }
  }

  .cart {
    background-color: ${({ theme }) => theme.COLORS.DARK_700};
    min-width: 4.8rem;
    min-height: 4.8rem;
    border-radius: 0.5rem;
    position: relative;

    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;

    &:active {
      transform: scale(1.1);
    }

    .badge {
      display: grid;
      place-content: center;

      font-size: 1.2rem;

      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      position: absolute;
      top: .3rem;
      right: 1rem;
      background-color: ${({ theme }) => theme.COLORS.TOMATO_100};
    }
  }

  form,
  .desktop,
  .signout {
    display: none;
  }

  @media (min-width: 600px) {
    min-height: 10.4rem;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    padding: 0;
    padding-inline: 10%;

    .hamburguer {
      display: none;
    }

    form {
      display: block;
      position: relative;
      width: 70%;

      button {
        position: absolute;
        bottom: 50%;
        transform: translateY(50%);
        left: 20%;
      }

      .textInput {
        input {
          width: 100%;
          padding-left: 25%;
        }
      }
    }

    .cart {
      background-color: ${({ theme }) => theme.COLORS.TOMATO_100};
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.8rem;

      min-width: 21.6rem;
      min-height: 5.6rem;

      .desktop {
        display: block;
      }

      .badge {
        position: relative;
        inset: 0;
      }
    }

    .signout {
      display: block;

      button {
        min-width: 4.8rem;
        min-height: 4.8rem;
        display: grid;
        place-content: center;
        border-radius: 0.5rem;
      }
    }
  }
`;
