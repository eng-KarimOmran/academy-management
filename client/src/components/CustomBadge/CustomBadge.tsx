import { Badge } from "@/components/ui/badge";

import {
  LedgerTransactionStatus,
  LessonStatus,
  SubscriptionStatus,
} from "@/types/enums";

type Status =
  | LessonStatus
  | LedgerTransactionStatus
  | SubscriptionStatus
  | "TRUE"
  | "FALSE";

const statusVariant: Record<Status, "success" | "warning" | "destructive"> = {
  // Lesson Status
  [LessonStatus.SCHEDULED]: "warning",
  [LessonStatus.COMPLETED]: "success",
  [LessonStatus.CANCELED]: "destructive",
  [LessonStatus.CANCELED_CHARGED]: "destructive",

  // Ledger Transaction Status
  [LedgerTransactionStatus.PENDING]: "warning",
  [LedgerTransactionStatus.APPROVED]: "success",
  [LedgerTransactionStatus.REJECTED]: "destructive",

  // Subscription Status
  [SubscriptionStatus.PENDING_DEPOSIT]: "warning",
  [SubscriptionStatus.PENDING_FIRST_SESSION]: "warning",
  [SubscriptionStatus.GRACE_PERIOD]: "warning",
  [SubscriptionStatus.SUSPENDED]: "destructive",
  [SubscriptionStatus.ACTIVE]: "success",

  // Boolean
  TRUE: "success",
  FALSE: "destructive",
};

interface BadgeDemoProps {
  type: Status;
  text?: string;
}

export function BadgeDemo({ type, text }: BadgeDemoProps) {
  return <Badge variant={statusVariant[type]}>{text ?? type}</Badge>;
}
