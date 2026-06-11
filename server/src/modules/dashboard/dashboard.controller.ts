import { Response } from "express";
import { RequestAcademy } from "../academy/academy.middleware";
import DashboardService from "./dashboard.service";
import sendSuccess from "../../shared/utils/successResponse";
import * as DTO from "./dashboard.dto";

const DashboardController = {
  getOwnerDashboardAnalytics: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetDashboardAnalyticsDto;

    const analyticsData = await DashboardService.getOwnerAnalytics(dataSafe);

    return sendSuccess({
      res,
      data: analyticsData,
      message: "تم توليد وتحليل بيانات لوحة التحكم بنجاح.",
    });
  }
};

export default DashboardController;