import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  /* makes sizing simpler */
:root {
  font-size        : 62.5%;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}
input{
    border: none;
    background-color: transparent;
  }
/* remove default spacing */
/* force styling of type through styling, rather than elements */
* {
  margin: 0;
  padding: 0;
  font: inherit;
}

/* dark mode user-agent-styles */
/* improves punctuation in supported browsers */
html {
  hanging-punctuation: first last;
}

/* min body height */
body {
  min-height: 100svh;
  background-color: ${({ theme }) => theme.COLORS.DARK_400};

  font-family: ${({ theme }) => theme.FONTS.MAIN};
  color: ${({ theme }) => theme.COLORS.LIGHT_100};
}

/* responsive images/videos */
img,
picture,
video {
  display: block;
  max-width: 100%;
}

img {
  height: auto;

  vertical-align: middle;
  font-style: italic;

  background-repeat: no-repeat;
  background-size: cover;
  
  shape-margin: 0.75rem;
}

/* Improved heading in supported browsers */
h1,
h2,
h3,
h4,
h5,
h6 {
  text-wrap: balance;
}

/* improve readability with max-width on paragraphs and lists */
/* prevent orphans in supported browsers */
ul {
  list-style: none;
}

p,
li {
  max-width: var(--p-max-width, 65ch);
  text-wrap: pretty;
}

a {
  text-decoration: none;
  color: inherit;
}

button {
  font-weight: medium;
  color: ${({ theme }) => theme.COLORS.LIGHT_100};

  font-size: 1.4rem;
  line-height: 2.4rem;
  
  border: none;
  background: inherit;

  &:hover {
    cursor: pointer;
  }
}

input:focus, button:focus, a:focus {
  outline: 1px solid ${({ theme }) => theme.COLORS.LIGHT_100};
}

`;
