import styled from "styled-components";

export const Container = styled.button`
  background-color: ${({ toDelete, theme }) =>
    toDelete ? theme.COLORS.DARK_800 : theme.COLORS.TOMATO_100};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  padding: 1.2rem;
  width: 100%;
  border-radius: 0.6rem;

  position: relative;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.COLORS.TOMATO_HOVER};
  }

  &:after {
    content: "";
    position: absolute;
    z-index: -1;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
  }

  &:before {
    position: relative;
    -webkit-font-smoothing: antialiased;
  }

  &:active {
    top: 1px;
  }

  img {
    width: 2.1rem;
    height: 2.1rem;
  }
`;
