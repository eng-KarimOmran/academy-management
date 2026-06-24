import { ClientWhereInput } from './../../../prisma/generated/models/Client';
import * as DTO from "./dashboard.dto";
import {
    LedgerTransactionWhereInput,
    LessonWhereInput,
    SubscriptionWhereInput,
    TransactionClient
} from "../../../prisma/generated/internal/prismaNamespace";
import { prisma } from '../../lib/prisma';

interface IDashboardService {
    clients: (data: { dataSafe: DTO.GetDashboardAnalyticsDto; tx?: TransactionClient }) => Promise<{
        officeCount: number;
        platformCount: number;
        totalClient: number;
    }>;

    courses: (data: { dataSafe: DTO.GetDashboardAnalyticsDto; tx?: TransactionClient }) => Promise<{
        courseId: string;
        name: string;
        count: number;
    }[]>;

    subscriptions: (data: { dataSafe: DTO.GetDashboardAnalyticsDto; tx?: TransactionClient }) => Promise<{
        subscriptionActive: number;
        subscriptionActiveLimited: number;
        subscriptionCanceled: number;
        subscriptionCompleted: number;
        subscriptionPendingDeposit: number;
        totalSubscription: number;
    }>;

    transactions: (data: { dataSafe: DTO.GetDashboardAnalyticsDto; tx?: TransactionClient }) => Promise<{
        totalCash: number;
        totalRefund: number;
        totalCollected: number;
        totalWallet:number
    }>;

    lessons: (data: { dataSafe: DTO.GetDashboardAnalyticsDto; tx?: TransactionClient }) => Promise<{
        lessonCanceled: number;
        lessonCanceledCharged: number;
        lessonCompleted: number;
        lessonScheduled: number;
        lessonAutomatic: number;
        lessonManual: number;
        totalLesson: number;
    }>;

    area: (data: { dataSafe: DTO.GetDashboardAnalyticsDto; tx?: TransactionClient }) => Promise<{
        areaId: string;
        name: string;
        countLesson: number;
    }[]>;

    car: (data: { dataSafe: DTO.GetDashboardAnalyticsDto; tx?: TransactionClient }) => Promise<{
        carId: string;
        modelName: string;
        plateNumber: string;
        countLesson: number;
    }[]>;

    captain: (data: { dataSafe: DTO.GetDashboardAnalyticsDto; tx?: TransactionClient }) => Promise<{
        captainId: string;
        userId: string;
        name: string;
        phone: string;
        countLesson: number;
    }[]>;

    usersCreatedSubscription: (data: { dataSafe: DTO.GetDashboardAnalyticsDto; tx?: TransactionClient }) => Promise<{
        userId: string;
        name: string;
        phone: string;
        countSubscription: number;
    }[]>;
}

const DashboardService: IDashboardService = {
    clients: async ({ dataSafe, tx }) => {
        const { params, query } = dataSafe;
        const { academyId } = params
        const { startDate, endDate } = query
        const dateRange = { gte: startDate, lte: endDate };
        const baseWhere: ClientWhereInput = { academyId, createdAt: dateRange };

        const run = async (tx: TransactionClient) => {
            const [officeCount, platformCount] = await Promise.all([
                tx.client.count({ where: { ...baseWhere, clientSource: "OFFICE" } }),
                tx.client.count({ where: { ...baseWhere, clientSource: "PLATFORM" } }),
            ])

            return {
                officeCount,
                platformCount,
                totalClient: officeCount + platformCount
            }
        }

        return tx ? await run(tx) : await prisma.$transaction(run);
    },

    courses: async ({ dataSafe, tx }) => {
        const { params, query } = dataSafe;
        const { academyId } = params
        const { startDate, endDate } = query
        const dateRange = { gte: startDate, lte: endDate };
        const baseWhere: SubscriptionWhereInput = { academyId, createdAt: dateRange };

        const run = async (tx: TransactionClient) => {
            const courseStats = await tx.subscription.groupBy({ by: ["courseId"], where: { ...baseWhere }, _count: { id: true } })
            const courseMap = new Map()
            courseStats.forEach((c) => { courseMap.set(c.courseId, c._count.id) })

            const courses = await tx.course.findMany({ where: { id: { in: courseStats.map((c) => c.courseId) } }, select: { id: true, name: true } })

            return courses.map((c) => ({
                courseId: c.id,
                name: c.name,
                count: courseMap.get(c.id),
            }))
        }

        return tx ? await run(tx) : await prisma.$transaction(run);
    },

    subscriptions: async ({ dataSafe, tx }) => {
        const { params, query } = dataSafe;
        const { academyId } = params
        const { startDate, endDate } = query
        const dateRange = { gte: startDate, lte: endDate };
        const baseWhere: SubscriptionWhereInput = { academyId, createdAt: dateRange };

        const run = async (tx: TransactionClient) => {
            const [subscriptionActive, subscriptionActiveLimited, subscriptionCanceled, subscriptionCompleted, subscriptionPendingDeposit] = await Promise.all([
                tx.subscription.count({ where: { ...baseWhere, status: "ACTIVE" } }),
                tx.subscription.count({ where: { ...baseWhere, status: "ACTIVE_LIMITED" } }),
                tx.subscription.count({ where: { ...baseWhere, status: "CANCELED" } }),
                tx.subscription.count({ where: { ...baseWhere, status: "COMPLETED" } }),
                tx.subscription.count({ where: { ...baseWhere, status: "PENDING_DEPOSIT" } }),
            ])

            return {
                subscriptionActive,
                subscriptionActiveLimited,
                subscriptionCanceled,
                subscriptionCompleted,
                subscriptionPendingDeposit,
                totalSubscription: subscriptionActive + subscriptionActiveLimited + subscriptionCanceled + subscriptionCompleted + subscriptionPendingDeposit
            }
        }

        return tx ? await run(tx) : await prisma.$transaction(run);
    },

    transactions: async ({ dataSafe, tx }) => {
        const { params, query } = dataSafe;
        const { academyId } = params
        const { startDate, endDate } = query
        const dateRange = { gte: startDate, lte: endDate };
        const baseWhere: LedgerTransactionWhereInput = { academyId, createdAt: dateRange }

        const run = async (tx: TransactionClient) => {
            const [cashPaymentAggregate, walletPaymentAggregate, refundAggregate] = await Promise.all([
                tx.ledgerTransaction.aggregate({ where: { ...baseWhere, transactionType: "PAYMENT", paymentMethod: "CASH" }, _sum: { amount: true } }),
                tx.ledgerTransaction.aggregate({ where: { ...baseWhere, transactionType: "PAYMENT", paymentMethod: "ELECTRONIC_WALLET" }, _sum: { amount: true } }),
                tx.ledgerTransaction.aggregate({ where: { ...baseWhere, transactionType: "REFUND" }, _sum: { amount: true } }),
            ])

            const cash = Number(cashPaymentAggregate._sum.amount ?? 0);
            const wallet = Number(walletPaymentAggregate._sum.amount ?? 0);
            const refund = Number(refundAggregate._sum.amount ?? 0);

            return { totalCash: cash, totalWallet: wallet, totalRefund: refund, totalCollected: cash + wallet - refund }
        }

        return tx ? await run(tx) : await prisma.$transaction(run);
    },

    lessons: async ({ dataSafe, tx }) => {
        const { params, query } = dataSafe;
        const { academyId } = params
        const { startDate, endDate } = query
        const dateRange = { gte: startDate, lte: endDate };
        const baseWhere: LessonWhereInput = { academyId, endTime: dateRange };
        const run = async (tx: TransactionClient) => {
            const [lessonCanceled, lessonCanceledCharged, lessonCompleted, lessonScheduled, lessonAutomatic, lessonManual] = await Promise.all([
                tx.lesson.count({ where: { ...baseWhere, status: "CANCELED" } }),
                tx.lesson.count({ where: { ...baseWhere, status: "CANCELED_CHARGED" } }),
                tx.lesson.count({ where: { ...baseWhere, status: "COMPLETED" } }),
                tx.lesson.count({ where: { ...baseWhere, status: "SCHEDULED" } }),
                tx.lesson.count({ where: { ...baseWhere, transmission: "AUTOMATIC" } }),
                tx.lesson.count({ where: { ...baseWhere, transmission: "MANUAL" } }),
            ])

            return {
                lessonCanceled,
                lessonCanceledCharged,
                lessonCompleted,
                lessonScheduled,
                lessonAutomatic,
                lessonManual,
                totalLesson: lessonAutomatic + lessonManual
            }
        }

        return tx ? await run(tx) : await prisma.$transaction(run);
    },

    area: async ({ dataSafe, tx }) => {
        const { params, query } = dataSafe;
        const { academyId } = params
        const { startDate, endDate } = query
        const dateRange = { gte: startDate, lte: endDate };
        const baseWhere: LessonWhereInput = { academyId, endTime: dateRange };

        const run = async (tx: TransactionClient) => {
            const areaStats = await tx.lesson.groupBy({ by: ["areaId"], where: { ...baseWhere }, _count: { id: true } })
            const areaMap = new Map()
            areaStats.forEach((a) => { areaMap.set(a.areaId, a._count.id) })

            const areas = await tx.area.findMany({ where: { id: { in: areaStats.map((a) => a.areaId) } }, select: { id: true, name: true } })

            return areas.map((a) => ({
                areaId: a.id,
                name: a.name,
                countLesson: areaMap.get(a.id),
            }))
        }

        return tx ? await run(tx) : await prisma.$transaction(run);
    },

    car: async ({ dataSafe, tx }) => {
        const { params, query } = dataSafe;
        const { academyId } = params
        const { startDate, endDate } = query
        const dateRange = { gte: startDate, lte: endDate };
        const baseWhere: LessonWhereInput = { academyId, endTime: dateRange };

        const run = async (tx: TransactionClient) => {
            const carStats = await tx.lesson.groupBy({ by: ["carId"], where: { ...baseWhere }, _count: { id: true } })
            const carMap = new Map()
            carStats.forEach((c) => { carMap.set(c.carId, c._count.id) })

            const cars = await tx.car.findMany({ where: { id: { in: carStats.map((c) => c.carId) } }, select: { id: true, modelName: true, plateNumber: true } })

            return cars.map((c) => ({
                carId: c.id,
                modelName: c.modelName,
                plateNumber: c.plateNumber,
                countLesson: carMap.get(c.id),
            }))
        }

        return tx ? await run(tx) : await prisma.$transaction(run);
    },

    captain: async ({ dataSafe, tx }) => {
        const { params, query } = dataSafe;
        const { academyId } = params
        const { startDate, endDate } = query
        const dateRange = { gte: startDate, lte: endDate };
        const baseWhere: LessonWhereInput = { academyId, endTime: dateRange };

        const run = async (tx: TransactionClient) => {
            const captainStats = await tx.lesson.groupBy({ by: ["captainId"], where: { ...baseWhere }, _count: { id: true } })
            const captainMap = new Map()
            captainStats.forEach((c) => { captainMap.set(c.captainId, c._count.id) })

            const captains = await tx.captain.findMany({ where: { id: { in: captainStats.map((c) => c.captainId) } }, select: { id: true, user: { select: { id: true, name: true, phone: true } } } })

            return captains.map((c) => ({
                captainId: c.id,
                userId: c.user.id,
                name: c.user.name,
                phone: c.user.phone,
                countLesson: captainMap.get(c.id),
            }))
        }

        return tx ? await run(tx) : await prisma.$transaction(run);
    },

    usersCreatedSubscription: async ({ dataSafe, tx }) => {
        const { params, query } = dataSafe;
        const { academyId } = params
        const { startDate, endDate } = query
        const dateRange = { gte: startDate, lte: endDate };
        const baseWhere: SubscriptionWhereInput = { academyId, createdAt: dateRange };

        const run = async (tx: TransactionClient) => {
            const userStats = await tx.subscription.groupBy({ by: ["createdById"], where: { ...baseWhere }, _count: { id: true } })
            const userMap = new Map()
            userStats.forEach((u) => { userMap.set(u.createdById, u._count.id) })

            const users = await tx.user.findMany({ where: { id: { in: userStats.map((c) => c.createdById) } }, select: { id: true, name: true, phone: true } })

            return users.map((u) => ({
                userId: u.id,
                name: u.name,
                phone: u.phone,
                countSubscription: userMap.get(u.id),
            }))
        }

        return tx ? await run(tx) : await prisma.$transaction(run);
    },
}

export default DashboardService;