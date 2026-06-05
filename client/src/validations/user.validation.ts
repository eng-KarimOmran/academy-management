import z from "zod";

import {
  id,
  personName,
  password,
  phone,
  userRole,
  userStatus,
  limit,
  positiveNumber,
  boolean,
} from "@/validations/common.validation";

export const CreateUserSchema = z.object({
  name: personName,
  phone,
  password,
  status: userStatus.optional(),
});

export const UpdateUserSchema = z.object({
  userId: id,
  name: personName.optional(),
  phone: phone.optional(),
  password: password.optional(),
  role: userRole.optional(),
  status: userStatus.optional(),
  isPasswordChanged: boolean.optional(),
});

export const DeleteUserSchema = z.object({
  userId: id,
});

export const GetUserDetailsSchema = z.object({
  userId: id,
});

export const GetAllUsersSchema = z.object({
  page: positiveNumber.optional().default(1),
  limit: limit.optional().default(10),
  search: z.string().optional(),
});
