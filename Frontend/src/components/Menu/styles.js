import styled from "styled-components";

export const Container = styled.section`
  position: fixed;
  overflow: hidden;
  z-index: 1000;
  inset: 0;
  background-color: ${({ theme }) => theme.COLORS.DARK_400};

  .menu-header {
    display: flex;
    align-items: center;
    background-color: ${({ theme }) => theme.COLORS.DARK_700};
    font-family: ${({ theme }) => theme.FONTS.SECONDARY};
    min-height: 11.4rem;
    padding-top: 4.2rem;
    padding-inline: 1.6rem;
    font-size: 2.1rem;
    margin-bottom: auto;
  }

  .search {
    position: relative;
    display: grid;
    margin: 3.6rem 2.8rem;
    font-size: 2.4rem;

    .searchButton {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      left: 1.4rem;
      background: none;
      border: none;
      cursor: pointer;
    }

    input {
      margin-bottom: 3.6rem;
      padding-left: 5.2rem;
    }
  }

  span {
    margin-block: 1rem;
    outline: 1px solid ${({ theme }) => theme.COLORS.DARK_1000};
  }

  footer {
    position: absolute;
    width: 100%;
  }

  .godmode {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
