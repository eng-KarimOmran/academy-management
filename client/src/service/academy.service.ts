import type {
  CreateAcademyDto,
  DeleteAcademyDto,
  GetAllAcademiesDto,
  UpdateAcademyDto,
} from "@/DTOs/academy.dto";
import { axiosClient } from "@/lib/axios";
import type { Academy, AcademyDetails } from "@/types/academy";
import type { PaginatedResponse, SuccessfulResponse } from "@/types/axios";

const bassUrl = "/academy";

export const getAllAcademies = (data: GetAllAcademiesDto) => {
  const query: string = `${bassUrl}?page=${data.page ?? 1}&limit=${data.limit ?? 10}&search=${data.search ?? ""}`;
  return axiosClient.get<PaginatedResponse<Academy>>(query);
};

export const createAcademy = (data: CreateAcademyDto) => {
  return axiosClient.post<SuccessfulResponse<Academy>>(bassUrl, data);
};

export const deleteAcademy = (data: DeleteAcademyDto) =>
  axiosClient.delete<SuccessfulResponse<null>>(`${bassUrl}/${data.academyId}`);

export const updateAcademy = (data: UpdateAcademyDto) => {
  const { academyId, ...body } = data;
  return axiosClient.patch<SuccessfulResponse<Academy>>(
    `${bassUrl}/${academyId}`,
    body,
  );
};

export const getAcademy = (id: string) =>
  axiosClient.get<SuccessfulResponse<AcademyDetails>>(
    `${bassUrl}/details/${id}`,
  );
