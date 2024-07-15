import styled from "styled-components";

export const Container = styled.div`
  margin-bottom: 0.2rem;
  line-height: 1;
  display: flex;
  align-items: center;
  font-size: 2rem;

  button {
    display: grid;
    place-content: center;
    width: 4.8rem;
    height: 4.8rem;
    position: relative;
    transition: all 0.3s;

    &:after {
      content: "";
      position: absolute;
      z-index: -1;
      transition: all 0.3s;
    }

    &:before {
      position: relative;
    }

    &:active {
      top: 2px;
    }
  }

  .disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  span {
    width: 2.5rem;
    display: grid;
    place-content: center;
  }
`;
