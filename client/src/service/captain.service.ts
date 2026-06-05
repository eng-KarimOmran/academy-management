import { axiosClient } from "@/lib/axios";
import type {
  CreateCaptainDto,
  UpdateCaptainDto,
  DeleteCaptainDto,
  GetAllCaptainsDto,
} from "@/DTOs/captain.dto";
import type { PaginatedResponse, SuccessfulResponse } from "@/types/axios";
import type { Captain } from "@/types/captain";
import type { Transmission } from "@/types/enums";

const bassUrl = "/captain";

export const getAllCaptains = (data: GetAllCaptainsDto) => {
  const query = `${bassUrl}?page=${data.page ?? 1}&limit=${data.limit ?? 10}&search=${data.search ?? ""}`;
  return axiosClient.get<PaginatedResponse<Captain>>(query);
};

export const getCaptain = (id: string) =>
  axiosClient.get<SuccessfulResponse<Captain>>(`${bassUrl}/${id}`);

export const createCaptain = (data: CreateCaptainDto) =>
  axiosClient.post<SuccessfulResponse<Captain>>(bassUrl, data);

export const updateCaptain = (id: string, data: UpdateCaptainDto) =>
  axiosClient.patch<SuccessfulResponse<Captain>>(`${bassUrl}/${id}`, data);

export const deleteCaptain = (data: DeleteCaptainDto) =>
  axiosClient.delete<SuccessfulResponse<null>>(`${bassUrl}/${data.id}`);

export const getActiveCaptain = ({ type }: { type: Transmission }) =>
  axiosClient.get<SuccessfulResponse<Captain[]>>(
    `${bassUrl}/active?type=${type}`,
  );
