import { FormFieldProps } from "@/lib/sanity/queries/form";

import { SelectItem } from "@workspace/packages/ui/src/components/select";
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@workspace/packages/ui/src/components/select";
import { FormControl } from "@workspace/packages/ui/src/components/form";
import { FormLabel } from "@workspace/packages/ui/src/components/form";
import { FormItem } from "@workspace/packages/ui/src/components/form";
import { FormField } from "@workspace/packages/ui/src/components/form";
import { Select } from "@workspace/packages/ui/src/components/select";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

const SELECT_ITEM_CLASSES = [
  "hover:bg-theme-blue",
  "hover:bg-theme-green",
  "hover:bg-theme-yellow",
  "hover:bg-theme-red",
];

export default function SanitySelectFormField({
  options,
  name,
  label,
  choices,
  className,
}: FormFieldProps & {
  className?: string;
}) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="sr-only">{label}</FormLabel>
          <Select onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger
                className={cn(
                  "flex bg-nav-bar-background/20 h-[55px] border-none rounded gap-4 p-4 w-full text-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground text-white placeholder:text-white focus-visible:outline-none focus:outline-0 focus:ring-0 focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm appearance-none",
                  className,
                )}
              >
                <SelectValue placeholder={label} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {choices &&
                choices.map((option, i) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className={cn(
                      SELECT_ITEM_CLASSES[i % SELECT_ITEM_CLASSES.length],
                      "hover:text-white",
                    )}
                  >
                    {option.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}
