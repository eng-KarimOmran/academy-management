import * as Dto from "@/DTOs/car.dto";

import { axiosClient } from "@/lib/axios";
import type { PaginatedResponse, SuccessfulResponse } from "@/types/axios";
import type { Car } from "@/types/car";

type Entity = Car;

const carsUrl = {
  base: "/cars",

  byId: (carId: string) => `/cars/${carId}`,

  details: (carId: string) => `/cars/details/${carId}`,
};

export const getAllCars = (data: Dto.GetAllDto) => {
  const { query } = data;

  return axiosClient.get<PaginatedResponse<Entity>>(carsUrl.base, {
    params: query,
  });
};

export const getCar = (data: Dto.GetDetailsDto) => {
  const { params } = data;
  const { carId } = params;

  return axiosClient.get<SuccessfulResponse<Entity>>(
    carsUrl.details(carId)
  );
};

export const createCar = (data: Dto.CreateDto) => {
  const { body } = data;

  return axiosClient.post<SuccessfulResponse<Entity>>(
    carsUrl.base,
    body
  );
};

export const updateCar = (data: Dto.UpdateDto) => {
  const { params, body } = data;
  const { carId } = params;

  return axiosClient.patch<SuccessfulResponse<Entity>>(
    carsUrl.byId(carId),
    body
  );
};

export const deleteCar = (data: Dto.DeleteDto) => {
  const { params } = data;
  const { carId } = params;

  return axiosClient.delete<SuccessfulResponse<null>>(
    carsUrl.byId(carId)
  );
};