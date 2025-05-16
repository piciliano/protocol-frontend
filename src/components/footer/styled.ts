// Footer/styled.js
import styled from "styled-components";

export const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.primary};
  color: #ecf0f1;
  padding: 3rem 0 0;
  width: 100%;

  @media (max-width: 600px) {
    padding: 2rem 0 0;
  }
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 0 1.5rem;
    gap: 1rem;
  }
`;

export const FooterSection = styled.div`
  margin-bottom: 2rem;

  @media (max-width: 600px) {
    margin-bottom: 1.5rem;

    &:not(:first-child) {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 1.5rem;
    }
  }
`;

export const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text.inverted};
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50px;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.text.inverted};
  }

  @media (max-width: 600px) {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
`;

export const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text.inverted};

  @media (max-width: 600px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 600px) {
    justify-content: center;
  }
`;

export const SocialLink = styled.a`
  color: #ecf0f1;
  font-size: 1.5rem;
  transition: color 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
  }

  @media (max-width: 600px) {
    font-size: 1.3rem;
  }
`;

export const FooterLink = styled.a`
  display: block;
  color: #bdc3c7;
  margin-bottom: 0.8rem;
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
    padding-left: 5px;
  }

  @media (max-width: 600px) {
    margin-bottom: 0.6rem;
  }
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
  color: #bdc3c7;

  svg {
    color: ${({ theme }) => theme.colors.text.inverted};
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  span {
    word-break: break-word;
  }

  @media (max-width: 600px) {
    gap: 0.6rem;
    margin-bottom: 0.8rem;
    font-size: 0.9rem;
  }
`;

export const WhatsAppButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background-color: #25d366;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s;
  margin-top: 1rem;
  width: fit-content;

  &:hover {
    background-color: #128c7e;
    transform: translateY(-2px);
  }

  svg {
    font-size: 1.5rem;
  }

  @media (max-width: 900px) {
    width: 100%;
    justify-content: center;
  }

  @media (max-width: 600px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;

    svg {
      font-size: 1.3rem;
    }
  }
`;

export const FooterBottom = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1.5rem 0;
  text-align: center;
  margin-top: 2rem;

  @media (max-width: 600px) {
    padding: 1rem 0;
    margin-top: 1rem;
  }
`;

export const Copyright = styled.p`
  margin: 0;
  color: #bdc3c7;
  font-size: 0.9rem;

  @media (max-width: 600px) {
    font-size: 0.8rem;
    padding: 0 1rem;
  }
`;
