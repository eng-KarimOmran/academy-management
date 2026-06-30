import z from "zod";

import {
  id,
  personName,
  phone,
  limit,
  positiveNumber,
  boolean,
  booleanQuery,
  jobProfileType
} from "@/lib/common.validation";

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
    page: positiveNumber,
    limit: limit,
    search: z.string().optional(),
    jobProfileType: jobProfileType.optional(),
    isActive: booleanQuery.optional(),
  }),
};
