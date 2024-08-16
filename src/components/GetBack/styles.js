import styled from "styled-components";

export const Container = styled.button`
    color: ${({ theme }) => theme.COLORS.FONT_600};
    img {
      width: 3.2rem;
      height: 3.2rem;
    }
    font-size: 2.4rem;
    display: flex;
    align-items: center;
    margin-top: 2rem;
`;