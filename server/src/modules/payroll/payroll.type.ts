import { NextFunction, Response } from "express";
import { Payroll } from "../../../prisma/generated/browser";
import { PaginatedResponse } from "../../shared/types/types";
import { AcademyRequestHandler, RequestAcademy } from "../academy/academy.type";

import * as DTO from "./payroll.dto";

export interface IPayrollService {
    createPayroll(
        data: DTO.CreatePayrollDto
    ): Promise<Payroll>;

    deletePayroll(
        data: DTO.DeletePayrollDto
    ): Promise<Payroll>;

    getAllPayrolls(
        data: DTO.GetAllPayrollsDto
    ): Promise<PaginatedResponse<Payroll>>;

    getPayrollDetails(
        data: DTO.GetPayrollDetailsDto
    ): Promise<Payroll>;

    getPayrollPreview(data: DTO.GetPayrollPreviewDto): Promise<any>;
}

export interface IPayrollController {
    createPayroll: AcademyRequestHandler;

    deletePayroll: AcademyRequestHandler;

    getAllPayrolls: AcademyRequestHandler;

    getPayrollDetails: AcademyRequestHandler;

    getPayrollPreview: AcademyRequestHandler;
}

export interface RequestPayroll extends RequestAcademy {
    payroll?: Payroll;
}

export type PayrollRequestHandler = (
    req: RequestPayroll,
    res: Response,
    next: NextFunction
) => Promise<Response>;