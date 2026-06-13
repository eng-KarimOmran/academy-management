import type {
  CreateCarDto,
  DeleteCarDto,
  GetAllCarsDto,
  UpdateCarDto,
  GetCarDetailsDto,
} from "@/DTOs/car.dto";

import { axiosClient } from "@/lib/axios";
import type { PaginatedResponse, SuccessfulResponse } from "@/types/axios";
import type { Car } from "@/types/car";
import type { Transmission } from "@/types/enums";

const baseUrl = "/cars";

/* ===================== GET ALL ===================== */
export const getAllCars = (data: GetAllCarsDto) => {
  return axiosClient.get<PaginatedResponse<Car>>(baseUrl, {
    params: {
      page: data.page ?? 1,
      limit: data.limit ?? 10,
      search: data.search ?? "",
    },
  });
};

/* ===================== GET ONE ===================== */
export const getCar = (data: GetCarDetailsDto) =>
  axiosClient.get<SuccessfulResponse<Car>>(`${baseUrl}/details/${data.carId}`);

/* ===================== CREATE ===================== */
export const createCar = (data: CreateCarDto) =>
  axiosClient.post<SuccessfulResponse<Car>>(baseUrl, data);

/* ===================== UPDATE ===================== */
export const updateCar = (data: UpdateCarDto) => {
  const { carId, ...body } = data;
  console.log({ body });
  return axiosClient.patch<SuccessfulResponse<Car>>(
    `${baseUrl}/${carId}`,
    body,
  );
};

/* ===================== DELETE ===================== */
export const deleteCar = (data: DeleteCarDto) =>
  axiosClient.delete<SuccessfulResponse<null>>(`${baseUrl}/${data.carId}`);

export const getActiveCar = ({ gearType }: { gearType: Transmission }) =>
  axiosClient.get<PaginatedResponse<Car>>(baseUrl, {
    params: {
      gearType,
      isActive: true,
    },
  });