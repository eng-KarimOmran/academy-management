import z from "zod";
import {
  id,
  personName,
  password,
  phone,
  userRole,
  limit,
  positiveNumber,
  boolean,
  booleanQuery,
} from "../../shared/utils/common.validation";

export const CreateUserSchema = {
  body: z.object({
    name: personName,
    phone,
    password,
  }),
};

export const UpdateUserSchema = {
  params: z.object({ userId: id }),
  body: z.object({
    name: personName.optional(),
    phone: phone.optional(),
    isActive: boolean.optional(),
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
    role: userRole.optional(),
    isActive: booleanQuery.optional(),
  }),
};