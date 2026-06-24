import { Role } from "../../../prisma/generated/enums";
import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import ApiError from "../../shared/utils/ApiError";
import getClient from "../../shared/utils/getClient";

const UserRepository = {
    findById: (userId: string, tx?: TransactionClient) => {
        const client = getClient(tx);
        return client.user.findUnique({
            where: { id: userId },
        });
    },
    recalculateUserRole: async (userId: string, tx?: TransactionClient) => {
        const client = getClient(tx);

        const user = await client.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                academies: { select: { id: true } },
                employee: {
                    select: {
                        captainProfiles: { select: { id: true }, take: 1 },
                        secretaryProfiles: { select: { id: true }, take: 1 }
                    }
                }
            }
        });

        if (!user) throw ApiError.NotFound("User");

        const roles = new Set<Role>();

        if (user.academies.length > 0) {
            roles.add("OWNER");
        }

        if (user.employee) {
            if (user.employee.captainProfiles.length > 0) {
                roles.add("CAPTAIN");
            }
            if (user.employee.secretaryProfiles.length > 0) {
                roles.add("SECRETARY");
            }
        }

        const newRolesArray = Array.from(roles);

        await client.user.update({
            where: { id: userId },
            data: {
                role: newRolesArray
            }
        });

        return newRolesArray;
    }
}

export default UserRepository