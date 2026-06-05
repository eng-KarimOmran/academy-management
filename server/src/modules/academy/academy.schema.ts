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
} from "../../shared/utils/common.validation";

export const CreateAcademySchema = {
  body: z.object({
    name: entityName,
    phone,
    address,
    paymentLink: url.optional(),
    owner: phone,
  }),
};

export const UpdateAcademySchema = {
  params: z.object({ academyId: id }),
  body: z.object({
    name: entityName.optional(),
    phone: phone.optional(),
    address: address.optional(),
    paymentLink: url.optional(),
  }),
};

export const DeleteAcademySchema = {
  params: z.object({ academyId: id }),
};

export const GetAcademySchema = {
  params: z.object({ academyId: id }),
};

export const GetAllAcademiesSchema = {
  query: z.object({
    page: positiveNumber.optional().default(1),
    limit: limit.optional().default(50),
    search: z.string().optional(),
  }),
};

export const AddSocialMediaSchema = {
  params: z.object({ academyId: id }),
  body: z.object({
    platform,
    url,
  }),
};

export const DeleteSocialMediaSchema = {
  params: z.object({ academyId: id, platformId: id }),
};

export const AddOwnerSchema = {
  params: z.object({ academyId: id }),
  body: z.object({
    phone,
  }),
};

export const DeleteOwnerSchema = {
  params: z.object({ academyId: id, ownerId: id }),
};