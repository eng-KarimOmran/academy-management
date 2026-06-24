import { userAcademyRelationsSelect, userDetailsSelect } from './../user/user.selectors';
import { prisma } from '../../lib/prisma';
import ApiError from '../../shared/utils/ApiError';
import { GetEmployeesBalancesDto, GetEmployeesDuesDto, ProcessPayrollDto, ProcessPaymentDto, ReceivePaymentDto } from "./account.dto";
import { employeeBalanceUserSelect, secretaryDuesSelect, captainDuesSelect } from './account.selectors';
import { LedgerTransaction, Payroll } from '../../../prisma/generated/client';
import { LedgerTransactionCreateInput, PayrollCreateInput, TransactionClient } from '../../../prisma/generated/internal/prismaNamespace';
import SubscriptionService from '../subscription/subscription.service';
import { ledgerTransactionBaseSelect } from '../ledgerTransaction/ledgerTransaction.selectors';

interface IAccountService {
    getEmployeesBalances: (args: { data: GetEmployeesBalancesDto; tx?: TransactionClient }) => Promise<{
        userId: string;
        name: string;
        phone: string;
        balance: number | undefined;
    }[]>;

    getEmployeesDues: (args: { data: GetEmployeesDuesDto; tx?: TransactionClient }) => Promise<{
        secretary: {
            userId: string;
            name: string;
            phone: string;
            baseSalary: number;
            targetCount: number;
            achievedTargetCount: number;
            isEligibleForBonus: boolean;
            bonusAmount: number;
            grossSalary: number;
        }[];
        captains: {
            userId: string;
            name: string;
            phone: string;
            baseSalary: number;
            currentLessonCount: number;
            captainLessonPrice: number;
            grossSalary: number;
        }[];
    }>;

    processPayroll: (args: { data: ProcessPayrollDto; tx?: TransactionClient }) => Promise<Payroll>;

    processPayment: (args: {
        data: ProcessPaymentDto;
        tx?: TransactionClient;
        dataImg?: { publicId: string; imageUrl: string };
        userLoginId: string;
    }) => Promise<LedgerTransaction>;

    receivePayment: (args: { data: ReceivePaymentDto; tx?: TransactionClient; userLoginId: string }) => Promise<LedgerTransaction>;
}

const AccountService: IAccountService = {
    getEmployeesBalances: async ({ data, tx }) => {
        const { params, query } = data;
        const { academyId } = params;
        const { startDate, endDate } = query;
        const dateRange = { gte: startDate, lte: endDate };

        const run = async (tx: TransactionClient) => {
            const transactions = await tx.ledgerTransaction.findMany({
                where: { academyId, createdAt: dateRange },
                select: {
                    senderType: true,
                    senderId: true,
                    receiverType: true,
                    receiverId: true,
                    amount: true,
                },
            });

            const balances = new Map<string, number>();

            for (const t of transactions) {
                const amount = Number(t.amount ?? 0);

                if (t.receiverType === 'USER') {
                    const current = balances.get(t.receiverId) ?? 0;
                    balances.set(t.receiverId, current + amount);
                }

                if (t.senderType === 'USER') {
                    const current = balances.get(t.senderId) ?? 0;
                    balances.set(t.senderId, current - amount);
                }
            }

            const users = await tx.user.findMany({
                where: { id: { in: [...balances.keys()] } },
                select: employeeBalanceUserSelect
            });

            return users.map((u) => ({
                userId: u.id,
                name: u.name,
                phone: u.phone,
                balance: balances.get(u.id)
            }));
        };

        return tx ? await run(tx) : await prisma.$transaction(run);
    },

    getEmployeesDues: async ({ data, tx }) => {
        const { params, query } = data;
        const { academyId } = params;
        const { startDate, endDate } = query;
        const dateRange = { gte: startDate, lte: endDate };

        const run = async (tx: TransactionClient) => {
            const [subscriptions, lessons] = await Promise.all([
                tx.subscription.groupBy({ by: ["createdById"], where: { academyId, createdAt: dateRange }, _count: { id: true } }),
                tx.lesson.groupBy({ by: ["captainId"], where: { academyId, endTime: dateRange, payout: null, status: { in: ["COMPLETED", "CANCELED_CHARGED"] } }, _count: { id: true } })
            ]);

            const subscriptionsMap = new Map();
            const lessonsMap = new Map();

            subscriptions.forEach((s) => subscriptionsMap.set(s.createdById, s._count.id));
            lessons.forEach((s) => lessonsMap.set(s.captainId, s._count.id));

            const [users, captains] = await Promise.all([
                tx.user.findMany({
                    where: { secretaryProfile: { academyId } },
                    select: secretaryDuesSelect
                }),
                tx.captain.findMany({
                    where: { academyId },
                    select: captainDuesSelect
                })
            ]);

            return {
                secretary: users.map((s) => {
                    const achievedTargetCount = subscriptionsMap.get(s.id) ?? 0;
                    const targetCount = s.secretaryProfile?.targetCount ?? 0;
                    const baseSalary = Number(s.secretaryProfile?.baseSalary ?? 0);
                    const bonusAmount = Number(s.secretaryProfile?.bonusAmount ?? 0);
                    const isEligibleForBonus = achievedTargetCount >= targetCount;
                    const grossSalary = baseSalary + (isEligibleForBonus ? bonusAmount : 0);

                    return {
                        userId: s.id,
                        name: s.name,
                        phone: s.phone,
                        baseSalary,
                        targetCount,
                        achievedTargetCount,
                        isEligibleForBonus,
                        bonusAmount,
                        grossSalary
                    };
                }),
                captains: captains.map((c) => {
                    const baseSalary = Number(c.baseSalary ?? 0);
                    const currentLessonCount = lessonsMap.get(c.id) ?? 0;
                    const captainLessonPrice = Number(c.captainLessonPrice ?? 0);
                    const grossSalary = baseSalary + (captainLessonPrice * currentLessonCount);

                    return {
                        userId: c.user.id,
                        name: c.user.name,
                        phone: c.user.phone,
                        baseSalary,
                        currentLessonCount,
                        captainLessonPrice,
                        grossSalary
                    };
                })
            };
        };

        return tx ? await run(tx) : await prisma.$transaction(run);
    },

    processPayroll: async ({ data, tx }) => {
        const { params, query, body } = data;
        const { academyId, userId } = params;
        const { startDate, endDate } = query;
        const { grossSalary } = body;
        const dateRange = { gte: startDate, lte: endDate };

        const run = async (tx: TransactionClient) => {
            const payroll = await tx.payroll.findFirst({ where: { academyId, userId, startDate, endDate } });
            if (payroll) throw ApiError.Conflict("payroll");

            const user = await tx.user.findUnique({ where: { id: userId }, select: userDetailsSelect });
            if (!user) throw ApiError.NotFound({ model: "User" });

            const belongsToAcademy =
                user.captainProfile?.academyId === academyId ||
                user.secretaryProfile?.academyId === academyId;

            if (!belongsToAcademy) throw ApiError.NotFound({ model: "User" });

            if (user.captainProfile) {
                const lessons = await tx.lesson.findMany({
                    where: {
                        endTime: dateRange,
                        academyId,
                        captainId: user.captainProfile.id,
                        payoutId: null,
                        status: { in: ["COMPLETED", "CANCELED_CHARGED"] }
                    },
                    select: { id: true }
                });

                await Promise.all(lessons.map((l) => tx.lesson.update({
                    where: { id: l.id }, data: {
                        payout: {
                            create: {
                                academyId,
                                captainId: user.captainProfile!.id,
                                totalAmount: user.captainProfile!.captainLessonPrice
                            }
                        }
                    }
                })));
            }

            const payrollData: PayrollCreateInput = {
                academy: { connect: { id: academyId } },
                user: { connect: { id: user.id } },
                startDate,
                endDate,
                grossSalary,
            };
            return await tx.payroll.create({ data: payrollData });
        };

        return tx ? await run(tx) : await prisma.$transaction(run);
    },

    processPayment: async ({ data, tx, dataImg, userLoginId }) => {
        const { params, body } = data;
        const { academyId, subscriptionId } = params;
        const { amount, transactionType, paymentMethod } = body;

        const run = async (tx: TransactionClient) => {
            const sub = await tx.subscription.findUnique({ where: { id: subscriptionId }, select: { id: true } });
            if (!sub) throw ApiError.NotFound({ model: "Subscription" });

            const transactionData: LedgerTransactionCreateInput = {
                academy: { connect: { id: academyId } },
                paymentMethod,
                transactionType,
                amount,
                receiverType: transactionType === "PAYMENT" ? "USER" : "SUBSCRIPTION",
                senderType: transactionType === "PAYMENT" ? "SUBSCRIPTION" : "USER",
                receiverId: transactionType === "PAYMENT" ? userLoginId : subscriptionId,
                senderId: transactionType === "PAYMENT" ? subscriptionId : userLoginId
            };

            if (dataImg) {
                transactionData.proofOfPaymentImage = { create: { ...dataImg } };
            }

            const ledgerTransaction = await tx.ledgerTransaction.create({ data: transactionData, select:ledgerTransactionBaseSelect });
            await SubscriptionService.recalculateSubscriptionStatus({ tx, subscriptionId })
            return ledgerTransaction
        };

        return tx ? await run(tx) : await prisma.$transaction(run);
    },

    receivePayment: async ({ data, tx, userLoginId }) => {
        const { params, body } = data;
        const { academyId, senderId } = params;
        const { amount } = body;

        const run = async (tx: TransactionClient) => {
            const sender = await tx.user.findUnique({ where: { id: senderId }, select: userAcademyRelationsSelect });
            if (!sender) throw ApiError.NotFound({ model: "User" });

            const isOwnerAcademy = sender.academies.map((a) => a.id).includes(academyId);

            const transactionData: LedgerTransactionCreateInput = {
                academy: { connect: { id: academyId } },
                paymentMethod: "CASH",
                transactionType: "TRANSFER",
                amount,
                senderType: "USER",
                receiverId: isOwnerAcademy ? academyId : userLoginId,
                senderId,
                receiverType: isOwnerAcademy ? "ACADEMY" : "USER"
            };

            return await tx.ledgerTransaction.create({ data: transactionData });
        };

        return tx ? await run(tx) : await prisma.$transaction(run);
    }
};

export default AccountService;