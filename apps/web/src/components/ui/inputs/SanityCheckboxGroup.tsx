import { cn } from "@/lib/utils";

import { CheckboxGroupProps } from "@/lib/sanity/queries/form";
import { Label } from "@workspace/packages/ui/src/components/label";
import { Checkbox } from "@workspace/packages/ui/src/components/checkbox";
import {
  FormField,
  FormItem,
} from "@workspace/packages/ui/src/components/form";
import { useFormContext } from "react-hook-form";

const CHECKBOX_CLASSES = [
  "data-[state=checked]:bg-theme-blue border-theme-blue",
  "data-[state=checked]:bg-theme-green border-theme-green",
  "data-[state=checked]:bg-theme-yellow border-theme-yellow",
  "data-[state=checked]:bg-theme-red border-theme-red",
];

export default function SanityCheckboxGroup({
  options,
  label,
  orientation,
  className,
}: CheckboxGroupProps & { className?: string }) {
  const { control } = useFormContext();

  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>
      <div
        className={cn(
          "flex flex-col gap-4",
          orientation === "horizontal" && "flex-row",
        )}
      >
        {options.map((option, index: number) => (
          <FormField
            key={option.value}
            control={control}
            name={option.value}
            render={({ field }) => (
              <FormItem
                className={cn(
                  "flex items-center gap-2 space-y-0",
                  orientation === "horizontal" && "flex-row",
                )}
              >
                <Checkbox
                  {...field}
                  id={option.value}
                  className={CHECKBOX_CLASSES[index % CHECKBOX_CLASSES.length]}
                />
                <Label htmlFor={option.value} className="">
                  {option.label}
                </Label>
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
}
