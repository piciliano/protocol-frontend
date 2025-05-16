import styled from "styled-components";

export const MenuLoginContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  position: relative;
`;

export const Button = styled.button`
  padding: 0.3rem;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.primaryDark};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text.inverted};
  font-size: 0.95rem;
  font-weight: 500;
  font-family: ${({ theme }) => theme.fonts.primary};
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text.secondary};
    border: 1px solid ${({ theme }) => theme.colors.text.inverted};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.primaryDark};
    border-color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const TitleLogged = styled.p`
  color: ${({ theme }) => theme.colors.text.inverted};
  margin: 0;
`;
