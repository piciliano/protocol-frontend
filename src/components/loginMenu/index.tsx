import { useState, useEffect, useRef } from "react";
import { Avatar, Stack, Menu, MenuItem, IconButton } from "@mui/material";
import { Logout, ArrowDropDown } from "@mui/icons-material";
import * as S from "./styled";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const LoginMenu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("tokenProtocolApp");

    if (token) {
      setIsLoggedIn(true);
      try {
        const decodedToken: any = jwtDecode(token);
        setUserName(decodedToken.name);
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("tokenProtocolApp");
    setIsLoggedIn(false);
    setUserName(null);
    handleMenuClose();
    window.location.reload();
  };

  return (
    <S.MenuLoginContainer ref={menuRef}>
      {isLoggedIn ? (
        <>
          <S.TitleLogged>{userName}</S.TitleLogged>
          <Stack direction="row" spacing={-0.3} alignItems="center">
            <Avatar
              sx={{ width: 36, height: 36 }}
              alt={userName || "Avatar"}
              src="/static/images/avatar/1.jpg"
            />
            <IconButton
              onClick={handleMenuOpen}
              size="small"
              sx={{ color: "white" }}
            >
              <ArrowDropDown />
            </IconButton>
          </Stack>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            disableScrollLock={true}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleLogout}>
              <Logout fontSize="small" sx={{ mr: 1 }} />
              Sair
            </MenuItem>
          </Menu>
        </>
      ) : (
        <S.Button onClick={() => navigate("/login")}>Login</S.Button>
      )}
    </S.MenuLoginContainer>
  );
};

export default LoginMenu;
