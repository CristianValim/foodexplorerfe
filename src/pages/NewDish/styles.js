import styled from "styled-components";
import Select_down from "../../assets/icons/Select_down.svg";

export const Container = styled.div`
  font-family: ${({ theme }) => theme.FONTS.SECONDARY};
  min-height: calc(100svh - 22rem);
  padding: 2rem 0 5.3rem;
  margin-inline: 10%;
  color: ${({ theme }) => theme.COLORS.FONT_400};


  h1 {
    font-family: ${({ theme }) => theme.FONTS.MAIN};
    margin-block: 2.4rem;
    font-size: 3.2rem;
  }
  #dishCategory select {
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
  }

  .dishCategory,
  .inputPriceLabel,
  .tagsLabel,
  .description, .dishName {
    font-size: 1.6rem;
    font-family: ${({ theme }) => theme.FONTS.SECONDARY};
    color: ${({ theme }) => theme.COLORS.FONT_600};

    .categoryOptions,
    .inputPrice,
    textarea {
      width: 100%;
      color: ${({ theme }) => theme.COLORS.FONT_100};
      padding: 1.6rem 1.4rem;
      margin: 0.8rem auto 2.4rem;

      border: none;
      border-radius: 0.8rem;
      background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
      resize: none;
      &::placeholder {
        color: ${({ theme }) => theme.COLORS.FONT_100};
      }
    }

    select {
      cursor: pointer;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      background-image: url(${Select_down});
      background-repeat: no-repeat;
      background-position: right 1.6rem center;
    }

    .tagsSection {
      color: ${({ theme }) => theme.COLORS.FONT_100};
      background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
      border-radius: 0.8rem;

      padding: 1.6rem 1.4rem;
      margin: 0.8rem auto 2.4rem;

      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.6rem;
    }
  }

  @media (min-width: 600px) {
    form {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 3rem;

      .tagsLabel {
        grid-column: span 2;

        .tagsSection {
          padding: 0.8rem;
        }
      }

      .description {
        grid-column: span 3;
      }

      button {
        grid-column-start: 3;
        max-width: 18rem;
        margin-left: auto;
      }
    }
`;
