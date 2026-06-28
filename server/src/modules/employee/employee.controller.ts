import sendSuccess from "../../shared/utils/successResponse";
import EmployeeService from "./employee.service";
import { IEmployeeController } from "./employee.type";
import * as DTO from "./employee.dto"

const EmployeeController: IEmployeeController = {
    getMyLessons: async (req, res) => {
        const dataSafe = req.dataSafe as DTO.GetMyLessonsDto;
        const { query } = dataSafe
        const userId = req.userLogin!.id

        const lessons = await EmployeeService.getMyLessons({ query, userId });

        return sendSuccess({
            res,
            data: lessons,
        });
    },

    getTrainerDebt: async (req, res) => {
        const userId = req.userLogin!.id
        const data = await EmployeeService.getTrainerDebt({ userId });

        return sendSuccess({
            res,
            data,
        });
    },
    getDashboardManager: async (req, res) => {
        const userId = req.userLogin!.id
        const dataSafe = req.dataSafe as DTO.GetDashboardManagerDto;

        const data = await EmployeeService.getDashboardManager(dataSafe);

        return sendSuccess({
            res,
            data,
        });
    }
}

export default EmployeeController