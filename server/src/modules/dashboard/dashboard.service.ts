import dayjs from "dayjs";
import ClientRepository from "../client/client.repository";
import CourseRepository from "../course/course.repository";
import * as DTO from "./dashboard.dto";
import SubscriptionRepository from "../subscription/subscription.repository";
import PaymentTransactionRepository from "../paymentTransaction/paymentTransaction.repository";
import LessonRepository from "../lesson/lesson.repository";


const DashboardService = {
    clients: async ({ params, query }: DTO.GetDashboardAnalyticsDto) => {
        const { academyId } = params
        const { startDate, endDate } = query

        const dateFilter = (startDate && endDate) ? {
            createdAt: {
                gte: dayjs(startDate).startOf('day').toDate(),
                lte: dayjs(endDate).endOf('day').toDate()
            }
        } : {};

        const [
            totalClients,
            platformClients,
            officeClients,
            subscribedClients
        ] = await Promise.all([
            ClientRepository.count({
                where: { academyId, ...dateFilter }
            }),
            ClientRepository.count({
                where: { academyId, clientSource: "PLATFORM", ...dateFilter }
            }),
            ClientRepository.count({
                where: { academyId, clientSource: "OFFICE", ...dateFilter }
            }),
            ClientRepository.count({
                where: {
                    academyId,
                    ...dateFilter,
                    subscriptions: { some: {} }
                }
            }),
        ]);

        const totalClientsInPeriod = platformClients + officeClients;
        const nonSubscribedClients = totalClientsInPeriod - subscribedClients;

        return {
            totalClients,
            platformClients,
            officeClients,
            subscribedClients,
            nonSubscribedClients
        };
    },
    courses: async ({ params, query }: DTO.GetDashboardAnalyticsDto) => {
        const { academyId } = params
        const { startDate, endDate } = query
        const where = { academyId }

        const dateFilter = (startDate && endDate) ? {
            createdAt: {
                gte: dayjs(startDate).startOf('day').toDate(),
                lte: dayjs(endDate).endOf('day').toDate()
            }
        } : {};

        const totalCourses = await CourseRepository.findMany({
            where,
            select: {
                id: true,
                name: true,
                _count: {
                    select: {
                        subscriptions: { where: dateFilter }
                    }
                }
            }
        })

        const courses = totalCourses.courses.map(({ id, name, _count }) => ({
            id,
            name,
            subsCount: _count.subscriptions
        }));

        const total = totalCourses.count
        return { total, courses }
    },
    subscriptions: async ({ params, query }: DTO.GetDashboardAnalyticsDto) => {
        const { academyId } = params
        const { startDate, endDate } = query

        const dateFilter = (startDate && endDate) ? {
            createdAt: {
                gte: dayjs(startDate).startOf('day').toDate(),
                lte: dayjs(endDate).endOf('day').toDate()
            }
        } : {};

        const [
            totalSubs,
            activeSubs,
            canceledSubs,
            completedSubs,
            pausedSubs
        ] = await Promise.all([
            SubscriptionRepository.count({ where: { academyId, ...dateFilter } }),
            SubscriptionRepository.count({ where: { academyId, status: { in: ["ACTIVE", "FULLYBOOKED"] }, ...dateFilter } }),
            SubscriptionRepository.count({ where: { academyId, status: "CANCELED", ...dateFilter } }),
            SubscriptionRepository.count({ where: { academyId, status: "COMPLETED", ...dateFilter } }),
            SubscriptionRepository.count({ where: { academyId, status: "PAUSED", ...dateFilter } }),
        ]);

        return {
            totalSubs,
            activeSubs,
            canceledSubs,
            completedSubs,
            pausedSubs
        };
    },
    transactions: async ({ params, query }: DTO.GetDashboardAnalyticsDto) => {
        const { academyId } = params
        const { startDate, endDate } = query

        const dateFilter = (startDate && endDate) ? {
            createdAt: {
                gte: dayjs(startDate).startOf('day').toDate(),
                lte: dayjs(endDate).endOf('day').toDate()
            }
        } : {};

        const [totalPaidAmount, totalRefundedAmount] = await Promise.all([
            PaymentTransactionRepository.aggregate({
                where: {
                    academyId,
                    type: "PAYMENT",
                    status: "COMPLETED",
                    ...dateFilter
                },
            }),
            PaymentTransactionRepository.aggregate({
                where: {
                    academyId,
                    type: "REFUND",
                    status: "COMPLETED",
                    ...dateFilter
                },
            })
        ]);

        return {
            totalPaidAmount,
            totalRefundedAmount,
        };
    },
    lessons: async ({ params, query }: DTO.GetDashboardAnalyticsDto) => {
        const { academyId } = params
        const { startDate, endDate } = query
        const dateFilter = (startDate && endDate) ? {
            startTime: {
                gte: dayjs(startDate).startOf('day').toDate(),
                lte: dayjs(endDate).endOf('day').toDate()
            }
        } : {};

        const [
            totalLessons,
            scheduledLessons,
            completedLessons,
            canceledChargedLessons,
            canceledLessons,
            automaticLessons,
            manualLessons
        ] = await Promise.all([
            LessonRepository.count({ where: { academyId, ...dateFilter } }),
            LessonRepository.count({ where: { academyId, status: "SCHEDULED", ...dateFilter } }),
            LessonRepository.count({ where: { academyId, status: "COMPLETED", ...dateFilter } }),
            LessonRepository.count({ where: { academyId, status: "CANCELED_CHARGED", ...dateFilter } }),
            LessonRepository.count({ where: { academyId, status: "CANCELED", ...dateFilter } }),
            LessonRepository.count({ where: { academyId, transmission: "AUTOMATIC", ...dateFilter } }),
            LessonRepository.count({ where: { academyId, transmission: "MANUAL", ...dateFilter } }),
        ]);

        return {
            totalLessons,
            scheduledLessons,
            completedLessons,
            canceledChargedLessons,
            canceledLessons,
            automaticLessons,
            manualLessons
        };
    },
}

export default DashboardService;