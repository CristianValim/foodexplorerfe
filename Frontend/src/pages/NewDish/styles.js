import styled from "styled-components";
import Select_down from "../../assets/icons/Select_down.svg"

export const Container = styled.div`
  font-family: ${({ theme }) => theme.FONTS.SECONDARY};

  padding-bottom: 5.3rem;
  margin-inline: 10%;

  .getBack {
    font-size: 1.6rem;
    display: flex;
    align-items: center;
    margin-top: 1.1rem;

    img {
      width: 2.2rem;
      height: 1.5rem;
    }
  }

  h1 {
    font-family: ${({ theme }) => theme.FONTS.MAIN};

    margin-block: 2.4rem;
    font-size: 3.2rem;
  }
  #dishCategory select {
    background-color: ${({ theme }) => theme.COLORS.DARK_900};
  }

  .dishCategory,
  .inputPriceLabel,
  .tagsLabel,
  .description {
    font-size: 1.6rem;
    font-family: ${({ theme }) => theme.FONTS.SECONDARY};
    color: ${({ theme }) => theme.COLORS.LIGHT_400};

    .categoryOptions,
    .inputPrice,
    textarea {
      width: 100%;
      color: ${({ theme }) => theme.COLORS.LIGHT_500};
      padding: 1.6rem 1.4rem;
      margin: 0.8rem auto 2.4rem;

      border: none;
      border-radius: 0.8rem;
      background-color: ${({ theme }) => theme.COLORS.DARK_800};
      resize: none;
      &::placeholder {
        color: ${({ theme }) => theme.COLORS.LIGHT_500};
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
      color: ${({ theme }) => theme.COLORS.LIGHT_500};
      background-color: ${({ theme }) => theme.COLORS.DARK_800};
      border-radius: 0.8rem;

      padding: 1.6rem 1.4rem;
      margin: 0.8rem auto 2.4rem;

      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.6rem;
    }
  }
`;
