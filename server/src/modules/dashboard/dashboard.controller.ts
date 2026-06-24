import { Response } from "express";
import { RequestAcademy } from "../academy/academy.middleware";
import DashboardService from "./dashboard.service";
import sendSuccess from "../../shared/utils/successResponse";
import * as DTO from "./dashboard.dto";

const DashboardController = {
  getStatistics: async (req: RequestAcademy, res: Response) => {
    const dataSafe = req.dataSafe as DTO.GetDashboardAnalyticsDto;

    const [
      clients,
      courses,
      subscriptions,
      transactions,
      lessons,
      area,
      car,
      captain,
      usersCreatedSubscription,
    ] = await Promise.all([
      DashboardService.clients({ dataSafe }),
      DashboardService.courses({ dataSafe }),
      DashboardService.subscriptions({ dataSafe }),
      DashboardService.transactions({ dataSafe }),
      DashboardService.lessons({ dataSafe }),
      DashboardService.area({ dataSafe }),
      DashboardService.car({ dataSafe }),
      DashboardService.captain({ dataSafe }),
      DashboardService.usersCreatedSubscription({ dataSafe }),
    ]);

    return sendSuccess({
      res,
      data: {
        clients,
        courses,
        subscriptions,
        transactions,
        lessons,
        area,
        car,
        captain,
        usersCreatedSubscription,
      },
      message: "تم توليد وتحليل بيانات لوحة التحكم بنجاح.",
    });
  },
};

export default DashboardController;