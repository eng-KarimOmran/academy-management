import { Response } from "express";
import { RequestAuth } from "../../shared/middlewares/auth.middleware";
import * as DTO from "./account.dto";
import AccountService from "./account.service";
import sendSuccess from "../../shared/utils/successResponse";

const AccountController = {
    getEmployeesBalances: async (req: RequestAuth, res: Response) => {
        const dataSafe = req.dataSafe as DTO.GetEmployeesBalancesDto;

        const data = await AccountService.getEmployeesBalances({ data: dataSafe });

        return sendSuccess({
            res,
            data
        });
    },

    getEmployeesDues: async (req: RequestAuth, res: Response) => {
        const dataSafe = req.dataSafe as DTO.GetEmployeesDuesDto;

        const data = await AccountService.getEmployeesDues({ data: dataSafe });

        return sendSuccess({
            res,
            data
        });
    },

    processPayroll: async (req: RequestAuth, res: Response) => {
        const dataSafe = req.dataSafe as DTO.ProcessPayrollDto;

        const data = await AccountService.processPayroll({ data: dataSafe });

        return sendSuccess({
            res,
            statusCode: 201,
            data,
            message: "تم معالجة كشف المرتبات بنجاح",
        });
    },

    processPayment: async (req: RequestAuth, res: Response) => {
        const dataSafe = req.dataSafe as DTO.ProcessPaymentDto;
        const userLoginId = req.userLogin!.id;

        const dataImg = req.file ? {
            publicId: (req.file).filename,
            imageUrl: req.file.path
        } : undefined;

        const data = await AccountService.processPayment({
            data: dataSafe,
            userLoginId,
            dataImg
        });

        return sendSuccess({
            res,
            statusCode: 201,
            data,
            message: "تم معالجة الدفع بنجاح",
        });
    },

    receivePayment: async (req: RequestAuth, res: Response) => {
        const dataSafe = req.dataSafe as DTO.ReceivePaymentDto;
        const userLoginId = req.userLogin!.id;

        const data = await AccountService.receivePayment({
            data: dataSafe,
            userLoginId
        });

        return sendSuccess({
            res,
            statusCode: 201,
            data,
            message: "تم استلام الدفعة بنجاح",
        });
    }
};

export default AccountController;