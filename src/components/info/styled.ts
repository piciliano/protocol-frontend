import styled from "styled-components";

export const InfoContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 40px 20px;
  text-align: center;
`;

export const Title = styled.h2`
  color: #fff;
  font-size: 2.5rem;
  margin-bottom: 50px;
  position: relative;

  &:after {
    content: "";
    display: block;
    width: 80px;
    height: 4px;
    background: #fff;
    margin: 15px auto;
    border-radius: 2px;
  }
`;

export const StepsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const StepItem = styled.div`
  position: relative;
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    background: rgba(255, 255, 255, 0.15);
  }
`;

export const ImageContainer = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #fff;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

export const Image = styled.img`
  width: 100%;
  height: 80%;
  object-fit: contain;
`;

export const ContentText = styled.div`
  background-color: #fff;
  color: ${({ theme }) => theme.colors.primary};
  padding: 12px 20px;
  border-radius: 25px;
  font-weight: 600;
  text-align: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
`;

export const StepNumber = styled.span`
  position: absolute;
  top: -15px;
  left: -15px;
  width: 40px;
  height: 40px;
  background: #fff;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
`;
