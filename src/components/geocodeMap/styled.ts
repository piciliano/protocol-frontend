import styled from "styled-components";

export const MapContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text.inverted || "#2c3e50"};
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
  background: ${({ theme }) => theme.colors.text.inverted || "#2c3e50"};
  margin: 0 auto 20px;
  border-radius: 2px;
`;

export const ContainerColor = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 1.5rem;
`;
