import { z } from "zod";
import {
  LoginSchema,
  LogoutSchema,
  ChangePasswordSchema,
} from "../validations/auth.validation";

export type LoginDto = z.infer<typeof LoginSchema>;

export type LogoutDto = z.infer<typeof LogoutSchema>;

export type ChangePasswordDto = z.infer<typeof ChangePasswordSchema>;
