import styled from "styled-components";

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const InputIcon = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.text.secondary};
  pointer-events: none;
`;

export const StyledInput = styled.input<{ $withIcon?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  margin: 8px 0 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 0.9rem;
  transition: all 0.3s ease;

  padding-left: ${({ $withIcon }) => ($withIcon ? "40px" : "16px")};

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

export const InputWithIcon = styled(StyledInput)`
  padding-left: 40px;
`;
