import z from "zod";

import {
  booleanQuery,
  id,
  password,
  phone,
  personName
} from "../../shared/utils/common.validation";

export const LoginSchema = {
  body: z.object({ phone, password }),
};

export const LogoutSchema = {
  query: z.object({ allDevices: booleanQuery.optional().default(false) }),
};

export const changePasswordSchema = {
  body: z.object({
    currentPassword: password,
    newPassword: password,
  }),
};

export const newPasswordSchema = {
  params: z.object({ userId: id }),
  body: z.object({
    newPassword: password,
  }),
};


export const createFirstUserSchema = {
  body: z.object({
    name: personName,
    phone,
  }),
};