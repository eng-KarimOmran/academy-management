import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import getClient from "../../shared/utils/getClient";

const DashboardRepository = {
    async getRawAnalytics({
        academyId,
        timeFrames,
        tx,
    }: {
        academyId: string;
        timeFrames: {
            operational: { gte: Date; lte: Date };
            financial: { gte: Date; lt: Date };
        };
        tx?: TransactionClient;
    }) {
        const client = getClient(tx);
        const [
            newSubscriptions,
            pendingPayments,
            newClientsCount,
            coursesStats,
            lessonsStats,
        ] = await Promise.all([
            client.subscription.findMany({
                where: { academyId, createdAt: timeFrames.financial }, // بريسما هتقبلها وتشتغل طلقة
                select: { priceAtBooking: true, status: true },
            }),
            client.paymentTransaction.findMany({
                where: {
                    academyId,
                    createdAt: timeFrames.financial,
                    paymentMethod: { not: "CASH" },
                },
                select: { amount: true, status: true },
            }),
            client.client.count({
                where: { academyId, createdAt: timeFrames.financial },
            }),
            client.course.findMany({
                where: { academyId },
                select: {
                    id: true,
                    title: true,
                    priceOriginal: true,
                    _count: {
                        select: { subscriptions: { where: { createdAt: timeFrames.financial } } },
                    },
                },
            }),
            client.lesson.findMany({
                where: { academyId, startTime: timeFrames.operational },
                select: {
                    status: true,
                    captain: { select: { id: true, name: true } },
                    car: { select: { id: true, model: true, plateNumber: true } },
                    area: { select: { id: true, name: true } },
                },
            }),
        ]);
        return {
            newSubscriptions,
            pendingPayments,
            newClientsCount,
            coursesStats,
            lessonsStats,
        };
    },
};

export default DashboardRepository;