import type z from "zod";
import {
  CreateClientSchema,
  UpdateClientSchema,
  DeleteClientSchema,
  GetAllClientsSchema,
  GetClientDetailsSchema,
} from "@/validations/client.validation";

export type CreateClientDto = z.infer<typeof CreateClientSchema>;

export type UpdateClientDto = z.infer<typeof UpdateClientSchema>;

export type DeleteClientDto = z.infer<typeof DeleteClientSchema>;

export type GetAllClientsDto = z.infer<typeof GetAllClientsSchema>;

export type GetClientDetailsDto = z.infer<typeof GetClientDetailsSchema>;
