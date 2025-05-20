import { useMutation, UseMutationResult } from "@tanstack/react-query";
import apiClient from "../apiConfig/apiClient";

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

type RegisterResponseData = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export const RegisterUser = async (
  data: RegisterData
): Promise<RegisterResponseData> => {
  const response = await apiClient.post<RegisterResponseData>("/user", data);
  return response.data;
};

export const useRegister = (): UseMutationResult<
  RegisterResponseData,
  Error,
  RegisterData,
  unknown
> => {
  return useMutation({
    mutationFn: RegisterUser,

    onError: (error) => {
      console.error("Erro no registro:", error);
    },
  });
};
