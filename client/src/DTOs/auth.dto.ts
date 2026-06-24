import { z } from "zod";
import * as Schema from "../validations/auth.validation";

export type LoginDto = {
  body: z.infer<typeof Schema.LoginSchema.body>;
};

export type LogoutDto = {
  query: z.infer<typeof Schema.LogoutSchema.query>;
};

export type ChangePasswordDto = {
  body: z.infer<typeof Schema.changePasswordSchema.body>;
};

export type NewPasswordDto = {
  params: z.infer<typeof Schema.newPasswordSchema.params>;
  body: z.infer<typeof Schema.newPasswordSchema.body>;
};