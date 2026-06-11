import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import {
  CarCreateInput,
  CarOrderByWithRelationInput,
  CarSelect,
  CarUpdateInput,
  CarWhereInput,
} from "../../../prisma/generated/models";
import { carBaseSelect } from "./car.selectors";
import getClient from "../../shared/utils/getClient"

const CarRepository = {
  async create({ data, select, tx }: { data: CarCreateInput; select?: CarSelect; tx?: TransactionClient }) {
    return getClient(tx).car.create({
      data,
      select: select ?? carBaseSelect,
    });
  },

  async update({ carId, data, select, tx }: { carId: string; data: CarUpdateInput; select?: CarSelect; tx?: TransactionClient }) {
    return getClient(tx).car.update({
      where: { id: carId },
      data,
      select: select ?? carBaseSelect,
    });
  },

  async delete({ carId, select, tx }: { carId: string; select?: CarSelect; tx?: TransactionClient }) {
    return getClient(tx).car.delete({
      where: { id: carId },
      select: select ?? carBaseSelect,
    });
  },

  async findById({ carId, select, tx }: { carId: string; select?: CarSelect; tx?: TransactionClient }) {
    return getClient(tx).car.findUnique({
      where: { id: carId },
      select: select ?? carBaseSelect,
    });
  },

  async findByPlateNumber({ plateNumber, select, tx }: { plateNumber: string; select?: CarSelect; tx?: TransactionClient }) {
    return getClient(tx).car.findUnique({
      where: { plateNumber },
      select: select ?? carBaseSelect,
    });
  },

  async findMany({ where, skip, take, orderBy, select, tx }: { skip?: number; take?: number; where?: CarWhereInput; orderBy?: CarOrderByWithRelationInput; select?: CarSelect; tx?: TransactionClient }) {
    const client = getClient(tx);
    const [cars, count] = await Promise.all([
      client.car.findMany({ where, skip, take, orderBy, select: select ?? carBaseSelect }),
      client.car.count({ where }),
    ]);

    return { cars, count };
  }
};

export default CarRepository;