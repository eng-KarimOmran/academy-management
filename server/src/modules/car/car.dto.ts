import z from "zod";
import * as Schema from "./car.schema";

export type CreateDto = {
  params: z.infer<typeof Schema.CreateCarSchema.params>;
  body: z.infer<typeof Schema.CreateCarSchema.body>;
};

export type UpdateDto = {
  params: z.infer<typeof Schema.UpdateCarSchema.params>;
  body: z.infer<typeof Schema.UpdateCarSchema.body>;
};

export type GetAllDto = {
  params: z.infer<typeof Schema.GetAllCarsSchema.params>;
  query: z.infer<typeof Schema.GetAllCarsSchema.query>;
};

export type GetDetailsDto = {
  params: z.infer<typeof Schema.GetCarDetailsSchema.params>;
};

export type DeleteDto = {
  params: z.infer<typeof Schema.DeleteCarSchema.params>;
};
