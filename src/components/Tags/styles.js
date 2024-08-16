import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme, isnew }) => (isnew ? "transparent" : theme.COLORS.TAGS_BACKGROUND)};
  background-image: ${({ isnew }) => 
    isnew 
      ? `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%237C7C8AFF' stroke-width='3' stroke-dasharray='5' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")` 
      : 'transparent'};

  border-radius: 8px;
  display: flex;
  
  input {
    padding: 1rem 0.5rem;
    color: ${({ theme, isnew }) => (isnew ? theme.COLORS.FONT_100 : theme.COLORS.FONT_800)};
    width: 100%;
    &:focus {
      outline: none;
    }
    color: ${({theme}) => theme.COLORS.FONT_100};

  }

  button {
    display: grid;
    place-content: center;
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
