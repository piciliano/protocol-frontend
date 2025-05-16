import { useMutation, UseMutationResult } from "@tanstack/react-query";
import apiClient from "../apiConfig/apiClient";

type BodyData = {
  email: string;
};

type ResponseData = {
  message: string;
};

export const recoveryPassword = async (
  data: BodyData
): Promise<ResponseData> => {
  const response = await apiClient.post<ResponseData>(
    "/user/forgot-password",
    data
  );
  return response.data;
};

export const useRecovery = (): UseMutationResult<
  ResponseData,
  Error,
  BodyData,
  unknown
> => {
  return useMutation({
    mutationFn: recoveryPassword,
  });
};
