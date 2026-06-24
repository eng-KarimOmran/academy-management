import { Prisma } from "../../../prisma/generated/client";

export const employeeBalanceUserSelect = {
    id: true,
    name: true,
    phone: true
} satisfies Prisma.UserSelect;

export const secretaryDuesSelect = {
    id: true,
    name: true,
    phone: true,
    secretaryProfile: {
        select: {
            id: true,
            baseSalary: true,
            bonusAmount: true,
            targetCount: true
        }
    }
} satisfies Prisma.UserSelect;

export const captainDuesSelect = {
    id: true,
    baseSalary: true,
    captainLessonPrice: true,
    user: {
        select: {
            id: true,
            name: true,
            phone: true
        }
    }
} satisfies Prisma.CaptainSelect;