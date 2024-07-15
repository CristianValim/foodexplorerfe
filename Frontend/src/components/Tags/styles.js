import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme, isNew }) =>
    isNew ? theme.COLORS.DARK_800 : theme.COLORS.LIGHT_600};

  border: ${({ theme, isNew }) =>
    isNew ? `1px dashed ${theme.COLORS.LIGHT_500}` : "none"};
  display: flex;
  border-radius: 0.8rem;

  input {
    padding: 1rem 0.5rem;
    color: ${({ theme, isNew }) =>
      isNew ? theme.COLORS.LIGHT_500 : theme.COLORS.LIGHT_100};
    width: 100%;
    &:focus {
      outline: none;
    }
  }

  button {
    cursor: pointer;
    background: transparent;
    padding-right: 0.5rem;
    &:focus {
      outline: none;
    }
  }

  @media (min-width: 600px){
    input {
      padding: .8rem 1.5rem;
  }
  }
`;
