import Menu from "../menu";
import * as S from "./styled";
import LoginMeenu from "../loginMenu";
import LOGO from "../../assets/atalaiahd-remove.png";
import DrawerComponent from "../drawer";

const Header = () => {
  return (
    <S.HeaderContainer>
      <DrawerComponent />
      <S.Logo src={LOGO} alt="Logo" />
      <Menu $isDrawer={false} />
      <LoginMeenu />
    </S.HeaderContainer>
  );
};

export default Header;
