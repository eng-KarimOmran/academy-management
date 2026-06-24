import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import {
    AcademyCreateInput,
    AcademyUpdateInput,
    AcademyWhereInput,
} from "../../../prisma/generated/models/Academy";
import getClient from "../../shared/utils/getClient";


const AcademyRepository = {
    create: (data: AcademyCreateInput, tx?: TransactionClient) => {
        const client = getClient(tx);
        return client.academy.create({ data });
    },

    update: (academyId: string, data: AcademyUpdateInput, tx?: TransactionClient) => {
        const client = getClient(tx);
        return client.academy.update({
            where: { id: academyId },
            data,
        });
    },

    delete: (academyId: string, tx?: TransactionClient) => {
        const client = getClient(tx);
        return client.academy.delete({
            where: { id: academyId },
        });
    },

    findById: (academyId: string, tx?: TransactionClient) => {
        const client = getClient(tx);
        return client.academy.findUnique({
            where: { id: academyId },
        });
    },

    getAcademyDetails: (academyId: string, tx?: TransactionClient) => {
        const client = getClient(tx);
        return client.academy.findUnique({
            where: { id: academyId },
            include: {
                owners: true,
                phones: true,
                addresses: true,
                paymentLinks: true,
                socialMedia: true,
            }
        });
    },

    findByName: (name: string, tx?: TransactionClient) => {
        const client = getClient(tx);
        return client.academy.findUnique({
            where: { name },
        });
    },
    findByPhone: async (phone: string, tx?: TransactionClient) => {
        const client = getClient(tx);
        const academy = await client.academyPhone.findUnique({
            where: { phone },
            include: { academy: true }
        });
        return academy?.academy
    }
    ,
    findAll: (
        params: {
            where?: AcademyWhereInput;
            skip?: number;
            take?: number;
        },
        tx?: TransactionClient
    ) => {
        const client = getClient(tx);
        return client.academy.findMany({ ...params, orderBy: { createdAt: "desc" } });
    },

    count: (where?: AcademyWhereInput, tx?: TransactionClient) => {
        const client = getClient(tx);
        return client.academy.count({ where });
    },

    addOwner: (academyId: string, userId: string, tx?: TransactionClient) => {
        const client = getClient(tx);
        return client.academy.update({
            where: { id: academyId },
            data: {
                owners: {
                    connect: {
                        id: userId
                    }
                }
            },
        });
    },

    removeOwner: (academyId: string, userId: string, tx?: TransactionClient) => {
        const client = getClient(tx);
        return client.academy.update({
            where: { id: academyId },
            data: {
                owners: {
                    disconnect: { id: userId },
                },
            },
        });
    },

    addPhone: (academyId: string, phone: string, tx?: TransactionClient) => {
        const client = getClient(tx);
        return client.academy.update({
            where: { id: academyId },
            data: {
                phones: {
                    create: { phone },
                },
            },
        });
    },

    deletePhone: (academyId: string, phoneId: string, tx?: TransactionClient) => {
        const client = getClient(tx);
        return client.academy.update({
            where: { id: academyId },
            data: {
                phones: {
                    delete: { id: phoneId },
                },
            },
        });
    },

    addAddress: (academyId: string, address: string, tx?: TransactionClient) => {
        const client = getClient(tx);
        return client.academy.update({
            where: { id: academyId },
            data: {
                addresses: {
                    create: { address },
                },
            },
        });
    },

    deleteAddress: (academyId: string, addressId: string, tx?: TransactionClient
    ) => {
        const client = getClient(tx);
        return client.academy.update({
            where: { id: academyId },
            data: {
                addresses: {
                    delete: { id: addressId },
                },
            },
        });
    },

    addSocialMedia: (academyId: string, data: { platform: string; url: string }, tx?: TransactionClient
    ) => {
        const client = getClient(tx);
        return client.academy.update({
            where: { id: academyId },
            data: {
                socialMedia: {
                    create: data,
                },
            },
        });
    },

    deleteSocialMedia: (academyId: string, socialMediaId: string, tx?: TransactionClient
    ) => {
        const client = getClient(tx);
        return client.academy.update({
            where: { id: academyId },
            data: {
                socialMedia: {
                    delete: { id: socialMediaId },
                },
            },
        });
    },
};

export default AcademyRepository