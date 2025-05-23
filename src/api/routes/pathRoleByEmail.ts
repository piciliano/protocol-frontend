import { useMutation, UseMutationResult } from "@tanstack/react-query";
import apiClient from "../apiConfig/apiClient";

type PatchRoleRequest = {
  email: string;
  role: string;
};

type PatchRoleResponse = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export const patchRoleByEmail = async (
  data: PatchRoleRequest
): Promise<PatchRoleResponse> => {
  const response = await apiClient.patch<PatchRoleResponse>(
    `/user/by-email/${data.email}`,
    { role: data.role }
  );
  return response.data;
};

export const usePatchRoleByEmail = (): UseMutationResult<
  PatchRoleResponse,
  Error,
  PatchRoleRequest,
  unknown
> => {
  return useMutation({
    mutationFn: patchRoleByEmail,

    onError: (error) => {
      console.error("Erro ao atualizar o papel do usuário:", error);
    },
  });
};
