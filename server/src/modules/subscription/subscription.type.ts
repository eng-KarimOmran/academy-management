import { Subscription } from "../../../prisma/generated/browser";
import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import { SubscriptionGetPayload } from "../../../prisma/generated/models";
import { PaginatedResponse } from "../../shared/types/types";
import { AcademyRequestHandler } from "../academy/academy.type";
import { CancelSubscriptionDto, CreateSubscriptionDto, DeleteSubscriptionDto, GetAllSubscriptionsDto, GetSubscriptionDetailsDto } from "./subscription.dto";

type SubscriptionDetails = SubscriptionGetPayload<{ include: { ledgerTransactions: true, lessons: true } }>

export interface ISubscriptionService {
    createSubscription(data: CreateSubscriptionDto, userId: string): Promise<Subscription>;

    getAllSubscriptions(
        data: GetAllSubscriptionsDto
    ): Promise<PaginatedResponse<Subscription>>;

    getSubscriptionDetails(
        data: GetSubscriptionDetailsDto
    ): Promise<SubscriptionDetails>;

    deleteSubscription(data: DeleteSubscriptionDto): Promise<Subscription>;

    cancelSubscription(data: CancelSubscriptionDto): Promise<Subscription>;

    recalculateSubscriptionStatus(data: { tx: TransactionClient, subscriptionId: string }): Promise<Subscription>;
}

export type GetSubscriptionStatusParams = {
    usedLessons: number;
    totalLessons: number;
    netPaid: number;
    requiredInitialDeposit: number;
    subscriptionPrice: number;
    isCanceled?: boolean;
    scheduledLessons: number;
    sessionsBeforeFullPayment: number;
};


export interface ISubscriptionController {
    createSubscription: AcademyRequestHandler;

    getAllSubscriptions: AcademyRequestHandler;

    getSubscriptionDetails: AcademyRequestHandler;

    deleteSubscription: AcademyRequestHandler;

    cancelSubscription: AcademyRequestHandler;
}