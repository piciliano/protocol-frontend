import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.alt};
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.uw}) {
    max-width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

export const Image = styled.img`
  width: 65%;
  height: 100vh;
  object-fit: cover;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 40px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 35%;
  padding: 3rem 2rem;
  background-color: ${({ theme }) => theme.colors.background.default};
  box-shadow: -4px 0 30px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    height: 100vh;
    padding: 2rem 1.5rem;
  }
`;

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 2.5rem;
  font-size: 2.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    font-size: 2rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  margin: 8px 0 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background-color: ${({ theme }) => theme.colors.background.default};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primaryTransparent};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
    opacity: 0.7;
  }
`;

export const Label = styled.label`
  width: 100%;
  margin: 8px 0 6px;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: left;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 500;
`;

export const FormGroup = styled.div`
  width: 50%;
  margin-bottom: 1.25rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 80%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }
`;

export const FormGroupCheckbox = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 1.5rem;
  user-select: none;

  input[type="checkbox"] {
    accent-color: ${({ theme }) => theme.colors.primary};
    width: 18px;
    height: 18px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  label {
    cursor: pointer;
    transition: color 0.2s ease;
  }

  &:hover {
    label {
      color: ${({ theme }) => theme.colors.text.primary};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
  }
`;

export const FooterText = styled.p`
  margin-top: 2.5rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  line-height: 1.6;

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-weight: 600;
    transition: all 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.primaryDark};
      text-decoration: underline;
    }
  }
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.feedback.error};
  font-size: 0.85rem;
  margin: -0.5rem 0 0.75rem;
  display: block;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.colors.feedback.errorBackground};
  border-radius: 6px;
  border-left: 3px solid ${({ theme }) => theme.colors.feedback.error};
  animation: fadeIn 0.3s ease-out;
  line-height: 1.4;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ServerErrorMessage = styled(ErrorMessage)`
  width: 30%;
  text-align: center;
  margin: 1rem 0 0;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 500;

  &::before {
    content: "⚠";
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Link = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
    text-decoration: underline;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

export const SuccessMessage = styled.div`
  color: ${({ theme }) => theme.colors.feedback.success};
  font-size: 0.95rem;
  margin: 0 0 1.5rem;
  padding: 12px 16px;
  background-color: rgba(46, 204, 113, 0.1);
  border-radius: 6px;
  border-left: 3px solid ${({ theme }) => theme.colors.feedback.success};
  display: flex;
  align-items: center;
  animation: fadeIn 0.3s ease-out;
  text-align: center;
  justify-content: center;
  gap: 8px;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
