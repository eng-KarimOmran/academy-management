import { Response } from "express";
import { RequestAcademy } from "../academy/academy.middleware";
import DashboardService from "./dashboard.service";
import sendSuccess from "../../shared/utils/successResponse";
import * as DTO from "./dashboard.dto";

const DashboardController = {
  courses: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetDashboardAnalyticsDto;

    const courses = await DashboardService.courses(dataSafe);

    return sendSuccess({
      res,
      data: courses,
      message: "تم توليد وتحليل بيانات البرامج بنجاح.",
    });
  },
  clients: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetDashboardAnalyticsDto;

    const clients = await DashboardService.clients(dataSafe);

    return sendSuccess({
      res,
      data: clients,
      message: "تم توليد وتحليل بيانات العملاء بنجاح.",
    });
  },
  subscriptions: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetDashboardAnalyticsDto;

    const subscriptions = await DashboardService.subscriptions(dataSafe);

    return sendSuccess({
      res,
      data: subscriptions,
      message: "تم توليد وتحليل بيانات الاشتراكات بنجاح.",
    });
  },
  transactions: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetDashboardAnalyticsDto;

    const transactions = await DashboardService.transactions(dataSafe);

    return sendSuccess({
      res,
      data: transactions,
      message: "تم توليد وتحليل بيانات الاشتراكات بنجاح.",
    });
  },
  lessons: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetDashboardAnalyticsDto;

    const lessons = await DashboardService.lessons(dataSafe);

    return sendSuccess({
      res,
      data: lessons,
      message: "تم توليد وتحليل بيانات الاشتراكات بنجاح.",
    });
  }
};

export default DashboardController;