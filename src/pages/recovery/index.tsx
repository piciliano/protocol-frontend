import {
  Stepper,
  Step,
  StepLabel,
  StepIconProps,
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Check, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import * as S from "./styled";
import { useTheme } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { useRecovery } from "../../api/routes/forgotPassword";
import { useValidateCode } from "../../api/routes/validateCode";
import { useResetPassword } from "../../api/routes/resetPassword";

const steps = ["Digite seu e-mail", "Insira o código", "Nova senha"];

const CustomStepIcon = (props: StepIconProps) => {
  const { active, completed, icon } = props;
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: completed
          ? theme.palette.success.main
          : active
          ? theme.palette.primary.main
          : "#ccc",
        color: "#fff",
        borderRadius: "50%",
        width: 32,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
      }}
    >
      {completed ? <Check fontSize="small" /> : icon}
    </Box>
  );
};

const RecoveryPage = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { mutate: sendRecoveryEmail, isPending: isSendingEmail } =
    useRecovery();
  const { mutate: validateCode, isPending: isValidatingCode } =
    useValidateCode();
  const { mutate: resetPassword, isPending: isResettingPassword } =
    useResetPassword();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmitEmail = (data: { email: string }) => {
    sendRecoveryEmail(data, {
      onSuccess: () => {
        setCompleted((prev) => ({ ...prev, [activeStep]: true }));
        setActiveStep((prev) => prev + 1);
        setError("");
      },
      onError: (error) => {
        setError(error.message || "Erro ao enviar email");
      },
    });
  };

  const handleValidateCode = () => {
    if (code.length !== 6) {
      setError("O código deve ter 6 dígitos");
      return;
    }

    validateCode(
      { code },
      {
        onSuccess: () => {
          setCompleted((prev) => ({ ...prev, [activeStep]: true }));
          setActiveStep((prev) => prev + 1);
          setError("");
        },
        onError: (error: any) => {
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "Código inválido ou expirado.";
          setError(message);
        },
      }
    );
  };

  const handleResetPassword = () => {
    if (newPassword.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    resetPassword(
      { newPassword },
      {
        onSuccess: () => {
          setCompleted((prev) => ({ ...prev, [activeStep]: true }));
          setError("");
          setSuccessMessage("Senha atualizada com sucesso!");
          setActiveStep((prev) => prev + 1);
        },
        onError: (error: any) => {
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "Erro ao redefinir a senha.";
          setError(message);
        },
      }
    );
  };

  const isLoading = isSendingEmail || isValidatingCode || isResettingPassword;

  const handleNext = () => {
    setError("");
    if (activeStep === 0) {
      if (!validateEmail(email)) {
        setError("Por favor, insira um e-mail válido");
        return;
      }
      handleSubmitEmail({ email });
    } else if (activeStep === 1) {
      handleValidateCode();
    }
  };

  const handleBack = () => {
    setError("");
    setSuccessMessage("");
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const handleGoToLogin = () => {
    window.location.href = "/login";
  };

  return (
    <S.RecoveryContainer>
      <Box
        sx={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: { xs: 2, sm: 4 },
          backgroundColor: theme.palette.background.paper,
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            textAlign: "center",
            marginBottom: 4,
            color: theme.palette.primary.main,
            fontWeight: 600,
          }}
        >
          Redefinição de Senha
        </Typography>

        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{ marginBottom: 4 }}
        >
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepLabel
                StepIconComponent={CustomStepIcon}
                sx={{
                  "& .MuiStepLabel-label": {
                    fontWeight: 500,
                    color:
                      activeStep === index
                        ? theme.palette.primary.main
                        : completed[index]
                        ? theme.palette.success.main
                        : theme.palette.text.secondary,
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        <Box sx={{ marginTop: 4 }}>
          {activeStep === 0 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                Digite o e-mail associado à sua conta para receber o código de
                verificação
              </Typography>
              <TextField
                fullWidth
                label="E-mail"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
              />
            </Box>
          )}

          {activeStep === 1 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                Enviamos um código de 6 dígitos para o e-mail{" "}
                <strong>{email}</strong>.
              </Typography>
              <TextField
                fullWidth
                label="Código de verificação"
                variant="outlined"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ConfirmationNumberIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
              />
            </Box>
          )}

          {activeStep === 2 && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Typography variant="body1" sx={{ textAlign: "center" }}>
                Crie uma nova senha segura para sua conta
              </Typography>
              <TextField
                fullWidth
                label="Nova senha"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
              />
              <TextField
                fullWidth
                label="Confirme a nova senha"
                type={showConfirmPassword ? "text" : "password"}
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                        aria-label="toggle confirm password visibility"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
              />
            </Box>
          )}

          {activeStep === steps.length && (
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Sua senha foi atualizada com sucesso!
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleGoToLogin}
                sx={{ borderRadius: "12px", padding: "10px 24px" }}
              >
                Ir para Login
              </Button>
            </Box>
          )}
        </Box>

        {/* Botões de navegação */}
        {activeStep < steps.length && (
          <Box
            sx={{
              display: "flex",
              justifyContent: activeStep === 0 ? "flex-end" : "space-between",
              marginTop: 4,
            }}
          >
            {activeStep > 0 && (
              <Button
                variant="outlined"
                color="primary"
                onClick={handleBack}
                disabled={isLoading}
                sx={{ borderRadius: "12px", padding: "10px 24px" }}
              >
                Voltar
              </Button>
            )}

            {activeStep < 2 && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={isLoading}
                sx={{
                  borderRadius: "12px",
                  padding: "10px 24px",
                  marginLeft: "auto",
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Próximo"
                )}
              </Button>
            )}

            {activeStep === 2 && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleResetPassword}
                disabled={isLoading}
                sx={{
                  borderRadius: "12px",
                  padding: "10px 24px",
                  marginLeft: "auto",
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Redefinir Senha"
                )}
              </Button>
            )}
          </Box>
        )}
      </Box>
    </S.RecoveryContainer>
  );
};

export default RecoveryPage;
