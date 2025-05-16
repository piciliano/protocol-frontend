import { StyledInput, InputWrapper, InputIcon } from "./styled";
import { InputProps } from "./types";

const Input = ({ icon, ...props }: InputProps) => {
  return (
    <InputWrapper>
      {icon && <InputIcon>{icon}</InputIcon>}
      <StyledInput {...props} $withIcon={!!icon} />{" "}
    </InputWrapper>
  );
};

export default Input;
