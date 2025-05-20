import styled from "styled-components";

export const ModeratorPage = styled.div`
  background-color: ${({ theme }) => theme.colors.background.default};
  margin: 0 auto;
  min-height: calc(100vh - 7rem);
  max-width: 1200px;
  padding: 2rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  margin-top: 1rem;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 1rem;
    border-radius: 0;
    margin-top: 0;
  }
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 2rem;
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.background.alt};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.12);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background.alt};
`;

export const Protocol = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Status = styled.span<{ $status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: none;

  background-color: ${({ $status, theme }) => {
    switch ($status.toLowerCase()) {
      case "pendente":
        return theme.colors.feedback.warning;
      case "em_andamento":
        return theme.colors.primaryLight;
      case "concluido":
        return theme.colors.feedback.success;
      case "cancelado":
        return theme.colors.feedback.error;
      default:
        return theme.colors.disabled;
    }
  }};

  color: ${({ $status, theme }) => {
    switch ($status.toLowerCase()) {
      case "pendente":
        return theme.colors.text.primary;
      default:
        return theme.colors.text.inverted;
    }
  }};
`;

export const CardBody = styled.div`
  padding: 1.5rem;
`;

export const Field = styled.div`
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Label = styled.span`
  display: block;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Value = styled.span`
  display: block;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 500;
`;

export const Description = styled(Value)`
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const AddressContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.default};
  padding: 1rem;
  border-radius: 6px;
  margin-top: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const CardFooter = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background.alt};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Date = styled.span`
  display: block;
  text-align: right;
`;

export const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Error = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.feedback.error};
  font-weight: 500;
`;

export const Requester = styled.span`
  display: block;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 4px;
`;

export const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;

  > * {
    flex: 1;
    min-width: 200px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 1rem;
  }
`;
