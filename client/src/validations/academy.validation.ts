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
} from "./common.validation";

export const CreateAcademySchema = z.object({
  name: entityName,
  phone,
  address,
  paymentLink: url.optional(),
  owner: phone,
});

export const UpdateAcademySchema = z.object({
  academyId: id,
  name: entityName.optional(),
  phone: phone.optional(),
  address: address.optional(),
  paymentLink: url.optional(),
});

export const DeleteAcademySchema = z.object({ academyId: id });

export const GetAcademySchema = z.object({ academyId: id });

export const GetAllAcademiesSchema = z.object({
  page: positiveNumber.optional().default(1),
  limit: limit.optional().default(50),
  search: z.string().optional(),
});

export const AddSocialMediaSchema = z.object({
  academyId: id,
  platform,
  url,
});

export const DeleteSocialMediaSchema = z.object({
  academyId: id,
  platformId: id,
});

export const AddOwnerSchema = z.object({
  academyId: id,
  phone,
});

export const DeleteOwnerSchema = z.object({ academyId: id, ownerId: id });