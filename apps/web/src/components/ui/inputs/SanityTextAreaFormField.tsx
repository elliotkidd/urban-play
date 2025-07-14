import { FormFieldProps } from "@/lib/sanity/queries/form";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@workspace/packages/ui/src/components/form";
import { Textarea } from "@workspace/packages/ui/src/components/textarea";
import { useFormContext } from "react-hook-form";

export function SanityTextAreaFormField({
  name,
  columns,
  label,
  className,
  richText,
  fileOptions,
  options,
  ...rest
}: FormFieldProps & {
  className?: string;
}) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(columns === 2 && "lg:col-span-2")}>
          <FormLabel className="sr-only">{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={options?.placeholder ?? label}
              {...field}
              {...rest}
              rows={6}
              className={className}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
