import z from "zod";
import dayjs from "dayjs";

import {
  LessonStatus,
  PaymentMethod,
  Platform,
  Role,
  SupportType,
  Transmission,
  SubscriptionStatus,
  TransactionType,
  ClientSource,
  TransactionParty,
} from "../types/enums";

export const id = z.string().transform((val) => val.toLowerCase()).pipe(z.cuid2({ message: "معرف غير صالح" }));

export const personName = z
  .string("الاسم مطلوب")
  .trim()
  .min(2, "يجب أن يتكون الاسم من حرفين على الأقل")
  .max(50, "الاسم طويل جدًا (الحد الأقصى 50 حرفًا)")
  .regex(/^[\u0621-\u064Aa-zA-Z\s]+$/, "يجب أن يحتوي الاسم على حروف فقط");

export const entityName = z
  .string("الاسم مطلوب")
  .trim()
  .min(2, "يجب أن يتكون الاسم من حرفين على الأقل")
  .max(50, "الاسم طويل جدًا (الحد الأقصى 50 حرفًا)")
  .regex(
    /^[\u0621-\u064Aa-zA-Z0-9\s]+$/,
    "يجب أن يحتوي الاسم على حروف وأرقام فقط",
  );

export const phone = z
  .string("رقم الهاتف مطلوب")
  .regex(/^01[0125]\d{8}$/, "رقم هاتف مصري غير صالح");

export const password = z
  .string("كلمة المرور مطلوبة")
  .min(8, "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل")
  .max(32, "كلمة المرور طويلة جدًا");

export const address = z
  .string("العنوان مطلوب")
  .trim()
  .min(5, "يجب أن يتكون العنوان من 5 أحرف على الأقل")
  .max(150, "العنوان طويل جدًا");

export const url = z.string("الرابط مطلوب").url("صيغة الرابط غير صالحة");

// --- Numbers & Finance ---

export const positiveNumber = z
  .number()
  .positive("يجب أن يكون رقمًا موجبًا");

export const price = z.number().min(0, "لا يمكن أن يكون السعر سالبًا");

export const count = z.coerce
  .number()
  .int("يجب أن يكون رقمًا صحيحًا")
  .min(1, "يجب أن يكون العدد 1 على الأقل");

export const limit = z.coerce.number().int().min(1).max(100).default(50);

// --- Dates ---

export const date = z.string().transform((val) => dayjs(val).toISOString());

export const futureDate = z
  .date()
  .refine((val) => dayjs(val).isAfter(dayjs().subtract(1, "minute")), {
    message: "يجب أن يكون التاريخ في الحاضر أو المستقبل",
  });

// --- Enums Validation ---

export const userRole = z.enum(Role);
export const supportType = z.enum(SupportType);
export const transmission = z.enum(Transmission);
export const platform = z.enum(Platform);
export const paymentMethod = z.enum(PaymentMethod);
export const lessonStatus = z.enum(LessonStatus);
export const subscriptionStatus = z.enum(SubscriptionStatus);
export const clientSource = z.enum(ClientSource);
export const transactionParty = z.enum(TransactionParty);
export const transactionType = z.enum(TransactionType);



// --- Specialized Helpers ---

export const booleanQuery = z
  .enum(["true", "false"])
  .transform((value) => value === "true");

export const boolean = z.boolean();

export const plateNumber = z
  .string("رقم اللوحة مطلوب")
  .min(3, "رقم لوحة غير صالح")
  .max(10, "رقم اللوحة طويل جدًا");