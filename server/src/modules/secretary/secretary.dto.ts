import z from "zod";
import * as Schema from "./secretary.schema";

export type CreateDto = {
  params: z.infer<typeof Schema.CreateSecretarySchema.params>;
  body: z.infer<typeof Schema.CreateSecretarySchema.body>;
};

export type UpdateDto = {
  params: z.infer<typeof Schema.UpdateSecretarySchema.params>;
  body: z.infer<typeof Schema.UpdateSecretarySchema.body>;
};

export type GetAllDto = {
  params: z.infer<typeof Schema.GetAllSecretariesSchema.params>;
  query: z.infer<typeof Schema.GetAllSecretariesSchema.query>;
};

export type GetDetailsDto = {
  params: z.infer<typeof Schema.GetSecretaryDetailsSchema.params>;
};

export type DeleteDto = {
  params: z.infer<typeof Schema.DeleteSecretarySchema.params>;
};
