import * as Dto from "@/DTOs/academy.dto";
import { axiosClient } from "@/lib/axios";
import type { Academy, AcademyDetails } from "@/types/academy";
import type { PaginatedResponse, SuccessfulResponse } from "@/types/axios";

type Entity = Academy
type EntityDetails = AcademyDetails

const academiesUrl = {
  base: "/academies",
  byId: (id: string) => `/academies/${id}`,
  myAcademics: "/academies/my-academics",
  owner: (academyId: string, userId: string) =>
    `/academies/${academyId}/owner/${userId}`,
  socialMedia: (academyId: string) =>
    `/academies/${academyId}/social-media`,
  socialMediaById: (academyId: string, platformId: string) =>
    `/academies/${academyId}/social-media/${platformId}`,
};

export const getAllAcademies = (data: Dto.GetAllAcademiesDto) => {
  const { query } = data

  return axiosClient.get<PaginatedResponse<Entity>>(academiesUrl.base, { params: query });
};

export const getMyAcademics = () => {
  return axiosClient.get<SuccessfulResponse<Entity[]>>(academiesUrl.myAcademics);
};

export const createAcademy = (data: Dto.CreateAcademyDto) => {
  const { body } = data

  return axiosClient.post<SuccessfulResponse<Entity>>(academiesUrl.base, body);
};

export const deleteAcademy = (data: Dto.DeleteAcademyDto) => {
  const { params } = data
  const { academyId } = params

  return axiosClient.delete<SuccessfulResponse<EntityDetails>>(academiesUrl.byId(academyId));
}

export const updateAcademy = (data: Dto.UpdateAcademyDto) => {
  const { params, body } = data;
  const { academyId } = params

  return axiosClient.patch<SuccessfulResponse<Entity>>(academiesUrl.byId(academyId), body);
};

export const getAcademy = (data: Dto.GetAcademyDetailsDto) => {
  const { params } = data
  const { academyId } = params

  return axiosClient.get<SuccessfulResponse<EntityDetails>>(academiesUrl.byId(academyId));
}
export const addOwner = (data: Dto.AddOwnerDto) => {
  const { params } = data;
  const { academyId, userId } = params

  return axiosClient.post<SuccessfulResponse<Entity>>(academiesUrl.owner(academyId, userId));
};

export const deleteOwner = (data: Dto.DeleteOwnerDto) => {
  const { params } = data;
  const { academyId, userId } = params

  return axiosClient.delete<SuccessfulResponse<Entity>>(academiesUrl.owner(academyId, userId))
}

export const addSocialMedia = (data: Dto.AddSocialMediaDto) => {
  const { params, body } = data;
  const { academyId } = params

  return axiosClient.post<SuccessfulResponse<Entity>>(academiesUrl.socialMedia(academyId), body)
};

export const deleteSocialMedia = (data: Dto.DeleteSocialMediaDto) => {
  const { params } = data;
  const { academyId, platformId } = params
  return axiosClient.delete<SuccessfulResponse<Entity>>(academiesUrl.socialMediaById(academyId, platformId))
}