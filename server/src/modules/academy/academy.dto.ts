import z from "zod";

import {
  CreateAcademySchema,
  UpdateAcademySchema,
  DeleteAcademySchema,
  GetAllAcademiesSchema,
  GetAcademySchema,
  AddSocialMediaSchema,
  DeleteSocialMediaSchema,
  AddOwnerSchema,
  DeleteOwnerSchema,
} from "./academy.Schema";

export type CreateAcademyDto = {
  body: z.infer<typeof CreateAcademySchema.body>;
};

export type UpdateAcademyDto = {
  params: z.infer<typeof UpdateAcademySchema.params>;
  body: z.infer<typeof UpdateAcademySchema.body>;
};

export type DeleteAcademyDto = {
  params: z.infer<typeof DeleteAcademySchema.params>;
};

export type GetAllAcademiesDto = {
  query: z.infer<typeof GetAllAcademiesSchema.query>;
};

export type GetAcademyDetailsDto = {
  params: z.infer<typeof GetAcademySchema.params>;
};

export type AddSocialMediaDto = {
  params: z.infer<typeof AddSocialMediaSchema.params>;
  body: z.infer<typeof AddSocialMediaSchema.body>;
};

export type DeleteSocialMediaDto = {
  params: z.infer<typeof DeleteSocialMediaSchema.params>;
};

export type AddOwnerDto = {
  params: z.infer<typeof AddOwnerSchema.params>;
  body: z.infer<typeof AddOwnerSchema.body>;
};

export type DeleteOwnerDto = {
  params: z.infer<typeof DeleteOwnerSchema.params>;
};