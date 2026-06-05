import z from "zod";
import {
  address,
  id,
  limit,
  phone,
  platform,
  positiveNumber,
  url,
  entityName,
  email,
} from "@/validations/common.validation";

export const socialMediaSchema = z.object({
  platform:platform,
  url,
});

export const CreateAcademySchema = z.object({
  name: entityName,
  phone,
  address,
  instaPay: email,
  owner: phone,
});

export const UpdateAcademySchema = z.object({
  academyId: id,
  name: entityName.optional(),
  address: address.optional(),
  instaPay: email.optional(),
  phone: phone.optional(),
  owners: z.array(phone).optional(),
  socialMediaPlatforms: z.array(socialMediaSchema).optional(),
});

export const DeleteAcademySchema = z.object({ academyId: id });

export const GetAcademySchema = {
  params: z.object({ academyId: id }),
};

export const GetAllAcademiesSchema = z.object({
  page: positiveNumber.optional().default(1),
  limit: limit.optional().default(10),
  search: z.string().optional(),
});

export const PhoneAcademySchema = z.object({
  phone,
});
