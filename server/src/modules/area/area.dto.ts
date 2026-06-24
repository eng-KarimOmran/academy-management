import z from "zod";
import { AreaSchema } from "./area.schema";

export type CreateAreaDto = {
  params: z.infer<typeof AreaSchema.create.params>;
  body: z.infer<typeof AreaSchema.create.body>;
};

export type UpdateAreaDto = {
  params: z.infer<typeof AreaSchema.update.params>;
  body: z.infer<typeof AreaSchema.update.body>;
};

export type DeleteAreaDto = {
  params: z.infer<typeof AreaSchema.delete.params>;
};

export type GetAreaDto = {
  params: z.infer<typeof AreaSchema.get.params>;
};

export type GetAllAreasDto = {
  params: z.infer<typeof AreaSchema.getAll.params>;
  query: z.infer<typeof AreaSchema.getAll.query>;
};