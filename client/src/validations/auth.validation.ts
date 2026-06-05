import { z } from "zod";

import { boolean, password, phone } from "./common.validation";

export const LoginSchema = z.object({
  phone,
  password,
});

export const LogoutSchema = z.object({
  allDevices: boolean,
});

export const ChangePasswordSchema = z
  .object({
    password,
    confirmPassword: password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمة السر وتأكيدها لازم يكونوا متطابقين",
    path: ["confirmPassword"],
  });
