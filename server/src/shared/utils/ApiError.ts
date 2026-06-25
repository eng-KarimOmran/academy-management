import ErrorResponse from "./errorResponse";

const NOT_FOUND_MESSAGES = {
  User: "المستخدم غير موجود",
  BlacklistedToken: "الجلسة انتهت أو الرمز غير صالح",

  Academy: "الأكاديمية غير موجودة",
  SocialMedia: "منصة التواصل الاجتماعي غير موجودة",
  Address: "العنوان غير موجود",
  Phone: "رقم الهاتف غير موجود",

  Car: "السيارة غير موجودة",
  Area: "المنطقة غير موجودة",
  Client: "العميل غير موجود",
  Subscription: "الاشتراك غير موجود",
  Course: "الدورة التدريبية غير موجودة",
  Lesson: "الحصة غير موجودة",

  ProofOfPaymentImage: "إثبات الدفع غير موجود",
  TrainingDetails: "خصائص البرنامج غير موجودة",
  LedgerTransaction: "المعاملة غير موجودة",

  Employee: "الموظف غير موجود",
  PaymentLink: "رابط الدفع غير موجود",
  Person: "الشخص غير موجود",
  PersonPhone: "هاتف الشخص غير موجود",
  AcademyPhone: "رقم الأكاديمية غير موجود",

  AcademyAddress: "عنوان الأكاديمية غير موجود",
  AcademyPaymentLink: "رابط الدفع غير موجود",
  PATH_NOT_FOUND: "المسار غير موجود"
} as const;

export const CONFLICT_MESSAGES = {
  // Identity / Uniqueness
  PHONE_ALREADY_EXISTS: "رقم الهاتف مسجل بالفعل",
  EMAIL_ALREADY_EXISTS: "البريد الإلكتروني مستخدم بالفعل",
  NAME_ALREADY_EXISTS: "هذا الاسم مستخدم مسبقاً",
  ADDRESS_ALREADY_EXISTS: "العنوان مسجل بالفعل",

  // Vehicle
  PLATE_NUMBER_ALREADY_EXISTS: "رقم اللوحة مسجل لسيارة أخرى بالفعل",

  // Roles / Profiles
  CAPTAIN_PROFILE_EXISTS: "هذا الموظف لديه ملف كابتن بالفعل",
  SECRETARY_PROFILE_EXISTS: "هذا الموظف لديه ملف سكرتارية بالفعل",
  ROLE_ALREADY_ASSIGNED: "المستخدم لديه بالفعل الصلاحية",
  USER_ALREADY_EXISTS: "يوجد مستخدم بالفعل",
  OWNER_ALREADY_ASSIGNED: "المستخدم مالك بالفعل",

  // Financial
  OVERPAYMENT: "المبلغ المدفوع يتجاوز الرصيد المطلوب",
  EXCESS_REFUND: "مبلغ الاسترداد يتجاوز إجمالي المدفوع",
  INSUFFICIENT_REMAINING_BALANCE: "الرصيد المتبقي غير كافٍ",
  SUBSCRIPTION_ALREADY_PAID: "هذا الاشتراك تم سداده بالكامل",
  SUBSCRIPTION_ALREADY_CANCELLED: "هذا الاشتراك ملغي بالفعل",
  PAYROLL_ALREADY_PAID: "تم دفع الراتب خلال هذه الفترة",

  // Scheduling
  CAPTAIN_TIME_CONFLICT: "الكابتن لديه حصة أخرى في هذا الوقت",
  CAR_TIME_CONFLICT: "السيارة محجوزة في هذا الوقت",
  CLIENT_TIME_CONFLICT: "العميل لديه حصة أخرى في هذا الوقت",

  // Platform / System
  PLATFORM_ALREADY_EXISTS: "المنصة مسجلة بالفعل",
  SOCIAL_MEDIA_ALREADY_EXISTS: "منصة التواصل الاجتماعي مسجلة بالفعل",
} as const;

type NotFoundModel = keyof typeof NOT_FOUND_MESSAGES;
type ConflictField = keyof typeof CONFLICT_MESSAGES;


const ApiError = {
  NotFound(model: NotFoundModel) {
    return new ErrorResponse(NOT_FOUND_MESSAGES[model], 404);
  },

  Conflict(field: ConflictField, customMessage?: string) {
    return new ErrorResponse(
      customMessage ?? CONFLICT_MESSAGES[field] ?? "حدث تعارض في البيانات",
      409
    );
  },

  Forbidden(message = "غير مسموح لك بالوصول") {
    return new ErrorResponse(message, 403);
  },

  AccountBlocked(message = "تم حظر هذا الحساب. يرجى التواصل مع الإدارة") {
    return new ErrorResponse(message, 403);
  },

  Unauthorized(message = "يرجى تسجيل الدخول أولاً") {
    return new ErrorResponse(message, 401);
  },

  ValidationError(message = "بيانات غير صحيحة") {
    return new ErrorResponse(message, 422);
  },

  BadRequest(message: string) {
    return new ErrorResponse(message, 400);
  },

  Inactive(
    model: "Course" | "Captain" | "Car" | "Area",
    message?: string
  ) {
    const messages: Record<typeof model, string> = {
      Course: "هذا الكورس غير مفعل حالياً",
      Captain: "هذا الكابتن غير مفعل حالياً",
      Car: "هذه السيارة غير مفعلة حالياً",
      Area: "هذه المنطقة غير مفعلة حالياً",
    };

    return new ErrorResponse(message ?? messages[model], 400);
  },

  Internal(message = "حدث خطأ غير متوقع في الخادم") {
    return new ErrorResponse(message, 500);
  },

  passwordChangeRequired(message = "يجب عليك تغيير كلمة المرور الافتراضية أولاً قبل استخدام النظام") {
    return new ErrorResponse(message, 403);
  },

  InvalidCredentials(data?: { password: boolean }) {
    let message = "رقم الهاتف أو كلمة المرور غير صحيحة"
    if (data?.password) {
      message = "كلمة المرور الحاليه غير صحيحة"
    }
    return new ErrorResponse(message, 401);
  },
};

export default ApiError;