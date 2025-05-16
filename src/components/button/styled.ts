import styled, { css } from "styled-components";
import { ButtonProps } from "./types";

export const Button = styled.button<ButtonProps>`
  width: 100%;
  padding: 14px;
  margin: 16px 0;
  border: none;
  border-radius: 6px;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  ${({ variant = "primary", theme }) => {
    switch (variant) {
      case "secondary":
        return css`
          background-color: ${theme.colors.button.secondary};
          color: ${theme.colors.text.primary};

          &:hover {
            background-color: ${theme.colors.button.secondaryHover};
          }
          &:active {
            background-color: ${theme.colors.button.secondaryActive};
          }
        `;
      default:
        return css`
          background-color: ${theme.colors.button.primary};
          color: ${theme.colors.text.inverted};

          &:hover {
            background-color: ${theme.colors.button.primaryHover};
          }
          &:active {
            background-color: ${theme.colors.button.primaryActive};
          }
        `;
    }
  }}

  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabled};
    color: ${({ theme }) => theme.colors.text.inverted};
    cursor: not-allowed;
  }

  @media (max-width: 1300px) {
    width: 100%;
  }
`;
