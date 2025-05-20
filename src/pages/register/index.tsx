import * as S from "./styled";
import Image from "../../assets/atalaiahd.jpg";
import { FiMail, FiLock, FiUser, FiCheckCircle } from "react-icons/fi";
import Input from "../../components/input";
import StyledButton from "../../components/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { registerSchema, RegisterFormData } from "../../schemas/register";
import { useRegister } from "../../api/routes/register";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [backendError, setBackendError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const { mutate: registerMutate, isPending } = useRegister();

  const onSubmit = (data: RegisterFormData) => {
    setBackendError("");
    setIsSuccess(false);

    registerMutate(data, {
      onSuccess: () => {
        setIsSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message ||
          "Erro no registro, tente novamente!";
        setBackendError(message);
      },
    });
  };

  return (
    <S.Container>
      <S.Image src={Image} alt="Background" />
      <S.LoginForm onSubmit={handleSubmit(onSubmit)}>
        <S.Title>
          <FiUser style={{ marginRight: "10px", verticalAlign: "middle" }} />
          Crie sua conta
        </S.Title>

        <S.FormGroup>
          <S.Label htmlFor="name">Nome</S.Label>
          <Input
            id="name"
            type="text"
            placeholder="Digite seu nome"
            icon={<FiUser />}
            {...register("name")}
            disabled={isPending || isSuccess}
          />
          {errors.name && (
            <S.ErrorMessage>{errors.name.message}</S.ErrorMessage>
          )}
        </S.FormGroup>

        <S.FormGroup>
          <S.Label htmlFor="email">E-mail</S.Label>
          <Input
            id="email"
            type="email"
            placeholder="Digite seu e-mail"
            icon={<FiMail />}
            {...register("email")}
            disabled={isPending || isSuccess}
          />
          {errors.email && (
            <S.ErrorMessage>{errors.email.message}</S.ErrorMessage>
          )}
        </S.FormGroup>

        <S.FormGroup>
          <S.Label htmlFor="password">Senha</S.Label>
          <Input
            id="password"
            type="password"
            placeholder="Digite sua senha"
            icon={<FiLock />}
            {...register("password")}
            disabled={isPending || isSuccess}
          />
          {errors.password && (
            <S.ErrorMessage>{errors.password.message}</S.ErrorMessage>
          )}
        </S.FormGroup>

        <S.FormGroup>
          <S.Label htmlFor="confirmPassword">Confirme a Senha</S.Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirme sua senha"
            icon={<FiLock />}
            {...register("confirmPassword")}
            disabled={isPending || isSuccess}
          />
          {errors.confirmPassword && (
            <S.ErrorMessage>{errors.confirmPassword.message}</S.ErrorMessage>
          )}
        </S.FormGroup>

        <S.FormGroup>
          <StyledButton
            type="submit"
            $variant="primary"
            disabled={isPending || isSuccess}
          >
            {isPending ? "Carregando..." : isSuccess ? "Sucesso!" : "Registrar"}
          </StyledButton>
        </S.FormGroup>

        {isSuccess && (
          <S.SuccessMessage>
            <FiCheckCircle style={{ marginRight: "8px" }} />
            Registro realizado com sucesso! Redirecionando para login...
          </S.SuccessMessage>
        )}

        {backendError && (
          <S.ServerErrorMessage>{backendError}</S.ServerErrorMessage>
        )}

        <S.FooterText>
          Já tem conta? Faça o <S.Link href="/login">Login</S.Link>
        </S.FooterText>
      </S.LoginForm>
    </S.Container>
  );
};

export default RegisterPage;
