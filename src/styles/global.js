import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  /* Tamanho da fonte */
  :root {
    font-size: 62.5%;
  }

  /* Tamanho da caixa e reset de margens e preenchimentos */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font: inherit;
  }

  /* Remover estilos padrão dos inputs */
  input {
    border: none;
    background-color: transparent;
  }

  /* Estilos para o corpo */
  body {
    min-height: 100svh;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_500};
    font-family: ${({ theme }) => theme.FONTS.MAIN};
    color: #FFFAF1;
    position: relative;
  }

  /* Imagens e mídia responsivas */
  img,
  picture,
  video {
    display: block;
    max-width: 100%;
  }

  /* Estilos específicos para imagens */
  img {
    height: auto;
    vertical-align: middle;
    font-style: italic;
    background-repeat: no-repeat;
    background-size: cover;
    shape-margin: 0.75rem;
  }

  /* Melhorar a pontuação no suporte de navegadores */
  html {
    hanging-punctuation: first last;
  }

  /* Estilos para cabeçalhos */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    text-wrap: balance;
  }

  /* Melhorar legibilidade de parágrafos e listas */
  ul {
    list-style: none;
  }

  p,
  li {
    max-width: var(--p-max-width, 65ch);
    text-wrap: pretty;
  }

  /* Estilos para links */
  a {
    text-decoration: none;
    color: inherit;
  }

  /* Estilos para botões */
  button {
    font-weight: medium;
    color: ${({ theme }) => theme.COLORS.FONT_800};
    font-size: 1.4rem;
    line-height: 2.4rem;
    border: none;
    background: inherit;

    &:hover {
      cursor: pointer;
    }
  }

  /* Estilos de foco para inputs, botões e links */
  input:focus,
  button:focus,
  a:focus {
    outline: 1px solid ${({ theme }) => theme.COLORS.FONT_800};
  }
`;
