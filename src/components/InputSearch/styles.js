import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  z-index: 9999;

  .searchIcon {
    position: absolute;
    left: 1.4rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.COLORS.FONT_100};
    pointer-events: none;
  }

  input {
    
    width: 100%;
    padding: 1.6rem 4.4rem 1.6rem 5.2rem;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
    border: none;
    border-radius: 0.8rem;
    color: ${({ theme }) => theme.COLORS.FONT_100};
    font-size: 1.6rem;
    font-family: ${({ theme }) => theme.FONTS.SECONDARY};
    &::placeholder {
      color: ${({ theme }) => theme.COLORS.FONT_100};
    }
  }

  .search-results {
    position: absolute;
    top: 4.5rem;
    left: 0;
    right: 0;
    max-height: 20rem;
    overflow-y: auto;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
    border-radius: 0 0 0.5rem 0.5rem;
    z-index: 1000;

    &:focus {
      border: 1px solid white;
    }
  }

  .search-results li {
    padding: 8px 16px;
    cursor: pointer;
    color: ${({ theme }) => theme.COLORS.FONT_100};

    span {
      outline: none;
    }
  }

  @media (min-width: 600px) {
      font-size: 2.4rem;
  }
`;
