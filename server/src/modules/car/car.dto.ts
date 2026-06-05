import z from "zod";
import {
  CreateCarSchema,
  UpdateCarSchema,
  GetAllCarsSchema,
  GetCarDetailsSchema,
  DeleteCarSchema,
} from "./car.schema";

export type CreateDto = {
  body: z.infer<typeof CreateCarSchema.body>;
};

export type UpdateDto = {
  params: z.infer<typeof UpdateCarSchema.params>;
  body: z.infer<typeof UpdateCarSchema.body>;
};

export type GetAllDto = {
  query: z.infer<typeof GetAllCarsSchema.query>;
};

export type GetDetailsDto = {
  params: z.infer<typeof GetCarDetailsSchema.params>;
};

export type DeleteDto = {
  params: z.infer<typeof DeleteCarSchema.params>;
};
