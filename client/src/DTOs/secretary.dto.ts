import type z from "zod";

import {
  CreateSecretarySchema,
  UpdateSecretarySchema,
  DeleteSecretarySchema,
  GetAllSecretariesSchema,
  GetSecretarySchema,
} from "@/validations/secretary.validation";

export type CreateSecretaryDto = z.infer<typeof CreateSecretarySchema>;

export type UpdateSecretaryDto = z.infer<typeof UpdateSecretarySchema>;

export type DeleteSecretaryDto = z.infer<typeof DeleteSecretarySchema>;

export type GetAllSecretariesDto = z.infer<typeof GetAllSecretariesSchema>;

export type GetSecretaryParamsDto = z.infer<typeof GetSecretarySchema>;
