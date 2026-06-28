import * as utils from "./ledgerTransaction.utils";
import * as Dto from "./ledgerTransaction.dto";
import ApiError from "../../shared/utils/ApiError";
import LedgerTransactionRepository from "./ledgerTransaction.repository";
import { buildPagination, buildPaginationMeta } from "../../shared/utils/Pagination";
import { ILedgerTransactionService } from "./ledgerTransaction.type";
import { prisma } from "../../lib/prisma";
import { LedgerTransactionCreateInput, LedgerTransactionUpdateInput } from "../../../prisma/generated/models";

const LedgerTransactionService: ILedgerTransactionService = {
  async create(dataSafe: Dto.CreateLedgerTransactionDto) {
    const { academyId } = dataSafe.params;

    const {
      paymentMethod,
      senderId,
      receiverId,
      proofOfPaymentImage,
      subscriptionId,
      amount,
      transactionType
    } = dataSafe.body;

    if (paymentMethod === "ELECTRONIC_WALLET" && !proofOfPaymentImage) {
      throw ApiError.ValidationError("يجب إرسال صورة تأكيد عملية الدفع.");
    }

    return prisma.$transaction(async (tx) => {
      const { sender, receiver, subscription } = await utils.getTransferEntities({ senderId, receiverId, subscriptionId, tx });
      const { receiverType, senderType, transactionDirection } = utils.transactionConfig[transactionType];

      if (subscription) {
        const { residual } = utils.calculateLedgerSummary(
          subscription.ledgerTransactions,
          subscription.priceAtBooking,
        );
        const remaining = residual ?? 0;
        if (remaining <= 0) {
          throw ApiError.Conflict("SUBSCRIPTION_ALREADY_PAID");
        }
        if (amount > remaining) {
          throw ApiError.Conflict("OVERPAYMENT");
        }
      }

      const dataLedgerTransaction: LedgerTransactionCreateInput = {
        academy: { connect: { id: academyId } },
        amount,
        paymentMethod,
        receiver: { connect: { id: receiverId } },
        sender: { connect: { id: senderId } },
        receiverType,
        senderType,
        transactionType,
        transactionDirection,
        ...(subscriptionId && { subscription: { connect: { id: subscriptionId } } }),
        ...(proofOfPaymentImage && { proofOfPaymentImage: { create: proofOfPaymentImage } })
      };

      return LedgerTransactionRepository.create(dataLedgerTransaction, tx);
    });
  },

  async update({ params, body }: Dto.UpdateLedgerTransactionDto) {
    const { transactionId } = params;
    const {
      transactionType,
      paymentMethod,
      senderId,
      receiverId,
      amount,
      subscriptionId,
      proofOfPaymentImage,
    } = body;

    return prisma.$transaction(async (tx) => {
      const existingTransaction = await utils.getLedgerTransactionOrThrow(transactionId, tx);
      const currentTransactionType = transactionType || existingTransaction.transactionType;
      const { receiverType, senderType, transactionDirection } = utils.transactionConfig[currentTransactionType];

      const data: LedgerTransactionUpdateInput = {
        senderType,
        receiverType,
        transactionType,
        transactionDirection,
        paymentMethod,
        amount,
        ...(senderId && { sender: { connect: { id: senderId } } }),
        ...(receiverId && { receiver: { connect: { id: receiverId } } }),
        ...(subscriptionId && { subscription: { connect: { id: subscriptionId } } }),
        ...(proofOfPaymentImage && {
          proofOfPaymentImage: {
            upsert: {
              create: {
                imageUrl: proofOfPaymentImage.imageUrl,
                publicId: proofOfPaymentImage.publicId,
              },
              update: {
                imageUrl: proofOfPaymentImage.imageUrl,
                publicId: proofOfPaymentImage.publicId,
              },
            },
          },
        }),
      };

      return LedgerTransactionRepository.update(transactionId, data, tx);
    });
  },

  async delete({ params }: Dto.DeleteLedgerTransactionDto) {
    const { transactionId } = params;

    return prisma.$transaction(async (tx) => {
      await utils.getLedgerTransactionOrThrow(transactionId, tx);
      return LedgerTransactionRepository.delete(transactionId, tx);
    });
  },

  async getDetails({ params }: Dto.GetLedgerTransactionDto) {
    return prisma.$transaction(async (tx) => {
      return utils.getLedgerTransactionOrThrow(params.transactionId, tx);
    });
  },

  async getAll({ params, query }: Dto.GetAllLedgerTransactionsDto) {
    const { academyId } = params;
    const { limit, page, search, senderType, receiverType, transactionType, paymentMethod } = query;

    const where = utils.buildLedgerTransactionWhere({
      search,
      academyId,
      senderType,
      receiverType,
      transactionType,
      paymentMethod,
    });

    const { take, skip } = buildPagination({ page, limit });

    const { transactions, count } = await prisma.$transaction(async (tx) => {
      const [transactions, count] = await Promise.all([
        LedgerTransactionRepository.findAll({ where, take, skip }, tx),
        LedgerTransactionRepository.count(where, tx),
      ]);

      return { transactions, count };
    });

    const pagination = buildPaginationMeta({ limit, count, page });

    return { items: transactions, pagination };
  },

  async getCurrentUserDues(userId: string) {
    return prisma.$transaction(async (tx) => {
      const [incoming, outgoing] = await Promise.all([
        LedgerTransactionRepository.aggregate(
          {
            where: { receiver: { user: { id: userId } } },
            _sum: { amount: true },
          },
          tx
        ),
        LedgerTransactionRepository.aggregate(
          {
            where: { sender: { user: { id: userId } } },
            _sum: { amount: true },
          },
          tx
        ),
      ]);

      const totalIn = Number(incoming._sum?.amount ?? 0);
      const totalOut = Number(outgoing._sum?.amount ?? 0);

      return { totalDebt: totalIn - totalOut }
    });
  },

  async getAcademyUsersDues(academyId: string) {
    return prisma.$transaction(async (tx) => {
      const persons = await tx.person.findMany({ where: {} });

      const usersDues = await Promise.all(
        persons.map(async (person) => {
          const [incoming, outgoing] = await Promise.all([
            LedgerTransactionRepository.aggregate(
              {
                where: { receiverId: person.id },
                _sum: { amount: true },
              },
              tx
            ),
            LedgerTransactionRepository.aggregate(
              {
                where: { senderId: person.id },
                _sum: { amount: true },
              },
              tx
            ),
          ]);

          const balance =
            Number(incoming._sum?.amount ?? 0) -
            Number(outgoing._sum?.amount ?? 0);

          return {
            personId: person.id,
            name: person.name,
            balance,
          };
        })
      );

      const totalDues = usersDues.reduce(
        (sum, user) => sum + user.balance,
        0
      );

      return {
        users: usersDues,
        totalDues,
      };
    });
  }
};

export default LedgerTransactionService;