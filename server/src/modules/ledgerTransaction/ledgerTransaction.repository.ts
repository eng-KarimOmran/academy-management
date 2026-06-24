import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import { LedgerTransactionAggregateArgs, LedgerTransactionCreateInput, LedgerTransactionUpdateInput, LedgerTransactionWhereInput } from "../../../prisma/generated/models/LedgerTransaction";
import getClient from "../../shared/utils/getClient";

const LedgerTransactionRepository = {
    create: (data: LedgerTransactionCreateInput, tx?: TransactionClient) => {
        const client = getClient(tx);
        return client.ledgerTransaction.create({ data });
    },

    update: (transactionId: string, data: LedgerTransactionUpdateInput, tx?: TransactionClient) => {
        const client = getClient(tx);
        return client.ledgerTransaction.update({
            where: { id: transactionId },
            data,
        });
    },

    delete: (transactionId: string, tx?: TransactionClient) => {
        const client = getClient(tx);
        return client.ledgerTransaction.delete({
            where: { id: transactionId },
        });
    },

    findById: (transactionId: string, tx?: TransactionClient) => {
        const client = getClient(tx);
        return client.ledgerTransaction.findUnique({
            where: { id: transactionId },
            include: {
                proofOfPaymentImage: true,
            },
        });
    },

    findAll: (
        params: {
            where?: LedgerTransactionWhereInput;
            skip?: number;
            take?: number;
        },
        tx?: TransactionClient
    ) => {
        const client = getClient(tx);
        return client.ledgerTransaction.findMany({
            ...params,
            orderBy: { createdAt: "desc" },
            include: {
                proofOfPaymentImage: true,
            },
        });
    },

    count: (where?: LedgerTransactionWhereInput, tx?: TransactionClient) => {
        const client = getClient(tx);
        return client.ledgerTransaction.count({ where });
    },

    aggregate: (
        args: LedgerTransactionAggregateArgs,
        tx?: TransactionClient
    ) => {
        const client = getClient(tx);
        return client.ledgerTransaction.aggregate(args);
    },
    getAllEm: async (
        academyId: string,
        tx?: TransactionClient
    ) => {
        const client = getClient(tx);
        const employees = await client.employee.findMany({ where: { OR: [{ captainProfiles: { some: { academyId } }, secretaryProfiles: { some: { academyId } } }] } })
        
        const m = Promise.all()
        return
    },
};

export default LedgerTransactionRepository;