import { Badge } from "@/components/ui/badge";

type Status =
  | "ACTIVE"
  | "PAUSED"
  | "COMPLETED"
  | "CANCELED"
  | "FULLYBOOKED"
  | "PENDING"
  | "REJECTED"
  | "PAYMENT"
  | "REFUND"
  | "SCHEDULED"
  | "CANCELED_CHARGED"
  | "FALSE"
  | "TRUE";

export function BadgeDemo({ type, text }: { type: Status; text?: string }) {
  const green: Status[] = [
    "ACTIVE",
    "COMPLETED",
    "FULLYBOOKED",
    "PAYMENT",
    "TRUE",
  ];
  const yellow: Status[] = ["PAUSED", "PENDING", "SCHEDULED"];
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
