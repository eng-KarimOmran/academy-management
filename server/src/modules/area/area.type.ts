import { PaginatedResponse } from "../../shared/types/types";
import { Area } from "../../../prisma/generated/client";
import * as DTO from "./area.dto";

export interface IAreaService {
    create: (data: DTO.CreateAreaDto) => Promise<Area>;
    update: (data: DTO.UpdateAreaDto) => Promise<Area>;
    delete: (data: DTO.DeleteAreaDto) => Promise<Area>;
    getDetails: (data: DTO.GetAreaDto) => Promise<Area>;
    getAll: (data: DTO.GetAllAreasDto) => Promise<PaginatedResponse<Area>>;
}