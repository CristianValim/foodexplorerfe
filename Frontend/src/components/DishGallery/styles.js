import styled from "styled-components";

export const Container = styled.div`
  margin-bottom: 2.4rem;
  position: relative;
  width: 100%;
  .swiper-container {
    position: relative;
  }
  &:hover {
    cursor: default;
  }

  .category {
    font-size: 1.8rem;
    font-weight: 600;

    margin-left: 2.4rem;
    margin-bottom: 2.4rem;
  }

  @media (min-width: 600px) {
    .category {
      font-size: 3.2rem;
    }
  }
`;

export const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: linear-gradient(
    to right,
    #00070A 0%,
    rgba(255, 255, 255, 0) 10%,
    rgba(255, 255, 255, 0) 90%,
    #00070A 100%
  );
  z-index: 10;
`;
