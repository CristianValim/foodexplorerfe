import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 12rem;
  padding-top: 4.2rem;
  padding-inline: 1.6rem;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};

  .logo-wrapp {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-family: ${({ theme }) => theme.FONTS.SECONDARY};
    font-size: 1.2rem;
    color: ${({ theme }) => theme.COLORS.ADMIN};
    .logo {
      max-width: 16rem;
    }
  }

  .cart,
  .newDish {

    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
    color: ${({ theme }) => theme.COLORS.FONT_100};
    min-width: 4.8rem;
    min-height: 4.8rem;
    border-radius: 0.5rem;
    position: relative;
    place-content: center;
    font-size: 1.4rem;
    text-align: center;
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
      right: 0;
      background-color: ${({ theme }) => theme.COLORS.BUTTON_BACKGROUND};
    }
  }

  .godmode {
    gap: 1rem;
    align-items: center;
    font-size: 2.4rem;

    span {
      pointer-events: none;
    }
  }

  .desktop,
  .signout {
    display: none;
  }

  @media (min-width: 600px) {
    min-height: 10rem;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    padding: 0;
    padding-inline: 10%;

    .hamburguer {
      display: none;
    }

    .logo-wrapp {
      flex-direction: column;
      .admin {
        margin-left: auto;
      }
      .logo {
        max-width: 20rem;
      }
    }

    .search-container {
      display: block;
      width: 100%;
    }

    .cart,
    .newDish {
      background-color: ${({ theme }) => theme.COLORS.BUTTON_BACKGROUND};
      border-radius: 0.5rem;
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
