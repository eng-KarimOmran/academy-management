export const enumTranslations = {
  // Role
  SECRETARY: "سكرتير",
  CAPTAIN: "مدرب",
  MANAGER: "مدير",

  // Transmission & SupportType
  MANUAL: "مانيوال",
  AUTOMATIC: "أوتوماتيك",
  BOTH: "مانيوال أو أوتوماتيك",

  // LessonStatus
  SCHEDULED: "مجدول",
  COMPLETED: "مكتمل",
  CANCELED: "ملغي",
  CANCELED_CHARGED: "ملغي مع احتساب الرسوم",

  // PaymentMethod
  MONETARY: "نقدي",
  ELECTRONIC: "إلكتروني",

  // Platform
  FACEBOOK: "فيسبوك",
  TIKTOK: "تيك توك",
  INSTAGRAM: "إنستجرام",
  TWITTER: "تويتر",
  YOUTUBE: "يوتيوب",
  LINKEDIN: "لينكدإن",
  SNAPCHAT: "سناب شات",
  WHATSAPP: "واتساب",

  // LedgerTransactionStatus
  PENDING: "قيد الانتظار",
  APPROVED: "معتمد",
  REJECTED: "مرفوض",

  // SubscriptionStatus
  PENDING_DEPOSIT: "في انتظار دفع العربون",
  PENDING_FIRST_SESSION: "في انتظار أول حصة",
  GRACE_PERIOD: "فترة سماح",
  SUSPENDED: "موقوف",
  ACTIVE: "نشط",

  // ClientSource
  PLATFORM: "المنصة",
  OFFICE: "المكتب",

  // LedgerEffect
  CREDIT: "إضافة",
  DEBIT: "خصم",

  // ReferenceCategory
  lessonId: "حصة",
  paymentId: "دفعة",
  ledgerId: "قيد مالي",
  subscriptionId: "اشتراك",

  // TransactionType
  CUSTOMER_PAYMENT: "دفع من العميل",
  CUSTOMER_REFUND: "استرجاع للعميل",
  EMPLOYEE_TRANSFER_TO_EMPLOYEE: "تحويل بين الموظفين",
  EMPLOYEE_TRANSFER_TO_ACADEMY: "تحويل من الموظف إلى الأكاديمية",
  ACADEMY_TRANSFER_TO_EMPLOYEE: "تحويل من الأكاديمية إلى الموظف",

  // TransactionParty
  ACADEMY: "الأكاديمية",
  USER: "موظف",
  SUBSCRIPTION: "اشتراك",

  // Boolean
  TRUE: "نعم",
  FALSE: "لا",
} as const;