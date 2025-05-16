import * as S from "./styled";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

const Footer = () => {
  return (
    <S.FooterContainer>
      <S.FooterContent>
        <S.FooterSection>
          <S.Logo></S.Logo>
          <S.SocialIcons>
            <S.SocialLink href="#" aria-label="Facebook">
              <FaFacebook />
            </S.SocialLink>
            <S.SocialLink href="#" aria-label="Instagram">
              <FaInstagram />
            </S.SocialLink>
            <S.SocialLink href="#" aria-label="LinkedIn">
              <FaLinkedin />
            </S.SocialLink>{" "}
            <S.SocialLink
              href="https://wa.me/5511999999999"
              aria-label="WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </S.SocialLink>
          </S.SocialIcons>
        </S.FooterSection>

        <S.FooterSection>
          <S.SectionTitle>Links Rápidos</S.SectionTitle>
          <S.FooterLink href="#">Home</S.FooterLink>
          <S.FooterLink href="#">Sobre Nós</S.FooterLink>
          <S.FooterLink href="#">Serviços</S.FooterLink>
          <S.FooterLink href="#">Contato</S.FooterLink>
        </S.FooterSection>

        <S.FooterSection>
          <S.SectionTitle>Contatos</S.SectionTitle>
          <S.ContactItem>
            <MdPhone />
            <span>(11) 99999-9999</span>
          </S.ContactItem>
          <S.ContactItem>
            <MdEmail />
            <span>contato@empresa.com</span>
          </S.ContactItem>
          <S.ContactItem>
            <MdLocationOn />
            <span>Atalaia, 1000 - Atalaia/AL</span>
          </S.ContactItem>
        </S.FooterSection>
      </S.FooterContent>

      <S.FooterBottom>
        <S.Copyright>
          © {new Date().getFullYear()} Prefeitura de Atalaia. Todos os direitos
          reservados.
        </S.Copyright>
      </S.FooterBottom>
    </S.FooterContainer>
  );
};

export default Footer;
