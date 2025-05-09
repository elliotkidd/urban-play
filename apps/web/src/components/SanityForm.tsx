"use client";

import {
  Form,
  FormControl,
  FormLabel,
  FormItem,
  FormField,
} from "@workspace/packages/ui/src/components/form";
import { useForm } from "react-hook-form";
import { Input } from "@workspace/packages/ui/src/components/input";
import { Textarea } from "@workspace/packages/ui/src/components/textarea";
import { cn } from "@/lib/utils";
import { z } from "groqd";
import { zodResolver } from "@hookform/resolvers/zod";
import SanityRadioGroup from "./ui/inputs/SanityRadioGroup";
import SanityCheckboxGroup from "./ui/inputs/SanityCheckboxGroup";
import type {
  CheckboxGroupProps,
  FormProps,
  InputProps,
  RadioGroupProps,
  SelectProps,
} from "@/lib/sanity/queries/form";
import { useFormspark } from "@formspark/use-formspark";
import SanitySelectFormField from "./ui/inputs/SanitySelectFormField";
import { Button } from "@workspace/packages/ui/src/components/button";

const FORM_SPARK_ID = process.env.NEXT_PUBLIC_FORM_SPARK_ID ?? "";

const components = {
  input: Input,
  textArea: Textarea,
};

const FOCUS_INPUT_CLASSES = [
  "focus:bg-theme-blue",
  "focus:bg-theme-green",
  "focus:bg-theme-yellow",
  "focus:bg-theme-red",
];

const DIRTY_INPUT_CLASSES = [
  "bg-theme-blue",
  "bg-theme-green",
  "bg-theme-yellow",
  "bg-theme-red",
];

const getFormSchema = (form: FormProps) => {
  return form.reduce(
    (schema, field) => {
      if (field._type === "checkboxGroup" && "options" in field) {
        schema[field.name] = z.record(z.string(), z.boolean());
      } else if (field._type === "radioGroup" && "options" in field) {
        schema[field.name] = z.string();
      } else if (
        field._type === "input" &&
        "type" in field &&
        "required" in field
      ) {
        switch (field.type) {
          case "email":
            schema[field.name] = field.required
              ? z.string().email()
              : z.string().email().optional();
            break;
          case "number":
            schema[field.name] = field.required
              ? z.number()
              : z.number().optional();
            break;
          default:
            schema[field.name] = field.required
              ? z.string()
              : z.string().optional();
        }
      } else if ("name" in field) {
        schema[field.name] = z.string().optional();
      } else {
        return schema;
      }
      return schema;
    },
    {} as Record<string, z.ZodTypeAny>,
  );
};

const getDefaultValues = (form: FormProps) => {
  return form.reduce(
    (acc, field) => {
      if (field._type === "checkboxGroup" && "options" in field) {
        field.options.forEach((option) => {
          acc[option.value] = false;
        });
      } else if (field._type === "radioGroup") {
        acc[field.name] = "";
      } else {
        acc[field.name] = "";
      }
      return acc;
    },
    {} as Record<string, any>,
  );
};

export default function SanityForm({
  form,
  className,
}: {
  form: FormProps;
  className?: string;
}) {
  const formSchema = z.object(getFormSchema(form));
  const defaultValues = getDefaultValues(form);
  console.log(defaultValues);

  const formContext = useForm({
    defaultValues,
  });

  const { handleSubmit, formState, control } = formContext;

  const { dirtyFields } = formState;

  console.log(dirtyFields);

  const [submit, isSubmitting] = useFormspark({
    formId: FORM_SPARK_ID,
  });

  return (
    <Form {...formContext}>
      <form
        onSubmit={handleSubmit(submit)}
        className={cn("grid lg:grid-cols-2 gap-4", className)}
      >
        {form.map(
          (
            props:
              | SelectProps
              | CheckboxGroupProps
              | InputProps
              | RadioGroupProps,
            index: number,
          ) => {
            const { _type, columns, _key, ...rest } = props;
            switch (_type) {
              case "select":
                return (
                  <SanitySelectFormField
                    key={_key}
                    {...(rest as SelectProps)}
                    className={cn(columns === 2 && "lg:col-span-2")}
                  />
                );
                break;
              case "checkboxGroup":
                return (
                  <SanityCheckboxGroup
                    key={_key}
                    {...(rest as CheckboxGroupProps)}
                    className={cn(columns === 2 && "lg:col-span-2")}
                  />
                );

              case "radioGroup":
                return (
                  <SanityRadioGroup
                    key={_key}
                    {...(rest as RadioGroupProps)}
                    className={cn(columns === 2 && "lg:col-span-2")}
                  />
                );

              default:
                const Component = components[_type];

                const { name, label } = props;

                if (!Component) {
                  return (
                    <div
                      key={_key}
                      className={cn(
                        "border-2 border-red-500 bg-red-500/20 text-red-500 p-4 rounded-md",
                      )}
                    >
                      Component not found for type: {_type}
                    </div>
                  );
                }

                return (
                  <FormField
                    key={_key}
                    control={control}
                    name={name}
                    render={({ field }) => (
                      <FormItem
                        className={cn(columns === 2 && "lg:col-span-2")}
                      >
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                          <Component
                            {...field}
                            {...(rest as InputProps)}
                            className={cn(
                              dirtyFields[name] &&
                                DIRTY_INPUT_CLASSES[
                                  index % DIRTY_INPUT_CLASSES.length
                                ],
                              FOCUS_INPUT_CLASSES[
                                index % FOCUS_INPUT_CLASSES.length
                              ],
                            )}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                );
                break;
            }
          },
        )}
        <Button type="submit" disabled={isSubmitting} className="lg:col-span-2">
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
