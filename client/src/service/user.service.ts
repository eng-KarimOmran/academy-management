import type {
  CreateUserDto,
  UpdateUserDto,
  GetAllUsersDto,
  DeleteUserDto,
} from "@/DTOs/user.dto";
import { axiosClient } from "@/lib/axios";
import type { PaginatedResponse, SuccessfulResponse } from "@/types/axios";
import type { User, UserProfile } from "@/types/user";

const baseUrl = "/users";

export const createUser = (data: CreateUserDto) =>
  axiosClient.post<SuccessfulResponse<User>>(baseUrl, data);

export const updateUser = (data: UpdateUserDto) => {
  const { userId, ...body } = data;
  return axiosClient.patch<SuccessfulResponse<User>>(
    `${baseUrl}/${userId}`,
    body,
  );
};

export const deleteUser = (data: DeleteUserDto) =>
  axiosClient.delete<SuccessfulResponse<User>>(`${baseUrl}/${data.userId}`);

export const getAllUsers = (data: GetAllUsersDto) =>
  axiosClient.get<PaginatedResponse<User>>(baseUrl, { data });

export const getUserDetails = ({ userId }: { userId: string }) =>
  axiosClient.get<SuccessfulResponse<UserProfile>>(`${baseUrl}/${userId}`);
