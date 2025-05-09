import { SelectProps } from "@/lib/sanity/queries/form";

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
  placeholder,
  className,
}: SelectProps & {
  className?: string;
}) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options &&
                options.map((option, i) => (
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
