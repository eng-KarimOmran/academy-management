import z from "zod/v3";
import {
  CreateAcademySchema,
  UpdateAcademySchema,
  DeleteAcademySchema,
  GetAllAcademiesSchema,
  GetAcademySchema,
  socialMediaSchema,
  PhoneAcademySchema
} from "../validations/academy.validation";


export type CreateAcademyDto = z.infer<typeof CreateAcademySchema>;

export type UpdateAcademyDto = z.infer<typeof UpdateAcademySchema>;

export type DeleteAcademyDto = z.infer<typeof DeleteAcademySchema>;

export type GetAllAcademiesDto = z.infer<typeof GetAllAcademiesSchema>;

export type GetAcademyDetailsDto = {
  params: z.infer<typeof GetAcademySchema.params>;
};

export type SocialMediaSchemaDto = z.infer<typeof socialMediaSchema>;
export type PhoneAcademyDto = z.infer<typeof PhoneAcademySchema>;
