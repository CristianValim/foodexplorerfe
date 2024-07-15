import styled from "styled-components";

export const Container = styled.footer`
  background-color: ${({ theme }) => theme.COLORS.DARK_700};
  padding: 3rem;
  text-align: center;
  position: relative;
  bottom: 0;
  
  section {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
        font-size: 1.2rem;
    }

    p:first-child {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: .65rem;

        font-family: ${({ theme }) => theme.FONTS.SECONDARY};
        font-size: 1.5rem;
        font-weight: 700;
        color: ${({theme}) => theme.COLORS.LIGHT_700};

        img {
          max-width: 2rem;
        }
    }

    &:hover {
      cursor: default;
    }

    @media (min-width: 600px) {
      padding-inline: 10%;

      p {
        font-size: 1.4rem;
      }

      p:first-child {
        font-size: 2.4rem;
      }
    }
  }
`;