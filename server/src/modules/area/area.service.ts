import { buildAreaWhere, getAreaOrThrow } from "./area.utils";
import { AreaCreateInput, AreaUpdateInput } from "../../../prisma/generated/models/Area";
import ApiError from "../../shared/utils/ApiError";
import { prisma } from "../../lib/prisma";
import { IAreaService } from "./area.type";
import AreaRepository from "./area.repository";
import { buildPagination, buildPaginationMeta } from "../../shared/utils/Pagination";

const AreaService: IAreaService = {
  async create({ params, body }) {
    const { academyId } = params;
    const { name, supportType } = body;

    return prisma.$transaction(async (tx) => {
      const areaExists = await AreaRepository.findByNameAndAcademy(name, academyId, tx);
      if (areaExists) throw ApiError.Conflict("Name");

      const data: AreaCreateInput = {
        name,
        supportType,
        isActive: true,
        academy: { connect: { id: academyId } },
      };

      return AreaRepository.create(data, tx);
    });
  },

  async update({ params, body }) {
    const { areaId, academyId } = params;
    const { name, supportType, isActive } = body;

    return prisma.$transaction(async (tx) => {
      const areaEx = await getAreaOrThrow(areaId, tx);

      if (name && name !== areaEx.name) {
        const nameExists = await AreaRepository.findByNameAndAcademy(name, academyId, tx);
        if (nameExists) throw ApiError.Conflict("Name");
      }

      const data: AreaUpdateInput = { name, supportType, isActive };

      return AreaRepository.update(areaId, data, tx);
    });
  },

  async delete({ params }) {
    const { areaId } = params;

    return prisma.$transaction(async (tx) => {
      await getAreaOrThrow(areaId, tx);
      return AreaRepository.delete(areaId, tx);
    });
  },

  async getDetails({ params }) {
    return prisma.$transaction(async (tx) => {
      return getAreaOrThrow(params.areaId, tx);
    });
  },

  async getAll({ params, query }) {
    const { academyId } = params;
    const { limit, page, search, isActive, supportType } = query;

    const where = buildAreaWhere({ search, academyId, isActive, supportType });
    const { take, skip } = buildPagination({ page, limit });

    const { areas, count } = await prisma.$transaction(async (tx) => {
      const [areas, count] = await Promise.all([
        AreaRepository.findAll({ where, take, skip }, tx),
        AreaRepository.count(where, tx),
      ]);

      return { areas, count };
    });

    const pagination = buildPaginationMeta({ limit, count, page });

    return { items: areas, pagination };
  },
};

export default AreaService;