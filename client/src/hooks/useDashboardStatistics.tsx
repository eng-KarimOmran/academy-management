import {
  getClientsStatistics,
  getCoursesStatistics,
  getLessonsStatistics,
  getTransactionsStatistics,
} from "@/service/statistics.service";
import { useQueries } from "@tanstack/react-query";

type LessonsResponse = Awaited<ReturnType<typeof getLessonsStatistics>>;
type ClientsResponse = Awaited<ReturnType<typeof getClientsStatistics>>;
type CoursesResponse = Awaited<ReturnType<typeof getCoursesStatistics>>;
type TransactionsResponse = Awaited<
  ReturnType<typeof getTransactionsStatistics>
>;

export const useDashboardStatistics = ({
  academyId,
  startDate,
  endDate,
}: {
  academyId?: string;
  endDate?: string;
  startDate?: string;
}) => {
  const data = { academyId: academyId!, endDate, startDate };

  return useQueries({
    queries: [
      {
        queryKey: ["lessons", academyId, startDate, endDate],
        queryFn: () => getLessonsStatistics(data),
        select: (res: LessonsResponse) => res.data.data,
        enabled: !!academyId,
      },
      {
        queryKey: ["clients", academyId, startDate, endDate],
        queryFn: () => getClientsStatistics(data),
        select: (res: ClientsResponse) => res.data.data,
        enabled: !!academyId,
      },
      {
        queryKey: ["courses", academyId, startDate, endDate],
        queryFn: () => getCoursesStatistics(data),
        select: (res: CoursesResponse) => res.data.data,
        enabled: !!academyId,
      },
      {
        queryKey: ["transactions", academyId, startDate, endDate],
        queryFn: () => getTransactionsStatistics(data),
        select: (res: TransactionsResponse) => res.data.data,
        enabled: !!academyId,
      },
    ],
  });
};
