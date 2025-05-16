import { useState, ChangeEvent } from "react";
import { CloudUpload } from "@mui/icons-material";
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

    postRequestMutation.mutate({
      ...formData,
    });
  };

  return (
    <S.FormContainer>
      <S.StyledForm onSubmit={handleSubmit}>
        <S.TwoColumnLayout>
          <S.LeftColumn>
            <S.FormGroup>
              <S.FormLabel>Problema*</S.FormLabel>
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
              />
            </S.FormGroup>

            <S.FormGroup>
              <S.FormLabel>Estado*</S.FormLabel>
              <S.FormSelect
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
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
  );
};

export default FormRequest;
