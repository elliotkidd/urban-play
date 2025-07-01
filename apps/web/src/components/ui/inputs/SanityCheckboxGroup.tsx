import { FormFieldProps } from "@/lib/sanity/queries/form";
import { cn } from "@/lib/utils";

import { Checkbox } from "@workspace/packages/ui/src/components/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
  name,
  choices,
  className,
}: FormFieldProps & { className?: string }) {
  const { control } = useFormContext();

  return (
    <div className={cn("space-y-2", className)}>
      <FormLabel>{label}</FormLabel>
      <div className={cn("flex gap-4 flex-row")}>
        {choices.map((option, index: number) => (
          <FormField
            key={option.label}
            control={control}
            name={option.label}
            render={({ field }) => (
              <FormItem className={cn("flex items-center gap-2 space-y-0")}>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={
                      CHECKBOX_CLASSES[index % CHECKBOX_CLASSES.length]
                    }
                  />
                </FormControl>
                <FormLabel htmlFor={option.value} className="">
                  {option.label}
                </FormLabel>
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
}
