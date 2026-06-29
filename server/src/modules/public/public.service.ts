import { IPublicService } from "./public.type";
import { prisma } from "../../lib/prisma";
import ApiError from "../../shared/utils/ApiError";
import { ClientCreateInput } from "../../../prisma/generated/models";

const PublicService: IPublicService = {
    async getAcademy({ params }) {
        const { academyId } = params;

        const academy = await prisma.academy.findUnique({
            where: { id: academyId },
            include: {
                logo: true,
                academyPhones: true,
                addresses: true,
                socialMedia: true,
                paymentLinks: true,
            },
        });

        if (!academy) throw ApiError.NotFound("Academy");

        return academy;
    },

    async getCourses({ params }) {
        const { academyId } = params;

        return prisma.course.findMany({
            where: {
                academyId,
                isActive: true,
            },
            include: {
                features: true,
            }
        });
    },

    async getAreas({ params }) {
        const { academyId } = params;

        return prisma.area.findMany({
            where: {
                academyId,
                isActive: true,
            },
        });
    },

    async getClient({ params }) {
        const { academyId, clientId } = params;

        const client = await prisma.client.findFirst({
            where: {
                id: clientId,
                academyId,
            },
            include: {
                subscriptions: {
                    select:
                    {
                        id: true,
                        priceAtBooking: true,
                        financialAccount: { select: { id: true, balance: true } },
                        course: { select: { name: true } },
                        requiredInitialDeposit: true,
                        sessionDurationMinutes: true,
                        subscriptionStatus: true,
                        totalSessions: true,
                        lessons: {
                            select: {
                                startTime: true,
                                endTime: true,
                                lessonStatus: true,
                                expectedPaymentAmount: true,
                                transmission: true,
                                jobProfile: {
                                    select: {
                                        id: true,
                                        user: { select: { id: true, name: true, phone: true } }
                                    }
                                }
                            }
                        },
                        ledgerTransactions: {
                            select: { id: true, amount: true, paymentMethod: true, image: true, transactionType: true, ledgerTransactionStatus: true, createdAt: true }
                        }
                    }
                },
            },
        });

        if (!client) throw ApiError.NotFound("Client");

        return client;
    },

    async register({ body, params }) {
        const { academyId } = params
        const { client, payment, subscription } = body
        const createClient = await prisma.$transaction(async (tx) => {

            const academy = await tx.academy.findUnique({ where: { id: academyId }, include: { financialAccount: { select: { id: true } } } })

            if (!academy) throw ApiError.NotFound("Academy")

            if (!academy.financialAccount) throw ApiError.NotFound("financialAccount")

            const clientEx = await tx.client.findUnique({ where: { phone_academyId: { phone: client.phone, academyId } } })

            if (clientEx) throw ApiError.Conflict("PHONE_ALREADY_EXISTS")

            const [course, area] = await Promise.all([
                tx.course.findUnique({ where: { id: subscription.courseId } }),
                tx.area.findUnique({ where: { id: subscription.areaId } }),
            ])

            if (!course) throw ApiError.NotFound("Course")

            if (!area) throw ApiError.NotFound("Area")

            const newClient = await tx.client.create({
                data: {
                    name: client.name,
                    phone: client.phone,
                    source: "PLATFORM",
                    academyId
                }
            });

            const newSubscription = await tx.subscription.create({
                data: {
                    clientId: newClient.id,
                    courseId: course.id,
                    areaId: area.id,
                    academyId,

                    priceAtBooking: course.priceDiscounted,
                    requiredInitialDeposit: course.requiredInitialDeposit,
                    sessionDurationMinutes: course.sessionDurationMinutes,
                    sessionsBeforeFullPayment: course.sessionsBeforeFullPayment,
                    totalSessions: course.totalSessions,
                    courseName: course.name,

                    trainingTypeAtRegistration: subscription.trainingTypeAtRegistration,

                    financialAccount: {
                        create: {
                            balance: course.priceDiscounted
                        }
                    }
                },
                include: {
                    financialAccount: true
                }
            });

            if (payment) {
                const image = await tx.image.create({
                    data: {
                        imageUrl: payment.image.imageUrl,
                        publicId: payment.image.publicId,
                    }
                });

                const ledger = await tx.ledgerTransaction.create({
                    data: {
                        amount: payment.amount,
                        paymentMethod: "ELECTRONIC",
                        transactionType: "CUSTOMER_PAYMENT",

                        academyId,
                        subscriptionId: newSubscription.id,

                        receiverId: academy.financialAccount.id,

                        senderId: newSubscription.financialAccount!.id,

                        imageId: image.id,

                        ledgerTransactionStatus: "PENDING"
                    }
                });
            }

            return newClient
        })

        return createClient
    },
};

export default PublicService;