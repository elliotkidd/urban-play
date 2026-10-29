import { useState } from "react";
import { Button } from "./ui/Button";
import { useFormStatus } from "react-dom";
import { twMerge } from "tailwind-merge";

export default function SubmitButton({
  submitButtonText,
  isSubmitting = false,
}: {
  submitButtonText: string;
  // useFormStatus only tracks form actions, so onSubmit handlers pass this in
  isSubmitting?: boolean;
}) {
  const { pending: actionPending } = useFormStatus();
  const pending = actionPending || isSubmitting;

  return (
    <Button
      type="submit"
      disabled={pending}
      className={twMerge("justify-start place-self-start")}
    >
      {pending ? "Submitting..." : submitButtonText}
    </Button>
  );
}
