import { Badge } from "@/components/ui/badge";

type Status =
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELED"
  | "PENDING"
  | "PAYMENT"
  | "REFUND"
  | "SCHEDULED"
  | "CANCELED_CHARGED"
  | "FALSE"
  | "TRUE"
  | "PENDING_DEPOSIT"
  | "ACTIVE_LIMITED";

export function BadgeDemo({ type, text }: { type: Status; text?: string }) {
  const green: Status[] = [
    "ACTIVE",
    "COMPLETED",
    "PAYMENT",
    "TRUE",
    "ACTIVE_LIMITED",
  ];
  const yellow: Status[] = ["PENDING", "SCHEDULED"];
  if (!text) {
    text = type;
  }
  return green.includes(type) ? (
    <Badge variant="success">{text}</Badge>
  ) : yellow.includes(type) ? (
    <Badge variant="warning">{text}</Badge>
  ) : (
    <Badge variant="destructive">{text}</Badge>
  );
}
