import styled from "styled-components";
import Aleatory from "../../assets/atalaiaaleatorio.jpg";

export const AboutContainer = styled.section`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background.default};
  padding: 80px 20px;
  position: relative;
  overflow: hidden;
`;

export const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
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

export const Description = styled.p`
  color: #333;
  font-size: 1.1rem;
  line-height: 1.8;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 40px;
  position: relative;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 15px;
  }

  @media (max-width: 768px) {
    text-align: justify;
  }
`;

export const Highlight = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary || "#2c3e50"};
  display: inline;
`;

export const CityImage = styled.div`
  position: absolute;
  bottom: -50px;
  right: -50px;
  width: 300px;
  height: 300px;
  background: url(${Aleatory}) no-repeat center/cover;
  opacity: 0.2;
  z-index: 1;

  @media (max-width: 768px) {
    display: none;
  }
`;
