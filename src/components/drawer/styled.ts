import styled from "styled-components";
import { IconButton, Drawer } from "@mui/material";

export const StyledDrawer = styled(Drawer)`
  .MuiBackdrop-root {
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
  }

  & .MuiPaper-root {
    width: 220px;
    background: ${({ theme }) => theme.colors.primary || "#2c3e50"};
    box-shadow: 2px 0 20px rgba(0, 0, 0, 0.2);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    .MuiBackdrop-root {
      display: none;
    }
  }
`;

export const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  color: white;

  .drawer-header {
    display: flex;
    justify-content: flex-end;
    padding: 16px;
  }
`;

export const StyledIconButton = styled(IconButton)`
  color: white !important;
  margin: 8px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
    background: rgba(255, 255, 255, 0.1) !important;
  }

  &.close-btn {
    margin-left: auto;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    && {
      display: none;
    }
  }
`;
