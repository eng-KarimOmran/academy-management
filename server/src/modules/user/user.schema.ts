import z from "zod";

import {
  id,
  personName,
  password,
  phone,
  limit,
  positiveNumber,
  boolean,
  booleanQuery,
  userRole,
} from "../../shared/utils/common.validation";

export const CreateUserSchema = {
  body: z.object({
    name: personName,
    phone,
  }),
};

export const UpdateUserSchema = {
  params: z.object({ userId: id }),
  body: z.object({
    name: personName.optional(),
    phone: phone.optional(),
    isActive: boolean.optional(),
    userRole: userRole.optional()
  }),
};

export const DeleteUserSchema = {
  params: z.object({ userId: id }),
};

export const GetUserDetailsSchema = {
  params: z.object({ userId: id }),
};

export const GetAllUsersSchema = {
  query: z.object({
    page: positiveNumber.optional().default(1),
    limit: limit,
    search: z.string().optional(),
    isActive: booleanQuery.optional(),
    userRole: userRole.optional()
  }),
};

export const newPasswordSchema = {
  params: z.object({ userId: id }),
  body: z.object({
    newPassword: password,
  }),
};