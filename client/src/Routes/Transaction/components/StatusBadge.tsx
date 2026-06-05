import { Badge } from "@/components/ui/badge";
import { enumTranslations } from "@/lib/enumTranslations";
import type { Status, SubscriptionStatus } from "@/types/enums";

export const StatusBadge = ({
  status,
}: {
  status: Status | SubscriptionStatus;
}) => {
  let variant: "destructive" | "success" | "warning";

  if (["REJECTED", "CANCELED", "PAUSED"].includes(status)) {
    variant = "destructive";
  } else if (["COMPLETED", "ACTIVE"].includes(status)) {
    variant = "success";
  } else {
    variant = "warning";
  }

  return (
    <Badge variant={variant} className="px-4 py-1">
      {enumTranslations[status as keyof typeof enumTranslations] || status}
    </Badge>
  );
};
