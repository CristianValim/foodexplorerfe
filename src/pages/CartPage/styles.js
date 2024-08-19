import styled from "styled-components";

export const Container = styled.div`
  min-height: calc(100svh - 22rem);
  max-width: 1200px;
  margin-inline: 10% ;
  padding-top: 3.6rem;

  h1, h2 {
    margin-top: 1rem;
    font-size: 2rem;
    text-align: center;
    color: ${({ theme }) => theme.COLORS.FONT_400};
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${({ theme }) => theme.COLORS.BACKGROUND_100};
    padding: 1rem 0;
    margin-bottom: 1rem;

    color: ${({ theme }) => theme.COLORS.FONT_600};
    font-size: 1.5rem;
  }

  .itemImage {
    max-width: 10rem;
    border-radius: 50%;
    object-fit: cover;
  }

  .description {
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
      font-weight: 500;
      color: ${({ theme }) => theme.COLORS.FONT_400};
      font-size: 1.6rem;
    }
  }

.quantityControls {
display: flex;
align-items: center;
gap: 1rem;
  .quantityButtons {
    display: grid;
    place-content: center;
    width: 4.8rem;
    height: 4.8rem;
  }
}

.cartTotal {
  margin-bottom: 2rem;
  font-size: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.COLORS.FONT_400};
}

@media(min-width: 600px) {
  margin-inline: auto;

  ul {
    max-width: 120rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1rem;

    li {
      width: 28rem;
    }
  }

  
}
`;

export const CustomConfirmAlert = styled.div`
  font-family: Roboto;

  background: #000a0f;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 1);

  h1 {
    font-size: 1.6rem;
  }

  .buttons {
    margin-top: 2rem;
    display: flex;
    justify-content: space-evenly;
    font-size: 1.4rem;

    button {
      position: relative;
      background-color: #750310;

      padding: 1.2rem 2rem;
      border-radius: 0.6rem;
      color: white;

      &:first-child {
        background-color: #0d161b;
      }

      &:hover {
        background-color: #600208;
      }
      &:active {
        top: 1px;
      }
    }
  }
`;
