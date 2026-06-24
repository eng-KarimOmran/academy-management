import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Activity } from "react";

export interface SubmitButtonProps {
  loadingText?: string;
  text: string;
  disabled?: boolean;
  variant?:
    | "link"
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive";
}

export default function SubmitButton({
  loadingText = "جاري التحميل...",
  text,
  variant = "default",
  isSubmitting,
  disabled,
}: SubmitButtonProps & { isSubmitting: boolean }) {
  const isDisabled = typeof disabled === "boolean" ? disabled : false;
  return (
    <Button
      type="submit"
      disabled={isDisabled || isSubmitting}
      className="w-full"
      variant={variant}
    >
      <Activity mode={isSubmitting ? "visible" : "hidden"}>
        {loadingText}
        <Spinner />
      </Activity>
      {text}
    </Button>
  );
}
