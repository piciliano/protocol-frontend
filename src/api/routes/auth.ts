import { useMutation, UseMutationResult } from "@tanstack/react-query";
import apiClient from "../apiConfig/apiClient";

type LoginData = {
  email: string;
  password: string;
};

type LoginResponseData = {
  accessToken: string;
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
      if (data.accessToken) {
        localStorage.setItem("tokenProtocolApp", data.accessToken);
      }
    },
    onError: (error) => {
      console.error("Erro no login:", error);
    },
  });
};
