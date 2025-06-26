import { FormFieldProps } from "@/lib/sanity/queries/form";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/packages/ui/src/components/form";
import { Input } from "@workspace/packages/ui/src/components/input";
import { useFormContext } from "react-hook-form";

export function SanityInput({
  name,
  columns,
  label,
  className,
  richText,
  fileOptions,
  options: { placeholder },
  ...rest
}: FormFieldProps & {
  className?: string;
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(columns === 2 && "lg:col-span-2")}>
          <FormLabel className="sr-only">{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder ?? label}
              {...field}
              {...rest}
              className={className}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
