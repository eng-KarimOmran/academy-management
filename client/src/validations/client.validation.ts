import z from "zod";
import {
  id,
  limit,
  positiveNumber,
  phone,
  personName,
  source,
} from "../lib/common.validation";

export const CreateClientSchema = {
  body: z.object({
    academyId: id,
    name: personName,
    phone,
    source,
  }),
};

export const UpdateClientSchema = {
  params: z.object({ clientId: id, academyId: id }),
  body: z.object({
    name: personName.optional(),
    phone: phone.optional(),
    source: source.optional(),
  }),
};

export const DeleteClientSchema = {
  params: z.object({ clientId: id, academyId: id }),
};

export const GetAllClientsSchema = {
  params: z.object({ academyId: id }),
  query: z.object({
    page: positiveNumber.optional().default(1),
    limit,
    search: z.string().optional(),
    source: source.optional(),
  }),
};

export const GetClientDetailsSchema = {
  params: z.object({ academyId: id }),
  query: z.object({
    clientId: id.optional(),
    phone: phone.optional(),
  }),
};

export const GetClientByPhoneSchema = {
  params: z.object({ academyId: id, phone }),
};