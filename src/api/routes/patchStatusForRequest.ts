import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../apiConfig/apiClient";

interface UpdateRequestStatus {
  id: string;
  data: {
    status: string;
  };
}

export const updateRequestStatus = async ({
  id,
  data,
}: UpdateRequestStatus): Promise<Request> => {
  const response = await apiClient.patch<Request>(`/request/${id}`, data);
  return response.data;
};

export const useUpdateRequestStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<Request, Error, UpdateRequestStatus>({
    mutationFn: updateRequestStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
  });
};
