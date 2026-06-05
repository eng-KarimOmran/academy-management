import * as DTO from "./area.dto";
import ApiError from "../../shared/utils/ApiError";
import { getPaginationParams } from "../../shared/utils/Pagination";
import * as areaService from "./area.repository";
import { buildAreaWhere } from "./area.utils";

export const create = async (dataSafe: DTO.CreateDto) => {
  const { body } = dataSafe;

  const areaExists = await areaService.findAreaByName(body.name);

  if (areaExists) throw ApiError.Conflict("Name");

  return await areaService.createArea({ data: body });
};

export const getAll = async (dataSafe: DTO.GetAllDto) => {
  const { limit, page, search, isActive, supportType } = dataSafe.query;

  const where = buildAreaWhere({ search, isActive, supportType });

  const { areas, count } = await areaService.findManyArea({
    where,
    take: limit,
    skip: Math.min(0, page - 1) * limit,
    orderBy: { createdAt: "desc" },
  });

  const { safePage, totalPages } = getPaginationParams({ limit, page, count });

  const pagination = {
    limit,
    page: safePage,
    count,
    totalPages,
  };

  return {
    items: areas,
    pagination,
  };
};

export const getDetails = async (dataSafe: DTO.GetDetailsDto) => {
  const { areaId } = dataSafe.params;

  const area = await areaService.findAreaById(areaId);

  if (!area) throw ApiError.NotFound({ model: "Area" });

  return area;
};

export const update = async (dataSafe: DTO.UpdateDto) => {
  const { body, params } = dataSafe;
  const { areaId } = params;

  const area = await areaService.findAreaById(areaId);

  if (!area) throw ApiError.NotFound({ model: "Area" });

  const areaExists = await areaService.findAreaByName(area.name);

  if (!areaExists) throw ApiError.Conflict("Name");

  const areaUpdate = await areaService.update({ id: areaId, data: body });

  return areaUpdate;
};

export const remove = async (dataSafe: DTO.DeleteDto) => {
  const { areaId } = dataSafe.params;

  const area = await areaService.findAreaById(areaId);
  if (!area) throw ApiError.NotFound({ model: "Area" });

  const areaRemove = await areaService.remove(areaId);

  return areaRemove;
};
