import { prisma } from "../../lib/prisma";
import ApiError from "../../shared/utils/ApiError";
import { IEmployeeService } from "./employee.type";

const EmployeeService: IEmployeeService = {
    async getMyLessons({ query, userId }) {
        const { startDate, endDate } = query

        const lessons = await prisma.lesson.findMany({
            where: {
                jobProfile: { userId },
                startTime: {
                    lte: endDate,
                },
                endTime: {
                    gte: startDate,
                },
            },
            include: {
                jobProfile: true,
                academy: true,
                client: true,
            }
        })

        return lessons
    },

    async getTrainerDebt({ userId }) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                jobProfile: {
                    include: {
                        financialAccount: true,
                        academy: true,
                    },
                },
            },
        });

        if (!user) throw ApiError.NotFound("User");

        const academies = user.jobProfile.map((jobProfile) => ({
            academyId: jobProfile.academy.id,
            academyName: jobProfile.academy.name,
            balance: jobProfile.financialAccount?.balance ?? 0,
        }));

        const totalDebt = academies.reduce(
            (sum, academy) => sum + academy.balance,
            0
        );

        return {
            totalDebt,
            result: {
                id: user.id,
                name: user.name,
                academies,
            },
        };
    },

    async getDashboardManager({ params, query }) {
        const { academyId } = params;
        const { startDate, endDate } = query

        return prisma.jobProfile.findMany({
            where: { academyId },
            select: {
                id: true,
                jobProfileType: true,
                user: { select: { id: true, name: true, phone: true } },
                financialAccount: { select: { id: true } },
                lessons: {
                    where: {
                        startTime: {
                            lte: query.endDate,
                        },
                        endTime: {
                            gte: query.startDate,
                        },
                    },
                    select: {
                        id: true,
                        startTime: true,
                        endTime: true,
                        expectedPaymentAmount: true,
                        sessionDurationMinutes: true,
                        subscriptionId: true,
                        transmission: true,
                        area: { select: { id: true, name: true } },
                        car: { select: { id: true, modelName: true, plateNumber: true } },
                        academy: { select: { id: true, name: true } },
                        client: { select: { id: true, name: true, phone: true } },
                        ledgerTransaction: { select: { id: true, amount: true } },
                    },
                    orderBy: {
                        startTime: "asc",
                    },
                }
            }
        })
    }
}

export default EmployeeService