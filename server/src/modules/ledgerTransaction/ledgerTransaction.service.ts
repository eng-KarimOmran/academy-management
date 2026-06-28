import { LedgerTransactionCreateInput } from './../../../prisma/generated/models/LedgerTransaction';
import { ILedgerTransactionService } from './ledgerTransaction.type';
import { prisma } from "../../lib/prisma";
import ApiError from "../../shared/utils/ApiError";
import SubscriptionService from "../subscription/subscription.service";
import { buildLedgerTransactionWhere, orderBy } from './ledgerTransaction.utils';
import { buildPagination, buildPaginationMeta } from '../../shared/utils/Pagination';
import { TransactionClient } from '../../../prisma/generated/internal/prismaNamespace';

const LedgerTransactionService: ILedgerTransactionService = {
  async createLedgerTransaction({ params, body }, tx) {
    const { academyId } = params;

    const run = (async (tx: TransactionClient) => {
      let imageId: string | undefined;

      const {
        senderId,
        receiverId,
        subscriptionId,
        image,
        amount,
        paymentMethod,
        transactionType,
      } = body;

      const [sender, receiver] = await Promise.all([
        tx.financialAccount.findUnique({ where: { id: senderId } }),
        tx.financialAccount.findUnique({ where: { id: receiverId } }),
      ]);

      if (!sender) throw ApiError.NotFound("Sender");
      if (!receiver) throw ApiError.NotFound("Receiver");

      if (subscriptionId) {
        const subscription = await tx.subscription.findUnique({
          where: { id: subscriptionId },
          include: { financialAccount: true }
        })

        if (!subscription) throw ApiError.NotFound("Subscription")
        if (!subscription.financialAccount) throw ApiError.NotFound("financialAccount")
        const balance = subscription.financialAccount.balance
        const netPaid = subscription.priceAtBooking - balance

        if (netPaid >= subscription.priceAtBooking) {
          throw ApiError.Conflict("SUBSCRIPTION_ALREADY_PAID")
        }

        if (transactionType === "CUSTOMER_PAYMENT") {
          if (netPaid + amount > subscription.priceAtBooking) {
            throw ApiError.Conflict("OVERPAYMENT")
          }
          if (senderId !== subscription.financialAccount?.id) {
            throw ApiError.Conflict("PAYMENT_SENDER_MUST_BE_SUBSCRIPTION")
          }
        }

        if (transactionType === "CUSTOMER_REFUND") {
          if (netPaid < amount) {
            throw ApiError.Conflict("EXCESS_REFUND")
          }
          if (receiverId !== subscription.financialAccount?.id) {
            throw ApiError.Conflict("REFUND_RECEIVER_MUST_BE_SUBSCRIPTION")
          }
        }
      }


      if (image) {
        const createdImage = await tx.image.create({
          data: {
            publicId: image.publicId,
            imageUrl: image.imageUrl,
          },
        });
        imageId = createdImage.id;
      }

      const dataLedgerTransaction: LedgerTransactionCreateInput = {
        academy: { connect: { id: academyId } },
        receiver: { connect: { id: receiverId } },
        sender: { connect: { id: senderId } },
        amount,
        paymentMethod,
        transactionType,
        ...(imageId && { image: { connect: { id: imageId } } }),
        ...(subscriptionId && { subscription: { connect: { id: subscriptionId } } }),
      }

      const [ledgerTransaction] = await Promise.all([
        tx.ledgerTransaction.create({ data: dataLedgerTransaction }),
        tx.financialAccount.update({ where: { id: receiverId }, data: { balance: { increment: amount } } }),
        tx.financialAccount.update({ where: { id: senderId }, data: { balance: { decrement: amount } } }),
      ])


      if (subscriptionId) {
        await SubscriptionService.recalculateSubscriptionStatus({ subscriptionId, tx });
      }

      return ledgerTransaction
    });

    return tx ? await run(tx) : await prisma.$transaction(run);
  },
  async getAllLedgerTransactions({ params, query }) {
    const { academyId } = params;

    const {
      page,
      limit,
      search,
      paymentMethod,
      transactionType,
    } = query;

    const where = buildLedgerTransactionWhere({
      academyId,
      search,
      paymentMethod,
      transactionType,
    });

    const { take, skip } = buildPagination({
      page,
      limit,
    });

    const [items, count] = await prisma.$transaction([
      prisma.ledgerTransaction.findMany({
        where,
        skip,
        take,
        orderBy,
        include: {
          image: true,
        },
      }),

      prisma.ledgerTransaction.count({
        where,
      }),
    ]);

    return {
      items,
      pagination: buildPaginationMeta({
        count,
        page,
        limit,
      }),
    };
  },
  async getLedgerTransactionDetails({ params }) {
    const { academyId, ledgerTransactionId } = params;

    const ledgerTransaction = await prisma.ledgerTransaction.findFirst({
      where: {
        id: ledgerTransactionId,
        academyId,
      },
      include: {
        sender: { select: { academy: { select: { id: true, name: true } }, jobProfile: { select: { id: true, user: { select: { id: true, name: true, phone: true } } } }, subscription: { select: { id: true, client: { select: { id: true, name: true, phone: true } } } } } },
        receiver: { select: { academy: { select: { id: true, name: true } }, jobProfile: { select: { id: true, user: { select: { id: true, name: true, phone: true } } } }, subscription: { select: { id: true, client: { select: { id: true, name: true, phone: true } } } } } },
        lessons: true,
        image: true,
        academy: true,
      },
    });

    if (!ledgerTransaction) {
      throw ApiError.NotFound("LedgerTransaction");
    }

    return ledgerTransaction;
  }
};

export default LedgerTransactionService;