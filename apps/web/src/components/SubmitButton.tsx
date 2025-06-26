import { useState } from "react";
import { Button } from "./ui/Button";
import { useFormStatus } from "react-dom";
import { twMerge } from "tailwind-merge";

const HOVER_CLASSES = [
  "hover:bg-theme-blue hover:text-white",
  "hover:bg-theme-red hover:text-white",
  "hover:bg-theme-green hover:text-white",
  "hover:bg-theme-yellow hover:text-white",
];

export default function SubmitButton({
  submitButtonText,
}: {
  submitButtonText: string;
}) {
  const { pending } = useFormStatus();
  const [hover, setHover] = useState(0);

  return (
    <Button
      type="submit"
      disabled={pending}
      onMouseLeave={() => setHover((hover + 1) % HOVER_CLASSES.length)}
      className={twMerge(
        "lg:col-span-2 justify-start p-[15px] h-[68px]",
        HOVER_CLASSES[hover],
      )}
    >
      {pending ? "Submitting..." : submitButtonText}
    </Button>
  );
}
