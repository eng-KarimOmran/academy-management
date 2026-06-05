import type { LoginDto } from "@/DTOs/auth.dto";
import { axiosClient } from "@/lib/axios";
import type { SuccessfulResponse } from "@/types/axios";
import type { User } from "@/types/user";

const bassUrl = "/auth";

export const login = (data: LoginDto) =>
  axiosClient.post<SuccessfulResponse<User>>(`${bassUrl}/login`, data);

export const refresh = () =>
  axiosClient.get<SuccessfulResponse<User>>(`${bassUrl}/refresh`);

export const logout = (allDevices: boolean) =>
  axiosClient.post<SuccessfulResponse<null>>(
    `${bassUrl}/logout?allDevices=${allDevices}`,
  );