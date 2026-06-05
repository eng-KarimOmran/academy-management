import { Response } from "express";
import * as DTO from "./subscription.dto";
import { RequestAuth } from "../../middlewares/auth.middleware";
import * as SubscriptionService from "./subscription.service";
import sendSuccess from "../../shared/utils/successResponse";
import { RequestAcademy } from "../academy/academy.middleware";

export const createSubscription = async (req: RequestAuth, res: Response) => {
  const dataSafe = req.dataSafe as DTO.CreateSubscriptionDto;
  const userLogin = req.userLogin!;

  const subscription = await SubscriptionService.create({
    userId: userLogin.id,
    dataSafe,
  });

  return sendSuccess({
    res,
    statusCode: 201,
    data: subscription,
    message: "تم إنشاء الاشتراك بنجاح",
  });
};

export const getAllSubscriptions = async (
  req: RequestAcademy,
  res: Response,
) => {
  const dataSafe = req.dataSafe as DTO.GetAllSubscriptionsDto;

  const data = await SubscriptionService.getAll(dataSafe);

  return sendSuccess({
    res,
    data,
  });
};

export const getSubscriptionDetails = async (
  req: RequestAuth,
  res: Response,
) => {
  const dataSafe = req.dataSafe as DTO.GetSubscriptionDetailsDto;

  const subscriptionData = await SubscriptionService.getDetails(dataSafe);

  return sendSuccess({
    res,
    data: subscriptionData,
  });
};

export const deleteSubscription = async (
  req: RequestAcademy,
  res: Response,
) => {
  const dataSafe = req.dataSafe as DTO.DeleteSubscriptionDto;

  await SubscriptionService.deleteSubscription(dataSafe);

  return sendSuccess({
    res,
    message: "تم حذف الاشتراك نهائياً",
  });
};

export const cancelSubscription = async (
  req: RequestAcademy,
  res: Response,
) => {
  const dataSafe = req.dataSafe as DTO.CancelSubscriptionDto;

  const cancellationRecord = await SubscriptionService.cancel(dataSafe);

  return sendSuccess({
    res,
    data: cancellationRecord,
    message: "تم الغاء الاشتراك بنجاح",
  });
};