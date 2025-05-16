import { useState, useMemo } from "react";
import { useGetRequests } from "../../api/routes/getRequest";
import { useUpdateRequestStatus } from "../../api/routes/patchStatusForRequest";
import * as S from "./styled";
import {
  Pagination,
  Box,
  CircularProgress,
  TextField,
  MenuItem,
  IconButton,
  Modal,
  Typography,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface Request {
  id?: string;
  protocol: string;
  status: string;
  name: string;
  description: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  zipcode: string;
  user: {
    name: string;
  };
  createdAt: string;
}

const formatStatus = (status: string): string => {
  return status
    .toLowerCase()
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};

const styleModal = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  outline: "none",
};

const ModeratorPage = () => {
  const { data, isLoading, isError } = useGetRequests();
  const { mutate: updateStatus, isPending } = useUpdateRequestStatus();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState<Request | null>(null);
  const [tempStatus, setTempStatus] = useState<string>("");

  const itemsPerPage = 6;

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleOpenModal = (request: Request) => {
    setEditingRequest(request);
    setTempStatus(request.status);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingRequest(null);
  };

  const handleSaveStatus = () => {
    if (editingRequest?.id) {
      updateStatus({ id: editingRequest.id, data: { status: tempStatus } });
      handleCloseModal();
    }
  };

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((item) => {
      const matchesSearch = item.protocol
        .toString()
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus = statusFilter
        ? item.status.toLowerCase() === statusFilter.toLowerCase()
        : true;

      return matchesSearch && matchesStatus;
    });
  }, [data, search, statusFilter]);

  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  if (isLoading)
    return (
      <S.Loading>
        <CircularProgress />
        <span style={{ marginLeft: 8 }}>Carregando solicitações...</span>
      </S.Loading>
    );
  if (isError) return <S.Error>Erro ao carregar solicitações</S.Error>;

  return (
    <S.ModeratorPage>
      <S.Title>Solicitações</S.Title>

      <S.FiltersContainer>
        <TextField
          label="Buscar por Protocolo"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <TextField
          label="Filtrar por Status"
          variant="outlined"
          size="small"
          select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="PENDENTE">Pendente</MenuItem>
          <MenuItem value="EM_ANDAMENTO">Em Andamento</MenuItem>
          <MenuItem value="CONCLUIDO">Concluído</MenuItem>
          <MenuItem value="CANCELADO">Cancelado</MenuItem>
        </TextField>
      </S.FiltersContainer>

      <S.CardsContainer>
        {paginatedData.map((request) => (
          <S.Card key={request.protocol}>
            <S.CardHeader>
              <S.Protocol>#{request.protocol}</S.Protocol>
              <S.Status status={request.status}>
                {formatStatus(request.status)}
              </S.Status>
              <IconButton onClick={() => handleOpenModal(request)} size="small">
                <EditIcon fontSize="small" />
              </IconButton>
            </S.CardHeader>

            <S.CardBody>
              <S.Field>
                <S.Label>Nome</S.Label>
                <S.Value>{request.name}</S.Value>
              </S.Field>
              <S.Field>
                <S.Label>Descrição</S.Label>
                <S.Description>{request.description}</S.Description>
              </S.Field>
              <S.AddressContainer>
                <S.Field>
                  <S.Label>Endereço</S.Label>
                  <S.Value>
                    {request.street}, {request.neighborhood}
                  </S.Value>
                </S.Field>
                <S.Field>
                  <S.Label>Cidade/Estado</S.Label>
                  <S.Value>
                    {request.city} - {request.state}
                  </S.Value>
                </S.Field>
                <S.Field>
                  <S.Label>CEP</S.Label>
                  <S.Value>{request.zipcode}</S.Value>
                </S.Field>
              </S.AddressContainer>
            </S.CardBody>

            <S.CardFooter>
              <S.Requester>Solicitado por: {request.user.name}</S.Requester>
              <S.Date>
                Criado em:{" "}
                {new Date(request.createdAt).toLocaleDateString("pt-BR")}
              </S.Date>
            </S.CardFooter>
          </S.Card>
        ))}
      </S.CardsContainer>

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChange}
            color="primary"
          />
        </Box>
      )}

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={styleModal}>
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            fontWeight={600}
            mb={3}
            color="primary"
          >
            Alterar Status da Solicitação
          </Typography>

          <Typography id="modal-description" variant="body2" mb={2}>
            Protocolo: <strong>#{editingRequest?.protocol}</strong>
          </Typography>

          <TextField
            select
            fullWidth
            label="Novo Status"
            value={tempStatus}
            onChange={(e) => setTempStatus(e.target.value)}
            disabled={isPending}
            sx={{ mb: 3 }}
            size="small"
            variant="outlined"
          >
            <MenuItem value="PENDENTE">Pendente</MenuItem>
            <MenuItem value="EM_ANDAMENTO">Em Andamento</MenuItem>
            <MenuItem value="CONCLUIDO">Concluído</MenuItem>
            <MenuItem value="CANCELADO">Cancelado</MenuItem>
          </TextField>

          <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
            <Button
              variant="outlined"
              onClick={handleCloseModal}
              disabled={isPending}
              sx={{ textTransform: "none" }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={handleSaveStatus}
              disabled={isPending || !tempStatus}
              sx={{
                textTransform: "none",
                boxShadow: "none",
                "&:hover": { boxShadow: "none" },
              }}
            >
              {isPending ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Confirmar Alteração"
              )}
            </Button>
          </Box>
        </Box>
      </Modal>
    </S.ModeratorPage>
  );
};

export default ModeratorPage;
