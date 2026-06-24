import type { LedgerTransaction } from "./ledgerTransaction";

interface Payroll { }


export interface EmployeeBalanceResponse {
    userId: string;
    name: string;
    phone: string;
    balance: number | undefined;
}

export interface SecretaryDue {
    userId: string;
    name: string;
    phone: string;
    baseSalary: number;
    targetCount: number;
    achievedTargetCount: number;
    isEligibleForBonus: boolean;
    bonusAmount: number;
    grossSalary: number;
}

export interface CaptainDue {
    userId: string;
    name: string;
    phone: string;
    baseSalary: number;
    currentLessonCount: number;
    captainLessonPrice: number;
    grossSalary: number;
}

export interface EmployeesDuesResponse {
    secretary: SecretaryDue[];
    captains: CaptainDue[];
}

export type ProcessPayrollResponse = Payroll;
export type ProcessPaymentResponse = LedgerTransaction;
export type ReceivePaymentResponse = LedgerTransaction;