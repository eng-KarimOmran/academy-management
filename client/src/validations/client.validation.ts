import z from "zod";
import {
  id,
  limit,
  positiveNumber,
  phone,
  personName,
  clientSource,
} from "../validations/common.validation";

export const CreateClientSchema = z.object({
  academyId: id,
  name: personName,
  phone,
  clientSource,
});

export const UpdateClientSchema = z.object({
  id,
  academyId: id,
  name: personName.optional(),
  phone: phone.optional(),
});

export const DeleteClientSchema = z.object({
  academyId: id,
  id,
});

export const GetAllClientsSchema = z.object({
  academyId: id,
  page: positiveNumber.optional().default(1),
  limit: limit.optional().default(10),
  search: z.string().optional().default(""),
});

export const GetClientDetailsSchema = z.object({
  academyId: id,
  clientId: id,
});

export const GetClientByPhoneSchema = z.object({
  academyId: id,
  phone,
});