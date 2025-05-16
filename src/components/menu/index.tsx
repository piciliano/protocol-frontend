import { useEffect, useState } from "react";
import * as S from "./styled";
import { FiHome, FiMail, FiInfo, FiArchive } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  role: string;
}

const Menu = ({
  $isDrawer,
  onItemClick,
}: {
  $isDrawer: boolean;
  onItemClick?: () => void;
}) => {
  const [logged, setLogged] = useState<string | null>(null);
  const [isModerator, setIsModerator] = useState(false);
  const location = useLocation();

  const handleClick = () => {
    onItemClick?.();
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenProtocolApp");
    setLogged(token);

    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        if (decoded.role === "MODERATOR") {
          setIsModerator(true);
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    }
  }, []);

  return (
    <S.MenuContainer $isDrawer={$isDrawer}>
      <S.MenuList $isDrawer={$isDrawer}>
        <S.NavLinkItem $isDrawer={$isDrawer} to="/" end onClick={handleClick}>
          <FiHome size={16} className="menu-icon" />
          <S.MenuText>Início</S.MenuText>
        </S.NavLinkItem>

        {logged && (
          <S.NavLinkItem
            $isDrawer={$isDrawer}
            to="/request"
            onClick={handleClick}
          >
            <FiMail size={16} className="menu-icon" />
            <S.MenuText>Solicitar</S.MenuText>
          </S.NavLinkItem>
        )}

        {location.pathname !== "/request" && (
          <S.ScrollLinkItem
            $isDrawer={$isDrawer}
            to="about"
            spy={true}
            smooth={true}
            duration={500}
            offset={-70}
            onClick={handleClick}
          >
            <FiInfo size={16} className="menu-icon" />
            <S.MenuText>Sobre</S.MenuText>
          </S.ScrollLinkItem>
        )}

        {isModerator && (
          <S.NavLinkItem $isDrawer={$isDrawer} to="/mod">
            <FiArchive size={16} className="menu-icon" />
            <S.MenuText>Moderador</S.MenuText>
          </S.NavLinkItem>
        )}
      </S.MenuList>
    </S.MenuContainer>
  );
};

export default Menu;
