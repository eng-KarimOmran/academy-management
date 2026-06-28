import { Lesson } from "../../../prisma/generated/client";
import { AuthRequestHandler } from "../auth/auth.type";
import { JobProfileRequestHandler } from "../jobProfile/jobProfile.type";
import { GetDashboardManagerDto, GetMyLessonsDto } from "./employee.dto";

export type GetTrainerDebtResponse = {
    totalDebt: number;
    result: {
        id: string;
        name: string;
        academies: {
            academyId: string;
            academyName: string;
            balance: number;
        }[];
    };
};

export interface IEmployeeService {
    getMyLessons(data: GetMyLessonsDto & { userId: string }): Promise<Lesson[]>;
    getTrainerDebt(data: { userId: string }): Promise<GetTrainerDebtResponse>
    getDashboardManager(data: GetDashboardManagerDto): Promise<any>
}



export interface IEmployeeController {
    getMyLessons: AuthRequestHandler;
    getTrainerDebt: AuthRequestHandler
    getDashboardManager: JobProfileRequestHandler
}