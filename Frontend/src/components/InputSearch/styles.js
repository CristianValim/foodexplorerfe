import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 3.6rem;
  position: relative;

  .searchIcon {
    position: absolute;
    left: 1.4rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.COLORS.LIGHT_500};
    pointer-events: none;
  }

  input {
    width: 100%;
    padding: 1.6rem 4.4rem 1.6rem 5.2rem;
    background-color: ${({ theme }) => theme.COLORS.DARK_800};
    border: none;
    border-radius: 0.8rem;
    color: ${({ theme }) => theme.COLORS.LIGHT_500};
    font-size: 1.6rem;
    font-family: ${({ theme }) => theme.FONTS.SECONDARY};
    &::placeholder {
      color: ${({ theme }) => theme.COLORS.LIGHT_500};
    }
  }
`;
