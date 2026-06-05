import { axiosClient } from "@/lib/axios";

import type {
  CreateClientDto,
  UpdateClientDto,
  DeleteClientDto,
  GetAllClientsDto,
  GetClientDetailsDto,
} from "@/DTOs/client.dto";
import type { PaginatedResponse, SuccessfulResponse } from "@/types/axios";
import type { Client, ClientDetails } from "@/types/client";

/* =========================
   Create Client
========================= */
export const createClient = (data: CreateClientDto) => {
  const { academyId, ...body } = data;

  return axiosClient.post<SuccessfulResponse<Client>>(
    `/academy/${academyId}/client`,
    body,
  );
};

/* =========================
   Update Client
========================= */
export const updateClient = (data: UpdateClientDto) => {
  const { academyId, id, ...body } = data;

  return axiosClient.patch<SuccessfulResponse<Client>>(
    `/academy/${academyId}/client/${id}`,
    body,
  );
};

/* =========================
   Delete Client
========================= */
export const deleteClient = (data: DeleteClientDto) => {
  const { academyId, id } = data;

  return axiosClient.delete<SuccessfulResponse<null>>(
    `/academy/${academyId}/client/${id}`,
  );
};

/* =========================
   Get All Clients
========================= */
export const getAllClients = (params: GetAllClientsDto) => {
  const { academyId, ...query } = params;

  return axiosClient.get<PaginatedResponse<Client>>(
    `/academy/${academyId}/client`,
    {
      params: query,
    },
  );
};

/* =========================
   Get Client Details
========================= */
export const getClientDetails = (params: GetClientDetailsDto) => {
  const { academyId, clientId } = params;
  return axiosClient.get<SuccessfulResponse<ClientDetails>>(
    `/academy/${academyId}/client/details/${clientId}`,
  );
};