import z from "zod";

import {
  id,
  limit,
  futureDate,
  lessonStatus,
  transmission,
  price,
  paymentMethod,
  page,
  url,
} from "../../shared/utils/common.validation";

export const CreateLessonSchema = {
  params: z.object({
    academyId: id,
  }),
  body: z.object({
    startTime: futureDate,
    transmission: transmission,
    expectedPaymentAmount: price.optional(),
    jobProfileId: id,
    carId: id,
    areaId: id,
    subscriptionId: id,
  }),
};

export const GetAllLessonsSchema = {
  params: z.object({
    academyId: id,
  }),
  query: z.object({
    page,
    limit,
    transmission: transmission.optional(),
    lessonStatus: lessonStatus.optional(),
    search: z.string().optional(),
  }),
};

export const GetLessonDetailsSchema = {
  params: z.object({
    academyId: id,
    lessonId: id,
  }),
};

export const ChangeLessonStateSchema = {
  params: z.object({ lessonId: id, academyId: id }),
  body: z.object({
    lessonStatus: lessonStatus,
    paymentMethod: paymentMethod.optional(),
    amount: price.optional(),
    image: z
      .object({
        publicId: z.string().min(1, "معرف الصورة مطلوب"),
        imageUrl: url,
      })
      .optional(),
  }).refine(
    (data) => {
      const isElectronic = data.paymentMethod === "ELECTRONIC";
      return !isElectronic || !!data.image;
    },
    {
      error: "الصورة مطلوبة عند الدفع الإلكتروني",
      path: ["image"],
    },
  ),
};

export const UpdateLessonSchema = {
  params: z.object({
    academyId: id,
    lessonId: id,
  }),
  body: z.object({
    startTime: futureDate.optional(),
    transmission: transmission.optional(),
    expectedPaymentAmount: price.optional(),
    jobProfileId: id.optional(),
    carId: id.optional(),
    areaId: id.optional(),
  }),
};