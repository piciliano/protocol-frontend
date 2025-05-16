import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { StyledIconButton, StyledDrawer, DrawerContent } from "./styled";
import Menu from "../menu";

const DrawerComponent = () => {
  const [open, setOpen] = useState(false);

  const handleMenuClick = () => {
    setOpen(false);
  };

  return (
    <>
      <StyledIconButton onClick={() => setOpen(true)} aria-label="Abrir menu">
        <FiMenu size={28} />
      </StyledIconButton>

      <StyledDrawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <DrawerContent>
          <div className="drawer-header">
            <StyledIconButton
              onClick={() => setOpen(false)}
              className="close-btn"
              aria-label="Fechar menu"
            >
              <FiX size={28} />
            </StyledIconButton>
          </div>
          <Menu $isDrawer={true} onItemClick={handleMenuClick} />
        </DrawerContent>
      </StyledDrawer>
    </>
  );
};

export default DrawerComponent;
