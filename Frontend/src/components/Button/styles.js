import styled from 'styled-components';

// Estilização do componente Container usando styled-components
export const Container = styled.button`
  /* Define a cor de fundo baseada na prop toDelete */
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
  transition: all 0.3s;

  /* Muda a cor de fundo ao passar o mouse */
  &:hover {
    background-color: ${({ theme }) => theme.COLORS.TOMATO_HOVER};
  }

  /* Elemento decorativo para animações ou transições */
  &:after {
    content: "";
    position: absolute;
    z-index: -1;
    transition: all 0.3s;
  }

  /* Ajuste visual para suavização de fonte */
  &:before {
    position: relative;
    -webkit-font-smoothing: antialiased;
  }

  /* Ajusta a posição ao clicar */
  &:active {
    top: 1px;
  }

  /* Estiliza a imagem dentro do botão */
  img {
    width: 2.1rem;
    height: 2.1rem;
  }
`;
