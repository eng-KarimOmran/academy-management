import { axiosClient } from "@/lib/axios";
import * as Dto from "@/DTOs/user.dto";

import type { PaginatedResponse, SuccessfulResponse } from "@/types/axios";
import type { User, UserDetails } from "@/types/user";

type Entity = User;
type EntityDetails = UserDetails;

const usersUrl = {
  base: "/users",
  byId: (userId: string) => `/users/${userId}`,
  me: "/users/me"
};

export const createUser = (data: Dto.CreateUserDto) => {
  const { body } = data;

  return axiosClient.post<SuccessfulResponse<Entity>>(
    usersUrl.base,
    body
  );
};

export const updateUser = (data: Dto.UpdateUserDto) => {
  const { params, body } = data;
  const { userId } = params;

  return axiosClient.patch<SuccessfulResponse<Entity>>(
    usersUrl.byId(userId),
    body
  );
};

export const deleteUser = (data: Dto.DeleteUserDto) => {
  const { params } = data;
  const { userId } = params;

  return axiosClient.delete<SuccessfulResponse<Entity>>(
    usersUrl.byId(userId)
  );
};

export const getAllUsers = (data: Dto.GetAllUsersDto) => {
  const { query } = data;

  return axiosClient.get<PaginatedResponse<Entity>>(
    usersUrl.base,
    {
      params: query,
    }
  );
};

export const getUserDetails = (data: Dto.GetUserDetailsDto) => {
  const { params } = data;
  const { userId } = params;

  return axiosClient.get<SuccessfulResponse<EntityDetails>>(
    usersUrl.byId(userId)
  );
};

export const getMe = () => {
  return axiosClient.get<SuccessfulResponse<EntityDetails>>(
    usersUrl.me
  );
};