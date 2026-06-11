import * as DTO from "./dashboard.dto";
import DashboardRepository from "./dashboard.repository";
import { getDashboardTimeFrames } from "./dashboard.utils";

const DashboardService = {
    async getOwnerAnalytics(dataSafe: DTO.GetDashboardAnalyticsDto) {
        const { academyId } = dataSafe.params;
        const { startDate, endDate } = dataSafe.query;
        const timeFrames = getDashboardTimeFrames({startDate, endDate});
        const rawData = await DashboardRepository.getRawAnalytics({ academyId, timeFrames });

        const totalSubscriptionsCount = rawData.newSubscriptions.length;

        const totalWalletsPendingBalance = rawData.pendingPayments
            .filter((p) => p.status === "PENDING")
            .reduce((sum, p) => sum + p.amount, 0);

        const subscriptionStatusesDistribution = rawData.newSubscriptions.reduce((acc, sub) => {
            acc[sub.status] = (acc[sub.status] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);


        const coursesAnalytics = rawData.coursesStats.map((course) => ({
            courseId: course.id,
            courseTitle: course.title,
            subscribersCount: course._count.subscriptions,
        })).sort((a, b) => b.subscribersCount - a.subscribersCount);

        const captainsMap: Record<string, { name: string; completedLessons: number }> = {};
        const carsMap: Record<string, { label: string; totalLessons: number }> = {};
        const areasMap: Record<string, { name: string; completedLessons: number }> = {};

        rawData.lessonsStats.forEach((lesson) => {
            if (lesson.captain && lesson.status === "COMPLETED") {
                if (!captainsMap[lesson.captain.id]) {
                    captainsMap[lesson.captain.id] = { name: lesson.captain.name, completedLessons: 0 };
                }
                captainsMap[lesson.captain.id].completedLessons += 1;
            }

            if (lesson.car && ["SCHEDULED", "COMPLETED"].includes(lesson.status)) {
                const carLabel = `${lesson.car.model} (${lesson.car.plateNumber})`;
                if (!carsMap[lesson.car.id]) {
                    carsMap[lesson.car.id] = { label: carLabel, totalLessons: 0 };
                }
                carsMap[lesson.car.id].totalLessons += 1;
            }

            if (lesson.area && lesson.status === "COMPLETED") {
                if (!areasMap[lesson.area.id]) {
                    areasMap[lesson.area.id] = { name: lesson.area.name, completedLessons: 0 };
                }
                areasMap[lesson.area.id].completedLessons += 1;
            }
        });

        const captainsAnalytics = Object.values(captainsMap).sort((a, b) => b.completedLessons - a.completedLessons);
        const carsAnalytics = Object.values(carsMap).sort((a, b) => b.totalLessons - a.totalLessons);
        const areasAnalytics = Object.values(areasMap).sort((a, b) => b.completedLessons - a.completedLessons);

        return {
            timeFramesUsed: {
                operational: timeFrames.operational,
                financial: timeFrames.financial
            },
            kpiCards: {
                newSubscriptionsCount: totalSubscriptionsCount,
                newClientsRegistered: rawData.newClientsCount,
                walletsPendingBalance: totalWalletsPendingBalance,
            },
            chartsData: {
                subscriptionStatuses: subscriptionStatusesDistribution,
                coursesPopularity: coursesAnalytics,
                captainsPerformance: captainsAnalytics,
                carsUtilization: carsAnalytics,
                areasDistribution: areasAnalytics,
            }
        };
    }
};

export default DashboardService;