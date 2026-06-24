import { axiosClient } from "@/lib/axios";
import * as Dto from "@/DTOs/account.dto";
import type { SuccessfulResponse } from "@/types/axios";

import type {
    EmployeeBalanceResponse,
    EmployeesDuesResponse,
    ProcessPayrollResponse,
    ProcessPaymentResponse,
    ReceivePaymentResponse,
} from "@/types/accounts";

type EntityBalance = EmployeeBalanceResponse;
type EntityDues = EmployeesDuesResponse;
type EntityPayment = ProcessPaymentResponse;
type EntityPayroll = ProcessPayrollResponse;
type EntityReceive = ReceivePaymentResponse;

const accountsUrl = {
    base: (academyId: string) =>
        `/academies/${academyId}/accounts`,

    balances: (academyId: string) =>
        `/academies/${academyId}/accounts/balances`,

    dues: (academyId: string) =>
        `/academies/${academyId}/accounts/dues`,

    processPayment: (academyId: string, subscriptionId: string) =>
        `/academies/${academyId}/accounts/subscription/${subscriptionId}/payment`,

    processPayroll: (academyId: string, userId: string) =>
        `/academies/${academyId}/accounts/${userId}/payroll`,

    receivePayment: (academyId: string, senderId: string) =>
        `/academies/${academyId}/accounts/sender/${senderId}/receive`,
};

export const getEmployeesBalances = (
    academyId: string,
    data: Dto.GetEmployeesBalancesDto
) => {
    return axiosClient.get<SuccessfulResponse<EntityBalance[]>>(
        accountsUrl.balances(academyId),
        { params: data.query }
    );
};

export const getEmployeesDues = (
    academyId: string,
    data: Dto.GetEmployeesDuesDto
) => {
    return axiosClient.get<SuccessfulResponse<EntityDues>>(
        accountsUrl.dues(academyId),
        { params: data.query }
    );
};

export const processPayment = (
    academyId: string,
    data: Dto.ProcessPaymentDto
) => {
    const { params, body } = data;

    return axiosClient.post<SuccessfulResponse<EntityPayment>>(
        accountsUrl.processPayment(academyId, params.subscriptionId),
        body
    );
};

export const processPayroll = (
    academyId: string,
    data: Dto.ProcessPayrollDto
) => {
    const { params, body } = data;

    return axiosClient.post<SuccessfulResponse<EntityPayroll>>(
        accountsUrl.processPayroll(academyId, params.userId),
        body
    );
};

export const receivePayment = (
    academyId: string,
    data: Dto.ReceivePaymentDto
) => {
    const { params, body } = data;

    return axiosClient.post<SuccessfulResponse<EntityReceive>>(
        accountsUrl.receivePayment(academyId, params.senderId),
        body
    );
};