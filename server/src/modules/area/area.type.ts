import { Area } from "../../../prisma/generated/browser";
import { PaginatedResponse } from "../../shared/types/types";
import { AcademyRequestHandler } from "../academy/academy.type";

import {
    CreateAreaDto,
    UpdateAreaDto,
    DeleteAreaDto,
    GetAllAreasDto,
    GetAreaDetailsDto,
} from "./area.dto";

export interface IAreaService {
    createArea(
        data: CreateAreaDto
    ): Promise<Area>;

    updateArea(
        data: UpdateAreaDto
    ): Promise<Area>;

    deleteArea(
        data: DeleteAreaDto
    ): Promise<Area>;

    getAllAreas(
        data: GetAllAreasDto
    ): Promise<PaginatedResponse<Area>>;

    getAreaDetails(
        data: GetAreaDetailsDto
    ): Promise<Area>;
}

export interface IAreaController {
    createArea: AcademyRequestHandler;

    updateArea: AcademyRequestHandler;

    deleteArea: AcademyRequestHandler;

    getAllAreas: AcademyRequestHandler;

    getAreaDetails: AcademyRequestHandler;
}