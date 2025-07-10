import { RadioGroupItem } from "@workspace/packages/ui/src/components/radio-group";

import type { FormFieldProps } from "@/lib/sanity/queries/form";
import { cn } from "@/lib/utils";
import { Label } from "@workspace/packages/ui/src/components/label";
import { RadioGroup } from "@workspace/packages/ui/src/components/radio-group";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@workspace/packages/ui/src/components/form";

export default function SanityRadioGroup({
  name,
  label,
  choices,
  className,
}: FormFieldProps & { className?: string }) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("space-y-2", className)}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              name={name}
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={cn("flex flex-row gap-2")}
            >
              {choices.map((option, index: number) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
