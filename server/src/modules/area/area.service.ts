import ApiError from "../../shared/utils/ApiError";
import { getPagination, getTotalPages } from "../../shared/utils/Pagination";
import { AreaCreateInput, AreaUpdateInput } from "../../../prisma/generated/models";
import { buildAreaWhere } from "./area.utils";
import AreaRepository from "./area.repository";

const AreaService = {
  async create({ name, isActive, supportType }: { name: string; isActive?: boolean; supportType: any }) {
    const areaExists = await AreaRepository.findByName({ name });
    if (areaExists) throw ApiError.Conflict("Name");

    const data: AreaCreateInput = { name, isActive, supportType };
    return await AreaRepository.create({ data });
  },

  async update({ areaId, name, isActive, supportType }: { areaId: string; name?: string; isActive?: boolean; supportType?: any }) {
    const currentArea = await AreaRepository.findById({ areaId });
    if (!currentArea) throw ApiError.NotFound({ model: "Area" });

    if (name && name !== currentArea.name) {
      const areaExists = await AreaRepository.findByName({ name });
      if (areaExists) throw ApiError.Conflict("Name");
    }

    const data: AreaUpdateInput = {};
    if (name) data.name = name;
    if (typeof isActive !== "undefined") data.isActive = isActive;
    if (supportType) data.supportType = supportType;

    return await AreaRepository.update({ areaId, data });
  },

  async delete({ areaId }: { areaId: string }) {
    const currentArea = await AreaRepository.findById({ areaId });
    if (!currentArea) throw ApiError.NotFound({ model: "Area" });

    return await AreaRepository.delete({ areaId });
  },

  async getDetails({ areaId }: { areaId: string }) {
    const area = await AreaRepository.findById({ areaId });
    if (!area) throw ApiError.NotFound({ model: "Area" });
    return area;
  },

  async getAll({ limit, page, search, isActive, supportType }: { limit: number; page: number; search?: string; isActive?: boolean; supportType?: any }) {
    const where = buildAreaWhere({ search, isActive, supportType });
    const { take, skip } = getPagination({ page, limit });

    const { areas, count } = await AreaRepository.findMany({
      where,
      take,
      skip,
      orderBy: { createdAt: "desc" }
    });

    const totalPages = getTotalPages({ limit, count });
    const pagination = { limit, page, totalPages, total: count };

    return { items: areas, pagination };
  },
};

export default AreaService;