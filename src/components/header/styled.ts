import styled from "styled-components";

export const HeaderContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
`;

export const Logo = styled.img`
  width: 100px;
  height: 90px;
  object-fit: contain;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;
