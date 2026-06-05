import z from "zod";
import {
  CreateUserSchema,
  UpdateUserSchema,
  DeleteUserSchema,
  GetAllUsersSchema,
  GetUserDetailsSchema,
} from "./user.schema";

export type CreateUserDto = {
  body: z.infer<typeof CreateUserSchema.body>;
};

export type UpdateUserDto = {
  params: z.infer<typeof UpdateUserSchema.params>;
  body: z.infer<typeof UpdateUserSchema.body>;
};

export type DeleteUserDto = {
  params: z.infer<typeof DeleteUserSchema.params>;
};

export type GetAllUsersDto = {
  query: z.infer<typeof GetAllUsersSchema.query>;
};

export type GetUserDetailsDto = {
  params: z.infer<typeof GetUserDetailsSchema.params>;
};