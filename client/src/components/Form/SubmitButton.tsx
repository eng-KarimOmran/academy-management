import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Activity } from "react";

export interface SubmitButtonProps {
  loadingText?: string;
  text: string;
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
}: SubmitButtonProps & { isSubmitting: boolean }) {
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
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