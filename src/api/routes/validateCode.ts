import { useMutation, UseMutationResult } from "@tanstack/react-query";
import apiClient from "../apiConfig/apiClient";

type BodyData = {
  code: string;
};

type ResponseData = {
  message: string;
};

export const ValidateCode = async (data: BodyData): Promise<ResponseData> => {
  const response = await apiClient.post<ResponseData>(
    "/user/validate-code",
    data
  );
  return response.data;
};

export const useValidateCode = (): UseMutationResult<
  ResponseData,
  Error,
  BodyData,
  unknown
> => {
  return useMutation({
    mutationFn: ValidateCode,
  });
};
