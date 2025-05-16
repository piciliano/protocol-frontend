import styled from "styled-components";
import { Card, Box } from "@mui/material";

export const StyledCard = styled(Card)<{ $secondary?: boolean }>`
  max-width: ${({ $secondary }) => ($secondary ? "200px" : "400px")};

  border-radius: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05), 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  position: relative;
  background: ${({ theme }) => theme.colors.background.default};
  border: 1px solid ${({ theme }) => theme.colors.border};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ theme }) => theme.colors.primary};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.1),
      0px 12px 28px rgba(0, 0, 0, 0.15);
    border-color: ${({ theme }) => theme.colors.primaryLight};

    &::before {
      opacity: 1;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 100%;
    width: ${({ $secondary }) => ($secondary ? "300px" : "")};
    border-radius: 12px;
  }
`;

export const AddressBox = styled(Box)<{
  statuscolor: string;
  $secondary?: boolean;
}>`
  margin-top: 16px;
  padding: ${({ $secondary }) => ($secondary ? "10px" : "16px")};
  background: linear-gradient(
    to right,
    ${({ statuscolor, theme }) => `${statuscolor || theme.colors.primary}10`},
    ${({ theme }) => theme.colors.background.alt}
  );
  border-radius: 12px;
  border-left: ${({ $secondary, statuscolor }) =>
    $secondary ? "none" : `4px solid ${statuscolor || "#1976d2"}`};
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 4px;
    background: ${(props) => props.statuscolor || "#1976d2"};
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: ${({ $secondary }) => ($secondary ? "none" : "translateX(4px)")};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

    &::before {
      transform: ${({ $secondary }) =>
        $secondary ? "scaleY(0)" : "scaleY(1)"};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 12px;
    border-radius: 8px;
  }
`;
