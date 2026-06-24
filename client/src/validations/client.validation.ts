import z from "zod";
import {
  id,
  limit,
  positiveNumber,
  phone,
  personName,
  clientSource,
} from "../validations/common.validation";

export const CreateClientSchema = {
  body: z.object({
    academyId: id,
    name: personName,
    phone,
    clientSource,
  }),
};

export const UpdateClientSchema = {
  params: z.object({ clientId: id, academyId: id }),
  body: z.object({
    name: personName.optional(),
    phone: phone.optional(),
    clientSource: clientSource.optional(),
  }),
};

export const DeleteClientSchema = {
  params: z.object({ clientId: id, academyId: id }),
};

export const GetAllClientsSchema = {
  params: z.object({ academyId: id }),
  query: z.object({
    page: positiveNumber.optional().default(1),
    limit: limit,
    search: z.string().optional(),
  }),
};

export const GetClientDetailsSchema = {
  params: z.object({ academyId: id, clientId: id }),
};

export const GetClientByPhoneSchema = {
  params: z.object({ academyId: id, phone }),
};