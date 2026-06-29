import { z } from "zod";

import { booleanQuery, id, password, phone } from "./common.validation";

export const LoginSchema = {
  body: z.object({ phone, password }),
};

export const LogoutSchema = {
  query: z.object({ allDevices: booleanQuery.optional().default(false) }),
};

export const changePasswordSchema = {
  body: z.object({
    newPassword:password,
    currentPassword: password,
  }),
};

export const newPasswordSchema = {
  params: z.object({ userId: id }),
  body: z.object({
    newPassword: password,
  }),
};