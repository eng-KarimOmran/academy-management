import z from "zod";

import {
  boolean,
  booleanQuery,
  password,
  phone,
} from "../../shared/utils/common.validation";

export const LoginSchema = {
  body: z.object({ phone, password }),
};

export const LogoutSchema = {
  query: z.object({ allDevices: booleanQuery.optional().default(false) }),
};

export const changePasswordSchema = {
  body: z.object({
    password,
  }),
};
