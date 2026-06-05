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

const bassUrl = "/car";

/* ===================== GET ALL ===================== */
export const getAllCars = (data: GetAllCarsDto) => {
  const query: string = `${bassUrl}?page=${data.page ?? 1}&limit=${data.limit ?? 10}&search=${data.search ?? ""}`;
  return axiosClient.get<PaginatedResponse<Car>>(query);
};

/* ===================== GET ONE ===================== */
export const getCar = (data: GetCarDetailsDto) =>
  axiosClient.get<SuccessfulResponse<Car>>(`${bassUrl}/details/${data.carId}`);

/* ===================== CREATE ===================== */
export const createCar = (data: CreateCarDto) =>
  axiosClient.post<SuccessfulResponse<Car>>(bassUrl, data);

/* ===================== UPDATE ===================== */
export const updateCar = (data: UpdateCarDto) => {
  const { carId, ...body } = data;
  console.log({ body });
  return axiosClient.patch<SuccessfulResponse<Car>>(`${bassUrl}/${carId}`, body);
};

/* ===================== DELETE ===================== */
export const deleteCar = (data: DeleteCarDto) =>
  axiosClient.delete<SuccessfulResponse<null>>(`${bassUrl}/${data.carId}`);

export const getActiveCar = ({ type }: { type: Transmission }) =>
  axiosClient.get<SuccessfulResponse<Car[]>>(`${bassUrl}/active?type=${type}`);