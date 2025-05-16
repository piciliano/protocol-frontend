import * as S from "./styled";
import Image from "../../assets/atalaiahd.jpg";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import Input from "../../components/input";
import StyledButton from "../../components/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { registerSchema, RegisterFormData } from "../../schemas/register";
import { useRegister } from "../../api/routes/register";

const RegisterPage = () => {
  const [backendError, setBackendError] = useState("");

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

    registerMutate(data, {
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
          />
          {errors.confirmPassword && (
            <S.ErrorMessage>{errors.confirmPassword.message}</S.ErrorMessage>
          )}
        </S.FormGroup>

        <S.FormGroup>
          <StyledButton type="submit" variant="primary" disabled={isPending}>
            {isPending ? "Carregando..." : "Registrar"}
          </StyledButton>
        </S.FormGroup>

        {backendError && <S.ErrorMessage>{backendError}</S.ErrorMessage>}

        <S.FooterText>
          Já tem conta? Faça o <S.Link href="/login">Login</S.Link>
        </S.FooterText>
      </S.LoginForm>
    </S.Container>
  );
};

export default RegisterPage;
