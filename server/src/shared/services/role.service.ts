import { Role, User } from "../../../prisma/generated/client";
import { TransactionClient } from "../../../prisma/generated/internal/prismaNamespace";
import { prisma } from "../../lib/prisma";

export class RoleService {
  static addRole(user: User, role: Role, tx?: TransactionClient) {
    const client = tx ?? prisma;

    const newRoles = [...new Set([...user.roles, role])];

    return client.user.update({
      where: { id: user.id },
      data: {
        roles: { set: newRoles },
      },
    });
  }

  static async removeRole(user: User, role: Role, tx?: TransactionClient) {
    const client = tx ?? prisma;

    let newRoles: Role[] = [];

    if (role === "OWNER") {
      const academiesCount = await client.academy.count({
        where: {
          owners: {
            some: {
              id: user.id,
            },
          },
        },
      });
      if (academiesCount > 0) {
        newRoles = user.roles;
      } else {
        newRoles = user.roles.filter((r) => r !== role);
      }
    } else {
      newRoles = user.roles.filter((r) => r !== role);
    }

    return client.user.update({
      where: { id: user.id },
      data: {
        roles: { set: newRoles },
      },
    });
  }
}
