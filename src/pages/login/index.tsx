import * as S from "./styled";
import Image from "../../assets/atalaiahd.jpg";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import Input from "../../components/input";
import StyledButton from "../../components/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../api/routes/auth";
import { schema, FormData } from "../../schemas/login";
import { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

const SECRET_KEY = "minha_chave_super_secreta";

const LoginPage = () => {
  const [backendError, setBackendError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const navigate = useNavigate();
  const { mutate: loginMutate, isPending } = useLogin();

  useEffect(() => {
    const savedEmail = localStorage.getItem("remember_email");
    const savedPasswordEncrypted = localStorage.getItem("remember_password");
    const savedRemember = localStorage.getItem("remember_me");

    if (savedRemember === "true") {
      if (savedEmail) setValue("email", savedEmail);
      if (savedPasswordEncrypted) {
        try {
          const bytes = CryptoJS.AES.decrypt(
            savedPasswordEncrypted,
            SECRET_KEY
          );
          const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
          setValue("password", decryptedPassword);
        } catch {
          localStorage.removeItem("remember_password");
        }
      }
      setRememberMe(true);
    }
  }, [setValue]);

  const onSubmit = (data: FormData) => {
    setBackendError("");

    loginMutate(data, {
      onSuccess: () => {
        if (rememberMe) {
          localStorage.setItem("remember_email", data.email);
          const encryptedPassword = CryptoJS.AES.encrypt(
            data.password,
            SECRET_KEY
          ).toString();
          localStorage.setItem("remember_password", encryptedPassword);
          localStorage.setItem("remember_me", "true");
        } else {
          localStorage.removeItem("remember_email");
          localStorage.removeItem("remember_password");
          localStorage.removeItem("remember_me");
        }

        navigate("/");
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message || "Erro no login, tente novamente!";
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
          Bem-vindo
        </S.Title>

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

        <S.FormGroupCheckbox>
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label htmlFor="remember">Lembrar-me</label>
        </S.FormGroupCheckbox>

        <S.FormGroup>
          <StyledButton type="submit" variant="primary" disabled={isPending}>
            {isPending ? "Carregando..." : "Entrar"}
          </StyledButton>
        </S.FormGroup>

        {backendError && <S.ErrorMessage>{backendError}</S.ErrorMessage>}

        <S.FooterText>
          Não tem uma conta? <S.Link href="/register">Cadastre-se</S.Link> ou
          navegue até o <S.Link href="/">Início</S.Link>
        </S.FooterText>
        <S.FooterText>
          Esqueceu a senha? <S.Link href="/recovery">Recupere aqui</S.Link>
        </S.FooterText>
      </S.LoginForm>
    </S.Container>
  );
};

export default LoginPage;
