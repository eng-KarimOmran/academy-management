import z from "zod";

import {
  CreateCarSchema,
  UpdateCarSchema,
  GetAllCarsSchema,
  GetCarDetailsSchema,
  DeleteCarSchema,
  FilterByTypeSchema,
} from "../validations/car.validation";

export type CreateCarDto = z.infer<typeof CreateCarSchema>;

export type UpdateCarDto = z.infer<typeof UpdateCarSchema>;

export type GetAllCarsDto = z.infer<typeof GetAllCarsSchema>;

export type GetCarDetailsDto = z.infer<typeof GetCarDetailsSchema>;

export type DeleteCarDto = z.infer<typeof DeleteCarSchema>;

export type FilterByTypeDto = z.infer<typeof FilterByTypeSchema>;