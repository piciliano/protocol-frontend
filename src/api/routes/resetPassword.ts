import { useMutation, UseMutationResult } from "@tanstack/react-query";
import apiClient from "../apiConfig/apiClient";

type BodyData = {
  newPassword: string;
};

type ResponseData = {
  message: string;
};

export const resetPassword = async (data: BodyData): Promise<ResponseData> => {
  const response = await apiClient.post<ResponseData>(
    "/user/reset-password",
    data
  );
  return response.data;
};

export const useResetPassword = (): UseMutationResult<
  ResponseData,
  Error,
  BodyData,
  unknown
> => {
  return useMutation({
    mutationFn: resetPassword,
  });
};
