import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.alt};

  @media (max-width: 1921px) {
    max-width: 2560px;
  }

  @media (max-width: 900px) {
    display: block;
  }
`;

export const Image = styled.img`
  width: 65%;
  height: 100vh;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 900px) {
    display: none;
  }
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 35%;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.background.default};
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.05);

  @media (max-width: 900px) {
    width: 100%;
    height: 100vh;
  }
`;

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 500;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  margin: 8px 0 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryTransparent};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
    opacity: 0.6;
  }

  @media (max-width: 1300px) {
    width: 100%;
  }
`;

export const Label = styled.label`
  width: 100%;
  margin: 8px 0 4px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: left;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 500;
`;

export const FormGroup = styled.div`
  width: 50%;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    width: 80%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }

  @media (max-width: 1300px) {
    width: 100%;
  }
`;

export const FooterText = styled.p`
  margin-top: 2rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text.secondary};

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 0.8rem;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
  display: block;
`;

export const Link = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;
