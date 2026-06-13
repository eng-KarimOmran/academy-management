import z from "zod";

import {
  CreateAcademySchema,
  UpdateAcademySchema,
  DeleteAcademySchema,
  GetAllAcademiesSchema,
  GetAcademySchema,
  AddOwnerSchema,
  DeleteOwnerSchema,
  AddSocialMediaSchema,
  DeleteSocialMediaSchema,
} from "../validations/academy.validation";

export type CreateAcademyDto = z.infer<typeof CreateAcademySchema>;

export type UpdateAcademyDto = z.infer<typeof UpdateAcademySchema>;

export type DeleteAcademyDto = z.infer<typeof DeleteAcademySchema>;

export type GetAllAcademiesDto = z.infer<typeof GetAllAcademiesSchema>;

export type GetAcademyDetailsDto = z.infer<typeof GetAcademySchema>;

export type AddSocialMediaDto = z.infer<typeof AddSocialMediaSchema>;

export type DeleteSocialMediaDto = z.infer<typeof DeleteSocialMediaSchema>;

export type AddAcademyOwnerDto = z.infer<typeof AddOwnerSchema>;

export type DeleteAcademyOwnerDto = z.infer<typeof DeleteOwnerSchema>;
