import z from "zod";
import dayjs from "dayjs";

import {
  CancelReason,
  LessonStatus,
  PaymentMethod,
  Platform,
  Role,
  TrainingSupport,
  Transmission,
  UserStatus,
  SubscriptionStatus,
  TransactionType,
  Status,
  ExpenseType,
  ClientSource,
  RecordType,
} from "../types/enums";

// --- Basic Types ---

export const id = z.cuid2("معرف غير صالح");

export const personName = z
  .string("الاسم مطلوب")
  .trim()
  .min(2, "يجب ألا يقل الاسم عن حرفين")
  .max(50, "الاسم طويل جدًا")
  .regex(/^[\u0621-\u064Aa-zA-Z\s]+$/, "يجب أن يحتوي الاسم على حروف فقط");

export const entityName = z
  .string("الاسم مطلوب")
  .trim()
  .min(2, "يجب ألا يقل الاسم عن حرفين")
  .max(50, "الاسم طويل جدًا")
  .regex(
    /^[\u0621-\u064Aa-zA-Z0-9\s]+$/,
    "يجب أن يحتوي الاسم على حروف أو أرقام فقط",
  );

export const phone = z
  .string("رقم الهاتف مطلوب")
  .regex(/^01[0125]\d{8}$/, "رقم الهاتف المصري غير صالح");

export const password = z
  .string("كلمة المرور مطلوبة")
  .min(8, "يجب ألا تقل كلمة المرور عن 8 أحرف")
  .max(32, "كلمة المرور طويلة جدًا");

export const address = z
  .string("العنوان مطلوب")
  .trim()
  .min(5, "يجب ألا يقل العنوان عن 5 أحرف")
  .max(150, "العنوان طويل جدًا");

export const url = z.url("الرابط غير صالح");

export const boolean = z.boolean();

export const plateNumber = z
  .string("رقم اللوحة مطلوب")
  .min(3, "رقم اللوحة غير صالح")
  .max(10, "رقم اللوحة طويل جدًا");

export const email = z.email("البريد الإلكتروني غير صالح");

// --- Numbers & Finance ---

export const positiveNumber = z
  .number("يجب إدخال رقم صحيح")
  .positive("يجب أن يكون الرقم أكبر من صفر");

export const price = z
  .number("يجب إدخال رقم صحيح")
  .min(0, "السعر لا يمكن أن يكون أقل من صفر");

export const count = z
  .number("يجب إدخال رقم صحيح")
  .int("يجب إدخال عدد صحيح")
  .min(1, "يجب أن يكون العدد 1 على الأقل");

export const limit = z
  .number("يجب إدخال رقم صحيح")
  .min(1, "الحد الأدنى 1")
  .max(100, "الحد الأقصى 100")
  .default(50);

// --- Dates ---

export const date = z.date({
  message: "التاريخ غير صالح",
});

export const futureDate = z.coerce
  .date({
    message: "التاريخ غير صالح",
  })
  .refine((val) => dayjs(val).isAfter(dayjs().subtract(1, "minute")), {
    message: "يجب أن يكون التاريخ في الحاضر أو المستقبل",
  });

export const userRole = z.enum(Role, {
  message: "نوع المستخدم غير صالح",
});

export const userStatus = z.enum(UserStatus, {
  message: "حالة المستخدم غير صالحة",
});

export const trainingSupport = z.enum(TrainingSupport, {
  message: "نوع الدعم التدريبي غير صالح",
});

export const transmission = z.enum(Transmission, {
  message: "نوع ناقل الحركة غير صالح",
});

export const platform = z.enum(Platform, {
  message: "المنصة غير صالحة",
});

export const paymentMethod = z.enum(PaymentMethod, {
  message: "طريقة الدفع غير صالحة",
});

export const cancelReason = z.enum(CancelReason, {
  message: "سبب الإلغاء غير صالح",
});

export const lessonStatus = z.enum(LessonStatus, {
  message: "حالة الحصة غير صالحة",
});

export const subscriptionStatus = z.enum(SubscriptionStatus, {
  message: "حالة الاشتراك غير صالحة",
});

export const transactionType = z.enum(TransactionType, {
  message: "نوع العملية غير صالح",
});

export const transactionStatus = z.enum(Status, {
  message: "الحالة غير صالحة",
});

export const expenseType = z.enum(ExpenseType, {
  message: "نوع المصروف غير صالح",
});

export const clientSource = z.enum(ClientSource, {
  message: "مصدر العميل غير صالح",
});

export const recordType = z.enum(RecordType, {
  message: "نوع السجل غير صالح",
});
