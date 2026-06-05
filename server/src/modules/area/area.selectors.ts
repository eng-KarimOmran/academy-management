import { AreaSelect } from "../../../prisma/generated/models/Area";

export const areaBaseSelect: AreaSelect = {
  id: true,
  name: true,
  supportType: true,
  isActive: true,
};
