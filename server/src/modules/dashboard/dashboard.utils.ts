import dayjs from 'dayjs';
import { getCycle } from './../../shared/utils/getCycle';

export const getDashboardTimeFrames = ({ startDate, endDate }: { startDate?: Date, endDate?: Date }) => {
    const now = dayjs();
    const operationalStart = startDate
        ? dayjs(startDate).startOf("day").toDate()
        : now.startOf("day").toDate();

    const operationalEnd = endDate
        ? dayjs(endDate).endOf("day").toDate()
        : now.endOf("day").toDate();
    let financialStart: Date;
    let financialEnd: Date;

    if (startDate) {
        financialStart = dayjs(startDate).startOf("day").toDate();
        financialEnd = endDate ? dayjs(endDate).endOf("day").toDate() : now.endOf("day").toDate();
    } else {
        const cycle = getCycle();
        financialStart = cycle.from;
        financialEnd = cycle.to;
    }

    return {
        operational: { gte: operationalStart, lte: operationalEnd },
        financial: { gte: financialStart, lt: financialEnd },
    };
};