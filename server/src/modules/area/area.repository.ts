import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import { AreaCreateInput, AreaUpdateInput, AreaWhereInput } from "../../../prisma/generated/models/Area";
import getClient from "../../shared/utils/getClient";

const AreaRepository = {
    create: (data: AreaCreateInput, tx?: TransactionClient) => {
        const client = getClient(tx);
        return client.area.create({ data });
    },

    update: (areaId: string, data: AreaUpdateInput, tx?: TransactionClient) => {
        const client = getClient(tx);
        return client.area.update({
            where: { id: areaId },
            data,
        });
    },

    delete: (areaId: string, tx?: TransactionClient) => {
        const client = getClient(tx);
        return client.area.delete({
            where: { id: areaId },
        });
    },

    findById: (areaId: string, tx?: TransactionClient) => {
        const client = getClient(tx);
        return client.area.findUnique({
            where: { id: areaId },
        });
    },

    findByNameAndAcademy: (name: string, academyId: string, tx?: TransactionClient) => {
        const client = getClient(tx);
        return client.area.findUnique({
            where: { name_academyId: { academyId, name } }
        });
    },

    findAll: (
        params: {
            where?: AreaWhereInput;
            skip?: number;
            take?: number;
        },
        tx?: TransactionClient
    ) => {
        const client = getClient(tx);
        return client.area.findMany({ ...params, orderBy: { createdAt: "desc" } });
    },

    count: (where?: AreaWhereInput, tx?: TransactionClient) => {
        const client = getClient(tx);
        return client.area.count({ where });
    },
};

export default AreaRepository;