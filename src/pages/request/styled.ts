import styled from "styled-components";

export const RequestContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.default};
  margin: 0 auto;
  min-height: calc(100vh - 7rem);
  max-width: 1200px;
  padding: 2rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  margin-top: 1rem;
  margin-bottom: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0rem;
    border-radius: 0;
    margin-top: 0;
    margin-bottom: 0rem;
  }
`;
