import z from "zod";

import {
  CreateUserSchema,
  UpdateUserSchema,
  DeleteUserSchema,
  GetUserDetailsSchema,
  GetAllUsersSchema,
} from "@/validations/user.validation";

export type CreateUserDto = z.infer<typeof CreateUserSchema>;

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;

export type DeleteUserDto = z.infer<typeof DeleteUserSchema>;

export type GetUserDetailsDto = z.infer<typeof GetUserDetailsSchema>;

export type GetAllUsersDto = z.infer<typeof GetAllUsersSchema>;