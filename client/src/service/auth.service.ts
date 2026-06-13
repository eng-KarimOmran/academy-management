import type { ChangePasswordDto, LoginDto } from "@/DTOs/auth.dto";
import type { CreateUserDto } from "@/DTOs/user.dto";
import { axiosClient } from "@/lib/axios";
import type { SuccessfulResponse } from "@/types/axios";
import type { UserAuth } from "@/types/user";

const baseUrl = "/auth";

export const login = (data: LoginDto) => axiosClient.post<SuccessfulResponse<UserAuth>>(`${baseUrl}/login`, data);

export const refresh = () =>
  axiosClient.get<SuccessfulResponse<UserAuth>>(`${baseUrl}/refresh`);

export const changePassword = (data: ChangePasswordDto) => {
  const { password, newPassword } = data;
  return axiosClient.patch<SuccessfulResponse<UserAuth>>(
    `${baseUrl}/change-password`,
    { password, newPassword },
  );
};

export const logout = (allDevices: boolean) =>
  axiosClient.post<SuccessfulResponse<null>>(`${baseUrl}/logout?`, {
    params: {
      allDevices,
    },
  });

export const signup = (data: CreateUserDto) => axiosClient.post<SuccessfulResponse<null>>(`${baseUrl}/sign-up-first-user`, data);
