import type {
  AddAcademyOwnerDto,
  AddSocialMediaDto,
  CreateAcademyDto,
  DeleteAcademyDto,
  DeleteAcademyOwnerDto,
  DeleteSocialMediaDto,
  GetAllAcademiesDto,
  UpdateAcademyDto,
} from "@/DTOs/academy.dto";
import { axiosClient } from "@/lib/axios";
import type { Academy, AcademyDetails } from "@/types/academy";
import type { PaginatedResponse, SuccessfulResponse } from "@/types/axios";

const baseUrl = "/academies";

export const getAllAcademies = (data: GetAllAcademiesDto) => {
  return axiosClient.get<PaginatedResponse<Academy>>(baseUrl, {
    params: {
      page: data.page ?? 1,
      limit: data.limit ?? 10,
      search: data.search ?? "",
    },
  });
};

export const createAcademy = (data: CreateAcademyDto) => {
  return axiosClient.post<SuccessfulResponse<Academy>>(baseUrl, data);
};

export const deleteAcademy = (data: DeleteAcademyDto) =>
  axiosClient.delete<SuccessfulResponse<null>>(`${baseUrl}/${data.academyId}`);

export const updateAcademy = (data: UpdateAcademyDto) => {
  const { academyId, ...body } = data;
  return axiosClient.patch<SuccessfulResponse<Academy>>(
    `${baseUrl}/${academyId}`,
    body,
  );
};

export const getAcademy = (id: string) =>
  axiosClient.get<SuccessfulResponse<AcademyDetails>>(`${baseUrl}/${id}`);

export const addOwner = (data: AddAcademyOwnerDto) => {
  const { academyId, phone } = data;
  return axiosClient.post<SuccessfulResponse<Academy>>(
    `${baseUrl}/${academyId}/owner`,
    { phone },
  );
};

export const deleteOwner = (data: DeleteAcademyOwnerDto) =>
  axiosClient.delete<SuccessfulResponse<Academy>>(
    `${baseUrl}/${data.academyId}/owner/${data.ownerId}`,
  );

export const addSocialMedia = (data: AddSocialMediaDto) => {
  const { academyId, ...body } = data;
  return axiosClient.post<SuccessfulResponse<Academy>>(
    `${baseUrl}/${academyId}/social-media`,
    body,
  );
};

export const deleteSocialMedia = (data: DeleteSocialMediaDto) =>
  axiosClient.delete<SuccessfulResponse<Academy>>(
    `${baseUrl}/${data.academyId}/social-media/${data.platformId}`,
  );
