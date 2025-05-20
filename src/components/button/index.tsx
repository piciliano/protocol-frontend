import * as S from "./styled";
import { ButtonProps } from "./types";

const StyledButton: React.FC<ButtonProps> = ({
  children,
  $variant = "primary",
  ...rest
}) => {
  return (
    <S.Button $variant={$variant} {...rest}>
      {children}
    </S.Button>
  );
};

export default StyledButton;
