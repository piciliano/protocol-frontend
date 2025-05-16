import { useMutation, UseMutationResult } from "@tanstack/react-query";
import apiClient from "../apiConfig/apiClient";

export enum RequestStatus {
  PENDENTE = "PENDENTE",
  EM_ANDAMENTO = "EM_ANDAMENTO",
  CONCLUIDO = "CONCLUIDO",
  CANCELADO = "CANCELADO",
}

export const RequestStatusLabels: Record<RequestStatus, string> = {
  [RequestStatus.PENDENTE]: "Pendente",
  [RequestStatus.EM_ANDAMENTO]: "Em andamento",
  [RequestStatus.CONCLUIDO]: "Concluído",
  [RequestStatus.CANCELADO]: "Cancelado",
};

export interface RequestPhoto {
  id: string;
  url: string;
  requestId: string;
  createdAt: string;
}

export interface RequestResponseData {
  id: string;
  name: string;
  description: string;
  status: RequestStatus;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  zipcode: string;
  protocol: string;
  userId?: string;
  createdAt: string;
  updatedAt: string;
  files: RequestPhoto[];
}

export type RequestFormData = {
  name: string;
  description: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  zipcode: string;
  userId?: string;
  files: File[];
};

export const postRequestWithPhoto = async (
  data: RequestFormData
): Promise<RequestResponseData> => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("street", data.street);
  formData.append("neighborhood", data.neighborhood);
  formData.append("city", data.city);
  formData.append("state", data.state);
  formData.append("zipcode", data.zipcode);

  if (data.userId) {
    formData.append("userId", data.userId);
  }

  data.files.forEach((photo) => {
    formData.append("files", photo);
  });

  const response = await apiClient.post<RequestResponseData>(
    "/request/with-photo",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const usePostRequestWithPhoto = (): UseMutationResult<
  RequestResponseData,
  Error,
  RequestFormData,
  unknown
> => {
  return useMutation({
    mutationFn: postRequestWithPhoto,
    onSuccess: (data) => {
      console.log("Requisição criada com sucesso:", data);
    },
    onError: (error) => {
      console.error("Erro ao criar requisição:", error);
    },
  });
};
