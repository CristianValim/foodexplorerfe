import styled from "styled-components";

export const Container = styled.div`
  color: ${({ theme }) => theme.COLORS.FONT_400};
  font-family: ${({ theme }) => theme.FONTS.SECONDARY};
  font-size: 1.6rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.8rem;
  width: 100%;
  border-radius: 0.8rem;

  label.textInput {
    display: grid;
    gap: 0.8rem;
  }

  input.textInput {
    color: ${({ theme }) => theme.COLORS.FONT_400};
    padding: 1.6rem 1.4rem;
    margin-bottom: 2.4rem;
    border: none;
    border-radius: 0.8rem;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
    &::placeholder {
      color: ${({ theme }) => theme.COLORS.FONT_200};
    }
  }


    
    @media (min-width: 600px) {
      color: ${({ theme }) => theme.COLORS.FONT_100};

      input.textInput {
      max-width: 45rem;}


    }
`;


