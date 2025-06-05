import { useEffect, useState } from "react";
import * as S from "./styled";
import {
  FiHome,
  FiMail,
  FiInfo,
  FiArchive,
  FiLock,
  FiSearch,
} from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  Modal,
  Box,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import { usePatchRoleByEmail } from "../../api/routes/pathRoleByEmail";

interface JwtPayload {
  role: string;
}

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: 1,
  width: { xs: "90%", sm: 400, md: 500 },
  maxWidth: 500,
  outline: "none",
};

const Menu = ({
  $isDrawer,
  onItemClick,
}: {
  $isDrawer: boolean;
  onItemClick?: () => void;
}) => {
  const [logged, setLogged] = useState<string | null>(null);
  const [isModerator, setIsModerator] = useState(false);
  const [isAdm, setIsAdm] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"USER" | "MODERATOR" | "ADMIN">("USER");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const location = useLocation();
  const { mutate: updateRoleByEmail, isPending } = usePatchRoleByEmail();

  const handleClick = () => {
    onItemClick?.();
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenProtocolApp");
    setLogged(token);

    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        if (decoded.role === "MODERATOR" || decoded.role === "ADMIN") {
          setIsModerator(true);
        }
        if (decoded.role === "ADMIN") {
          setIsAdm(true);
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    }
  }, []);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setEmail("");
    setRole("USER");
    setOpenModal(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleConfirm = () => {
    if (!email) return;

    updateRoleByEmail(
      { email, role },
      {
        onSuccess: () => {
          setSnackbarMsg("Permissão atualizada com sucesso!");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
          handleCloseModal();
          setTimeout(() => {
            handleClick();
          }, 3000);
        },
        onError: () => {
          setSnackbarMsg("Erro ao atualizar a permissão!");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        },
      }
    );
  };

  return (
    <>
      <S.MenuContainer $isDrawer={$isDrawer}>
        <S.MenuList $isDrawer={$isDrawer}>
          <S.NavLinkItem $isDrawer={$isDrawer} to="/" end onClick={handleClick}>
            <FiHome size={16} className="menu-icon" />
            <S.MenuText>Início</S.MenuText>
          </S.NavLinkItem>

          {logged && (
            <S.NavLinkItem
              $isDrawer={$isDrawer}
              to="/request"
              onClick={handleClick}
            >
              <FiMail size={16} className="menu-icon" />
              <S.MenuText>Solicitar</S.MenuText>
            </S.NavLinkItem>
          )}

          {location.pathname === "/" && (
            <S.ScrollLinkItem
              $isDrawer={$isDrawer}
              to="about"
              spy={true}
              smooth={true}
              duration={500}
              offset={-70}
              onClick={handleClick}
            >
              <FiInfo size={16} className="menu-icon" />
              <S.MenuText>Sobre</S.MenuText>
            </S.ScrollLinkItem>
          )}

          {isModerator && (
            <S.NavLinkItem
              $isDrawer={$isDrawer}
              to="/mod"
              onClick={handleClick}
            >
              <FiArchive size={16} className="menu-icon" />
              <S.MenuText>Moderador</S.MenuText>
            </S.NavLinkItem>
          )}

          {isAdm && (
            <S.NavLinkItem
              as={"button"}
              $isDrawer={$isDrawer}
              to="#"
              onClick={() => {
                handleOpenModal();
              }}
            >
              <FiLock size={16} className="menu-icon" />
              <S.MenuText>Permissão</S.MenuText>
            </S.NavLinkItem>
          )}
        </S.MenuList>
      </S.MenuContainer>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <h3 id="modal-title">Definir Permissão</h3>

          <TextField
            autoFocus
            fullWidth
            margin="dense"
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FiSearch />
                </InputAdornment>
              ),
            }}
            id="modal-description"
          />

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="role-label">Permissão</InputLabel>
            <Select
              labelId="role-label"
              id="role-select"
              value={role}
              label="Permissão"
              onChange={(e) =>
                setRole(e.target.value as "USER" | "MODERATOR" | "ADMIN")
              }
            >
              <MenuItem value="USER">Usuário</MenuItem>
              <MenuItem value="MODERATOR">Moderador</MenuItem>
              <MenuItem value="ADMIN">Administrador</MenuItem>
            </Select>
          </FormControl>

          <Box
            sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}
          >
            <Button onClick={handleCloseModal} color="secondary">
              Cancelar
            </Button>
            <Button
              onClick={handleConfirm}
              variant="contained"
              color="primary"
              disabled={isPending || !email}
            >
              {isPending ? "Enviando..." : "Confirmar"}
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbarSeverity}
          onClose={handleSnackbarClose}
          variant="filled"
          sx={{
            backgroundColor:
              snackbarSeverity === "success" ? "#4caf50 !important" : undefined,
            color:
              snackbarSeverity === "success" ? "#fff !important" : undefined,
          }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Menu;
