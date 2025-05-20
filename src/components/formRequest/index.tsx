import { useState, ChangeEvent } from "react";
import { CloudUpload, CheckCircleOutline } from "@mui/icons-material";
import { Modal, Box, Typography } from "@mui/material";
import * as S from "./styled";
import { usePostRequestWithPhoto } from "../../api/routes/postRequest";

const FormRequest = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    neighborhood: "",
    street: "",
    city: "Atalaia",
    state: "AL",
    zipcode: "57690000",
    files: [] as File[],
  });

  const [previews, setPreviews] = useState<string[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [protocolNumber, setProtocolNumber] = useState<string | null>(null);
  const postRequestMutation = usePostRequestWithPhoto();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData((prev) => ({ ...prev, files: [...prev.files, ...files] }));

      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Dados sendo enviados:", formData);

    postRequestMutation.mutate(
      { ...formData },
      {
        onSuccess: (response) => {
          setProtocolNumber(response.protocol);
          setShowSuccessModal(true);

          setFormData({
            name: "",
            description: "",
            neighborhood: "",
            street: "",
            city: "Atalaia",
            state: "AL",
            zipcode: "57690000",
            files: [],
          });
          setPreviews([]);
        },
      }
    );
  };

  return (
    <>
      <S.FormContainer>
        <S.StyledForm onSubmit={handleSubmit}>
          <S.TwoColumnLayout>
            <S.LeftColumn>
              <S.FormGroup>
                <S.FormLabel>Título*</S.FormLabel>
                <S.FormInput
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </S.FormGroup>

              <S.FormGroup>
                <S.FormLabel>CEP*</S.FormLabel>
                <S.FormInput
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={handleChange}
                  required
                  disabled
                />
              </S.FormGroup>

              <S.FormGroup>
                <S.FormLabel>Estado*</S.FormLabel>
                <S.FormSelect
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  disabled
                >
                  <option value="">Selecione</option>
                  <option>AL</option>
                </S.FormSelect>
              </S.FormGroup>

              <S.FormGroup>
                <S.FormLabel>Cidade*</S.FormLabel>
                <S.FormInput
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  disabled
                />
              </S.FormGroup>

              <S.FormGroup>
                <S.FormLabel>Bairro*</S.FormLabel>
                <S.FormInput
                  name="neighborhood"
                  value={formData.neighborhood}
                  onChange={handleChange}
                  required
                />
              </S.FormGroup>

              <S.FormGroup>
                <S.FormLabel>Rua*</S.FormLabel>
                <S.FormInput
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  required
                />
              </S.FormGroup>
            </S.LeftColumn>

            <S.RightColumn>
              <S.FormGroup>
                <S.FormLabel>Descrição*</S.FormLabel>
                <S.FormTextarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </S.FormGroup>

              <S.FormGroup>
                <S.FormLabel>Anexar Fotos</S.FormLabel>
                <S.FileUploadLabel>
                  <CloudUpload />
                  <span>Clique ou arraste arquivos</span>
                  <S.FileUploadInput
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                  />
                </S.FileUploadLabel>

                {previews.length > 0 && (
                  <S.PreviewContainer>
                    {previews.map((preview, index) => (
                      <S.PreviewImage key={index}>
                        <img src={preview} alt={`Preview ${index}`} />
                      </S.PreviewImage>
                    ))}
                  </S.PreviewContainer>
                )}
              </S.FormGroup>

              <S.SubmitButton
                type="submit"
                disabled={postRequestMutation.isPending}
              >
                {postRequestMutation.isPending
                  ? "Enviando..."
                  : "Enviar Solicitação"}
              </S.SubmitButton>
            </S.RightColumn>
          </S.TwoColumnLayout>
        </S.StyledForm>
      </S.FormContainer>

      <Modal open={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
          <CheckCircleOutline sx={{ fontSize: 60, color: "green" }} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Solicitação enviada com sucesso!
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Protocolo: <strong>{protocolNumber}</strong>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default FormRequest;
