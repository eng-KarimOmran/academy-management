import { prisma } from "../../lib/prisma";
import ApiError from "../../shared/utils/ApiError";
import {
    buildPagination,
    buildPaginationMeta,
} from "../../shared/utils/Pagination";
import { IPayrollService } from "./payroll.type";
import { buildPayrollWhere, orderBy } from "./payroll.utils";

const PayrollService: IPayrollService = {
    async createPayroll({ params, body }) {
        const { academyId } = params;
        const { jobProfileId } = body;

        const jobProfile = await prisma.jobProfile.findFirst({
            where: {
                id: jobProfileId,
                academyId,
            },
            include: {
                user: { select: { id: true, name: true, phone: true } },
                lessons: { where: { payrollId: null, lessonStatus: { in: ["COMPLETED", "CANCELED_CHARGED"] } }, select: { id: true } },
                subscriptions: { where: { payrollId: null, subscriptionStatus: { notIn: ["CANCELED", "PENDING_DEPOSIT"] } }, select: { id: true } },
            },
        });

        if (!jobProfile) throw ApiError.NotFound("JobProfile");

        const lastPayroll = await prisma.payroll.findFirst({
            where: {
                academyId,
                jobProfileId,
            },
            orderBy: {
                periodTo: "desc",
            },
        });

        const periodFrom = lastPayroll?.periodTo ?? jobProfile.createdAt;
        const periodTo = new Date();

        const totalLessonsCount = jobProfile.lessons.length;
        const totalSubscriptionsCount = jobProfile.subscriptions.length;

        const totalLessonsAmount = totalLessonsCount * jobProfile.lessonPrice;

        const bonusAmount = totalSubscriptionsCount >= jobProfile.targetCount ? jobProfile.bonusAmount : 0;

        const netAmount = jobProfile.baseSalary + totalLessonsAmount + bonusAmount;

        return await prisma.$transaction(async (tx) => {
            const payroll = await tx.payroll.create({
                data: {
                    academy: {
                        connect: {
                            id: academyId,
                        },
                    },

                    jobProfile: {
                        connect: {
                            id: jobProfileId,
                        },
                    },

                    periodFrom,
                    periodTo,

                    baseSalary: jobProfile.baseSalary,
                    totalLessonsCount,
                    totalLessonsAmount,
                    totalSubscriptionsCount,
                    targetCount: jobProfile.targetCount,
                    bonusAmount,
                    netAmount,
                },
            });

            if (jobProfile.lessons.length) {
                await tx.lesson.updateMany({
                    where: {
                        id: {
                            in: jobProfile.lessons.map((l) => l.id),
                        },
                    },
                    data: {
                        payrollId: payroll.id,
                    },
                });
            }

            if (jobProfile.subscriptions.length) {
                await tx.subscription.updateMany({
                    where: {
                        id: {
                            in: jobProfile.subscriptions.map((s) => s.id),
                        },
                    },
                    data: {
                        payrollId: payroll.id,
                    },
                });
            }
            
            return payroll;
        });
    },

    async deletePayroll({ params }) {
        const { payrollId } = params;

        const payroll = await prisma.payroll.findUnique({
            where: { id: payrollId },
        });

        if (!payroll) throw ApiError.NotFound("Payroll");

        return await prisma.payroll.delete({ where: { id: payrollId } });
    },

    async getAllPayrolls({ params, query }) {
        const { academyId } = params;
        const { page, limit, search } = query;

        const pagination = buildPagination({ page, limit });

        const where = buildPayrollWhere({ academyId, search })

        const [items, count] = await prisma.$transaction([
            prisma.payroll.findMany({
                where,
                ...pagination,
                orderBy,
            }),
            prisma.payroll.count({ where }),
        ]);

        return {
            items,
            pagination: buildPaginationMeta({ page, limit, count }),
        };
    },

    async getPayrollDetails({ params }) {
        const { payrollId } = params;

        const payroll = await prisma.payroll.findUnique({
            where: { id: payrollId }
        });

        if (!payroll) throw ApiError.NotFound("Payroll");

        return payroll;
    },

    async getPayrollPreview({ params }) {
        const { academyId } = params;

        const jobProfiles = await prisma.jobProfile.findMany({
            where: { academyId },
            include: {
                user: { select: { id: true, name: true, phone: true } },
                lessons: {
                    where: { payrollId: null, lessonStatus: { in: ["COMPLETED", "CANCELED_CHARGED"] } },
                    select: { id: true },
                },
                subscriptions: {
                    where: { payrollId: null, subscriptionStatus: { notIn: ["CANCELED", "PENDING_DEPOSIT"] } },
                    select: { id: true },
                },
            },
        });

        return jobProfiles.map((j) => {
            const totalLessonsCount = j.lessons.length;
            const totalSubscriptionsCount = j.subscriptions.length;
            const totalLessonsAmount = totalLessonsCount * j.lessonPrice;
            const bonusAmount = totalSubscriptionsCount >= j.targetCount ? j.bonusAmount : 0;
            const netAmount = j.baseSalary + totalLessonsAmount + bonusAmount;

            return {
                jobProfileId: j.id,
                user: j.user,
                baseSalary: j.baseSalary,
                totalLessonsCount,
                totalSubscriptionsCount,
                totalLessonsAmount,
                targetCount: j.targetCount,
                bonusAmount,
                netAmount,
            };
        });
    },
};

export default PayrollService;
