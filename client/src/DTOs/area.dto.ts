import z from "zod";
import * as Schema from "../validations/area.validation";

export type CreateDto = {
  params: z.infer<typeof Schema.CreateAreaSchema.params>;
  body: z.infer<typeof Schema.CreateAreaSchema.body>
};

export type UpdateDto = {
  params: z.infer<typeof Schema.UpdateAreaSchema.params>;
  body: z.infer<typeof Schema.UpdateAreaSchema.body>;
};

export type GetAllDto = {
  params: z.infer<typeof Schema.GetAllAreasSchema.params>;
  query: z.infer<typeof Schema.GetAllAreasSchema.query>;
};

export type GetDetailsDto = {
  params: z.infer<typeof Schema.GetAreaDetailsSchema.params>;
};

export type DeleteDto = {
  params: z.infer<typeof Schema.DeleteAreaSchema.params>;
};