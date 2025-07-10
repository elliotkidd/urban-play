import { useState } from "react";
import { Button } from "./ui/Button";
import { useFormStatus } from "react-dom";
import { twMerge } from "tailwind-merge";

export default function SubmitButton({
  submitButtonText,
}: {
  submitButtonText: string;
}) {
  const { pending } = useFormStatus();

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
