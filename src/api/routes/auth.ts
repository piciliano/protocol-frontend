import { useMutation, UseMutationResult } from "@tanstack/react-query";
import apiClient from "../apiConfig/apiClient";

type LoginData = {
  email: string;
  password: string;
};

type LoginResponseData = {
  access_token: string;
};

export const loginUser = async (
  data: LoginData
): Promise<LoginResponseData> => {
  const response = await apiClient.post<LoginResponseData>("/auth/login", data);
  return response.data;
};

export const useLogin = (): UseMutationResult<
  LoginResponseData,
  Error,
  LoginData,
  unknown
> => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data.access_token) {
        localStorage.setItem("tokenProtocolApp", data.access_token);
      }
    },
    onError: (error) => {
      console.error("Erro no login:", error);
    },
  });
};
