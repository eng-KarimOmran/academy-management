import {
    PayrollOrderByWithRelationInput,
    PayrollWhereInput,
} from "../../../prisma/generated/models";

export const buildPayrollWhere = ({
    academyId,
    search,
}: {
    academyId: string;
    search?: string;
}): PayrollWhereInput => {
    const where: PayrollWhereInput = {
        academyId,
    };

    if (search) {
        where.OR = [
            {
                id: {
                    contains: search,
                },
            },
        ];
    }

    return where;
};

export const orderBy: PayrollOrderByWithRelationInput = {
    periodFrom: "desc",
};