import { Car } from "../../../prisma/generated/browser";
import { PaginatedResponse } from "../../shared/types/types";
import { AcademyRequestHandler } from "../academy/academy.type";

import {
    CreateDto,
    UpdateDto,
    DeleteDto,
    GetAllDto,
    GetDetailsDto,
} from "./car.dto";

export interface ICarService {
    createCar(
        data: CreateDto
    ): Promise<Car>;

    updateCar(
        data: UpdateDto
    ): Promise<Car>;

    deleteCar(
        data: DeleteDto
    ): Promise<Car>;

    getAllCars(
        data: GetAllDto
    ): Promise<PaginatedResponse<Car>>;

    getDetails(
        data: GetDetailsDto
    ): Promise<Car>;
}

export interface ICarController {
    createCar: AcademyRequestHandler;

    updateCar: AcademyRequestHandler;

    deleteCar: AcademyRequestHandler;

    getAllCars: AcademyRequestHandler;

    getDetails: AcademyRequestHandler;
}