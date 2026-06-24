import type z from "zod";
import * as Schema from "@/validations/client.validation";

export type CreateClientDto = {
  body: z.infer<typeof Schema.CreateClientSchema.body>;
};

export type UpdateClientDto = {
  params: z.infer<typeof Schema.UpdateClientSchema.params>;
  body: z.infer<typeof Schema.UpdateClientSchema.body>;
};

export type GetAllClientsDto = {
  params: z.infer<typeof Schema.GetAllClientsSchema.params>;
  query: z.infer<typeof Schema.GetAllClientsSchema.query>;
};

export type ClientDetailsDto = {
  params: z.infer<typeof Schema.GetClientDetailsSchema.params>;
};

export type DeleteClientDto = {
  params: z.infer<typeof Schema.DeleteClientSchema.params>;
};

export type GetClientByPhoneDto = {
  params: z.infer<typeof Schema.GetClientByPhoneSchema.params>;
};