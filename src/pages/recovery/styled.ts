import styled from "styled-components";

export const RecoveryContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.alt};
  margin: 0 auto;
  min-height: calc(100vh - 7rem);
  width: 100%;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 1rem;
  }
`;

export const StepContent = styled.div`
  margin-top: 2rem;
`;
