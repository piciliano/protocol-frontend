import styled from "styled-components";

export const HomeContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.default};
  margin: 0 auto;
  min-height: 100vh;
  max-width: 1920px;
`;

export const RequestContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
`;

export const ContainerTitleAndRequest = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 1220px;
  margin: 0 auto;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    padding-top: 1rem;
  }
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary || "#2c3e50"};
  font-size: 2.8rem;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Divider = styled.div`
  width: 100px;
  height: 4px;
  background: ${({ theme }) => theme.colors.primary || "#2c3e50"};
  margin: 0 auto 40px;
  border-radius: 2px;
`;

export const ImageBanner = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  margin-bottom: 1rem;

  @media (max-width: 576px) {
    display: none;
  }
`;
