import styled from "styled-components";
import uploadIcon from "../../assets/icons/Upload.svg";

// Container principal estilizado usando styled-components
export const Container = styled.div`
  color: ${({ theme }) => theme.COLORS.LIGHT_400};
  font-family: ${({ theme }) => theme.FONTS.SECONDARY};
  font-size: 1.6rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.8rem;
  width: 100%;
  border-radius: 0.8rem;
  position: relative;

  // Estilo para o label do input de arquivo
  .fileInputLabel {
    padding: 1.6rem 1.4rem;
    margin-bottom: 2.4rem;
    border: none;
    border-radius: 0.8rem;
    background-color: ${({ theme }) => theme.COLORS.DARK_800};
    background-image: url(${uploadIcon});
    background-repeat: no-repeat;
    background-position: 3rem 50%;
    padding-left: 6.5rem;
    font-family: ${({ theme }) => theme.FONTS.MAIN};
    font-size: 1.4rem;
    color: ${({ theme }) => theme.COLORS.LIGHT_100};
    font-weight: 500;
    cursor: pointer;
    position: relative;
    display: block;

    &:hover {
      background-color: ${({ theme }) => theme.COLORS.DARK_900};
    }
  }

  // Estilo para o input de arquivo, escondido visualmente
  .fileInput {
    display: none;
  }

  // Estilo para o preview da imagem selecionada
  .image-preview {
    position: absolute;
    top: calc(100% - 2rem);
    right: 0;
    background-color: ${({ theme }) => theme.COLORS.DARK_800};
    padding: 0.5rem;
    border-radius: 0.5rem;
    z-index: 10;

    img {
      max-width: 15rem;
      max-height: 15rem;
      display: block;
      transition: all 1s;
    }
  }
`;
