import { ModelName } from "../../../prisma/generated/internal/prismaNamespace";
import ErrorResponse from "./errorResponse";

export type UniqueField =
  | "Phone"
  | "Name"
  | "PlateNumber"
  | "CaptainProfile"
  | "SecretaryProfile"
  | "RoleConflict"
  | "EXCESS_REFUND"
  | "OVERPAYMENT"
  | "SubscriptionAlreadyCancelled"
  | "CaptainTimeConflict"
  | "CarTimeConflict"
  | "ClientTimeConflict"
  | "OWNER"
  | "OWNER_ALREADY_EXISTS"

class ApiError {
  static NotFound({
    model,
    customMessage,
  }: {
    customMessage?: string;
    model?: ModelName;
  }) {
    const messages: Record<ModelName, string> = {
      User: "المستخدم غير موجود",
      BlacklistedToken: "الجلسة انتهت أو الرمز غير صالح",
      Academy: "الأكاديمية غير موجودة",
      SocialMedia: "منصة التواصل الاجتماعي غير موجودة",
      Secretary: "بيانات السكرتارية غير موجودة",
      Captain: "بيانات الكابتن غير موجودة",
      Car: "السيارة غير موجودة",
      Area: "المنطقة غير موجودة",
      Client: "العميل غير موجود",
      Subscription: "الاشتراك غير موجود",
      PaymentTransaction: "عملية الدفع غير موجودة",
      Course: "الدورة التدريبية غير موجودة",
      Lesson: "الحصة غير موجودة",
      Expense: "سجل المصروفات غير موجود",
      LedgerTransaction: "المعاملة غير موجوده",
      ProofOfPaymentImage: "اثبات الدفع غير موجود",
      TrainingDetails: "خصائص البرنامج غير موجود",
    };
    let message: string = "";
    if (model) {
      message = messages[model];
    } else if (customMessage) {
      message = customMessage;
    } else {
      message = "السجل المطلوب غير موجود";
    }
    return new ErrorResponse(message, 404);
  }

  static Conflict(field: UniqueField, customMessage?: string) {
    const messages: Record<UniqueField, string> = {
      Phone: "رقم الهاتف مسجل بالفعل",
      Name: "هذا الاسم مستخدم مسبقاً",
      PlateNumber: "رقم اللوحة مسجل لسيارة أخرى بالفعل",
      CaptainProfile: "هذا المستخدم لديه ملف كابتن بالفعل",
      SecretaryProfile: "هذا المستخدم لديه ملف سكرتارية بالفعل",
      RoleConflict: "لا يمكن للمستخدم أن يكون كابتن وسكرتارية في نفس الوقت",
      OVERPAYMENT: "المبلغ المدفوع يتجاوز الرصيد المتبقي المطلوب",
      EXCESS_REFUND: "مبلغ الاسترداد يتجاوز إجمالي المبلغ المدفوع",
      SubscriptionAlreadyCancelled: "هذا الاشتراك ملغي بالفعل",
      CaptainTimeConflict: "الكابتن لديه حصة أخرى في هذا الوقت",
      CarTimeConflict: "السيارة محجوزة في هذا الوقت",
      ClientTimeConflict: "العميل لديه حصة أخرى في هذا الوقت",
      OWNER: "المستخدم مالك بالفعل",
      OWNER_ALREADY_EXISTS: "يوجد مستخدم مالك بالفعل"
    };
    const message = customMessage || messages[field] || "حدث تعارض في البيانات";
    return new ErrorResponse(message, 409);
  }

  static Forbidden(
    message: string = "غير مسموح لك بالوصول صلاحياتك غير كافية",
  ) {
    return new ErrorResponse(message, 403);
  }

  static AccountBlocked(customMessage?: string) {
    return new ErrorResponse(
      customMessage || "تم حظر هذا الحساب. يرجى التواصل مع الإدارة",
      403,
    );
  }

  static Unauthorized(message: string = "يرجى تسجيل الدخول أولاً") {
    return new ErrorResponse(message, 401);
  }

  static ValidationError(message: string = "بيانات خاطئة أو غير كاملة") {
    return new ErrorResponse(message, 422);
  }

  static BadRequest(message: string) {
    return new ErrorResponse(message, 400);
  }

  static Inactive(
    model: "Course" | "Captain" | "Car" | "Area",
    customMessage?: string,
  ) {
    const messages: Record<"Course" | "Captain" | "Car" | "Area", string> = {
      Course: "هذا الكورس غير مفعل حالياً",
      Captain: "هذا الكابتن غير مفعل حالياً",
      Car: "هذه السيارة غير مفعلة حالياً",
      Area: "هذه المنطقة غير مفعلة حالياً",
    };
    const message =
      customMessage || messages[model] || "هذا العنصر غير نشط حالياً";
    return new ErrorResponse(message, 400);
  }

  static Internal(message?: string) {
    return new ErrorResponse(message || "حدث خطأ غير متوقع في الخادم", 500);
  }
}

export default ApiError;
