import { useQuery } from "@tanstack/react-query";
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

export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
  updatedAt: string;
  createdAt: string;
}

export interface Request {
  id?: string;
  name: string;
  description: string;
  status: RequestStatus;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  zipcode: string;
  protocol?: string;
  userId?: string;
  photos: Photos[];
  createdAt: string;
  secondary?: boolean;
  user?: User;
}

export interface Photos {
  id: string;
  url: string;
  requestId: string;
}

export const getRequests = async (): Promise<Request[]> => {
  const response = await apiClient.get<Request[]>("/request");
  return response.data;
};

export const useGetRequests = () => {
  return useQuery<Request[], Error>({
    queryKey: ["requests"],
    queryFn: getRequests,
  });
};
