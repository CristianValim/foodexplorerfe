import styled from "styled-components";

export const Container = styled.section`
  position: fixed;
  overflow: hidden;
  z-index: 1000;
  inset: 0;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_500};
  font-size: 2.4rem;

  .menu-header {
    display: flex;
    align-items: center;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
    font-family: ${({ theme }) => theme.FONTS.SECONDARY};
    min-height: 11.4rem;
    padding-top: 4.2rem;
    padding-inline: 1.6rem;
    font-size: 2.1rem;
    margin-bottom: auto;
  }
  .search-container {
    margin-bottom: 3.6rem;
    li {
      outline: none;

    }
  }

  main {
    color: ${({ theme }) => theme.COLORS.FONT_600};
    display: grid;
    margin: 3.6rem 2.8rem;
  }

  span {
    margin-block: 1rem;
    outline: 1px solid ${({ theme }) => theme.COLORS.BACKGROUND_100};
  }

  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  .godmode {
    display: flex;
    gap: 1rem;
    align-items: center;

    .switch {
      margin-left: auto;
    }
  }
`;
