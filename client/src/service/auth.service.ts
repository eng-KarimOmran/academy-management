import * as Dto from "@/DTOs/auth.dto";
import type { CreateUserDto } from "@/DTOs/user.dto";
import { axiosClient } from "@/lib/axios";

import type { SuccessfulResponse } from "@/types/axios";
import type { User, UserAuth } from "@/types/user";

type Entity = UserAuth

const authUrl = {
  base: "/auth",
  login: "/auth/login",
  refresh: "/auth/refresh",
  changePassword: "/auth/change-password",
  logout: "/auth/logout",
  signup: "/auth/first-user",
  newPassword: (userId: string) => `/auth/${userId}/new-password`
};

export const login = (data: Dto.LoginDto) => {
  const { body } = data
  return axiosClient.post<SuccessfulResponse<Entity>>(
    authUrl.login,
    body
  );
};

export const refresh = () => {
  return axiosClient.get<SuccessfulResponse<Entity>>(authUrl.refresh);
};

export const changePassword = (data: Dto.ChangePasswordDto) => {
  const { body } = data;

  return axiosClient.patch<SuccessfulResponse<boolean>>(
    authUrl.changePassword,
    body
  );
};

export const logout = (data: Dto.LogoutDto) => {
  const { query } = data;

  return axiosClient.post<SuccessfulResponse<null>>(authUrl.logout, null, { params: query });
};

export const signup = (data: CreateUserDto) => {
  const { body } = data
  return axiosClient.post<SuccessfulResponse<null>>(
    authUrl.signup,
    body
  );
};

export const newPassword = (data: Dto.NewPasswordDto) => {
  const { body, params } = data;
  const { userId } = params

  return axiosClient.patch<SuccessfulResponse<User>>(
    authUrl.newPassword(userId),
    body
  );
};