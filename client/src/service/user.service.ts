import type {
  CreateUserDto,
  UpdateUserDto,
  GetAllUsersDto,
  DeleteUserDto,
} from "@/DTOs/user.dto";
import { axiosClient } from "@/lib/axios";
import type { PaginatedResponse, SuccessfulResponse } from "@/types/axios";
import type { User, UserProfile } from "@/types/user";

const bassUrl = "/user";

export const createUser = (data: CreateUserDto) =>
  axiosClient.post<SuccessfulResponse<User>>(bassUrl, data);

export const updateUser = (data: UpdateUserDto) => {
  const { userId, ...body } = data;
  return axiosClient.patch<SuccessfulResponse<User>>(
    `${bassUrl}/${userId}`,
    body,
  );
};

export const deleteUser = (data: DeleteUserDto) =>
  axiosClient.delete<SuccessfulResponse<null>>(`${bassUrl}/${data.userId}`);

export const getAllUsers = (params: GetAllUsersDto) =>
  axiosClient.get<PaginatedResponse<User>>(bassUrl, { params });

export const getUserDetails = ({ userId }: { userId: string }) =>
  axiosClient.get<SuccessfulResponse<UserProfile>>(
    `${bassUrl}/details/${userId}`,
  );
