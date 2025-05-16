import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";

const baseMenuItemStyles = css<{ $isDrawer: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 12px 20px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.text.inverted};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &.active {
    color: ${({ theme }) => theme.colors.disabled};
    font-weight: 500;
  }

  ${({ $isDrawer }) =>
    $isDrawer &&
    css`
      width: 100%;
      text-align: center;
      color: ${({ theme }) => theme.colors.text.primary};

      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }

      &.active {
        color: ${({ theme }) => theme.colors.text.inverted};
      }
    `}
`;

export const MenuContainer = styled.div<{ $isDrawer: boolean }>`
  display: flex;
  align-items: center;
`;

export const MenuList = styled.ul<{ $isDrawer: boolean }>`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2px;

  ${({ $isDrawer }) =>
    $isDrawer &&
    css`
      flex-direction: column;
      gap: 15px;
      padding: 20px;
      width: 100%;
    `}

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    ${({ $isDrawer }) =>
      !$isDrawer &&
      css`
        display: none;
      `}
  }
`;

export const NavLinkItem = styled(NavLink)<{ $isDrawer: boolean }>`
  ${baseMenuItemStyles}
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.text.inverted};
    transition: width 0.3s ease;
  }

  &:hover::after,
  &.active::after {
    width: 100%;
  }

  ${({ $isDrawer }) =>
    $isDrawer &&
    css`
      &::after {
        background: ${({ theme }) => theme.colors.text.inverted};
      }
    `}
`;

export const ScrollLinkItem = styled(Link)<{ $isDrawer: boolean }>`
  ${baseMenuItemStyles}
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.text.inverted};
    transition: width 0.3s ease;
  }

  &:hover::after,
  &.active::after {
    width: 100%;
  }

  ${({ $isDrawer }) =>
    $isDrawer &&
    css`
      &::after {
        background: ${({ theme }) => theme.colors.primary};
      }
    `}
`;

export const MenuText = styled.span`
  position: relative;
  z-index: 1;
  font-size: 1rem;
  font-weight: 400;
  transition: all 0.3s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.2rem;
  }
`;
