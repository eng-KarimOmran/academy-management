import type { GetDashboardAnalyticsDto } from "@/DTOs/statistics.dto";
import { axiosClient } from "@/lib/axios";
import type { SuccessfulResponse } from "@/types/axios";
import type { LessonStatistics, ClientStatistics, CourseStatistics, PaymentStatistics } from "@/types/statistics";

const baseUrl = (academyId: string, category: string) => `/academies/${academyId}/statistics/${category}`;

export const getCoursesStatistics = (data: GetDashboardAnalyticsDto) => {
    const { academyId, startDate, endDate } = data
    const url = baseUrl(academyId, "courses")
    const params: Record<string, unknown> = {}
    if (startDate && endDate) {
        params.startDate = startDate
        params.endDate = endDate
    }
    return axiosClient.get<SuccessfulResponse<CourseStatistics>>(url, { params });
};

export const getClientsStatistics = (data: GetDashboardAnalyticsDto) => {
    const { academyId, startDate, endDate } = data
    const url = baseUrl(academyId, "clients")
    const params: Record<string, unknown> = {}
    if (startDate && endDate) {
        params.startDate = startDate
        params.endDate = endDate
    }
    return axiosClient.get<SuccessfulResponse<ClientStatistics>>(url, { params });
};

export const getSubscriptionsStatistics = (data: GetDashboardAnalyticsDto) => {
    const { academyId, startDate, endDate } = data
    const url = baseUrl(academyId, "subscriptions")
    const params: Record<string, unknown> = {}
    if (startDate && endDate) {
        params.startDate = startDate
        params.endDate = endDate
    }
    return axiosClient.get<SuccessfulResponse<unknown>>(url, { params });
};

export const getTransactionsStatistics = (data: GetDashboardAnalyticsDto) => {
    const { academyId, startDate, endDate } = data
    const url = baseUrl(academyId, "transactions")
    const params: Record<string, unknown> = {}
    if (startDate && endDate) {
        params.startDate = startDate
        params.endDate = endDate
    }
    return axiosClient.get<SuccessfulResponse<PaymentStatistics>>(url, { params });
};

export const getLessonsStatistics = (data: GetDashboardAnalyticsDto) => {
    const { academyId, startDate, endDate } = data
    const url = baseUrl(academyId, "lessons")
    const params: Record<string, unknown> = {}
    if (startDate && endDate) {
        params.startDate = startDate
        params.endDate = endDate
    }
    return axiosClient.get<SuccessfulResponse<LessonStatistics>>(url, { params });
};