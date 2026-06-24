import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import getClient from "../../shared/utils/getClient";

const SubscriptionRepository = {
    findById: (subscriptionId: string, tx?: TransactionClient) => {
        const client = getClient(tx);
        return client.subscription.findUnique({
            where: { id: subscriptionId },
            include: {
                ledgerTransactions: true,
            }
        });
    },
}

export default SubscriptionRepository