"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Form as ShadForm } from "@workspace/packages/ui/src/components/form";
import { RichText } from "./richtext";
import type { FormProps } from "@/lib/sanity/queries/form";
import { DefaultField } from "./DefaultField";
import { cn } from "@/lib/utils";
import SubmitButton from "./SubmitButton";
import { Button } from "./ui/Button";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

interface Props {
  formData: FormProps;
  onSubmit?: (data: any) => void;
  className?: string;
}

export function Form({ formData, onSubmit = console.log, className }: Props) {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const form = useForm();

  const { handleSubmit, reset } = form;

  const handleFormSubmit = async (data: any) => {
    try {
      if (!executeRecaptcha) {
        console.log("Recaptcha not ready");
        return;
      }

      const recaptchaToken = await executeRecaptcha(
        formData.id.replace("-", "_"),
      );

      const formDataToSend = new FormData();

      //console.log('Form Data from Sanity:', {
      //  id: formData._id,
      //  title: formData.title,
      //  responseEmail: formData.responseEmail,
      //});

      formDataToSend.append("formId", formData.id || "");
      formDataToSend.append("formTitle", formData.title || "");
      formDataToSend.append(
        "recipients",
        JSON.stringify(formData.recipients || []),
      );
      formDataToSend.append("form", JSON.stringify(formData));
      if (recaptchaToken) {
        formDataToSend.append("recaptchaToken", recaptchaToken);
      }

      for (const field of formData.fields || []) {
        if (!field.name) continue;

        let value = data[field.name];

        // Log field data for debugging
        // console.log('Processing field:', {
        //   name: field.name,
        //   type: field.type,
        //   value: value,
        // });

        // Handle file uploads
        if (
          field.type === "file" &&
          value instanceof FileList &&
          value.length > 0
        ) {
          const file = value[0];
          if (file) {
            formDataToSend.append(field.name, file);
          }
          continue;
        }

        // Handle signature fields
        if (field.type === "signature" && value) {
          formDataToSend.append(field.name, value);
          continue;
        }

        // Handle regular fields
        if (value && typeof value === "object") {
          value = Object.values(value).filter(Boolean).join(", ");
        }
        formDataToSend.append(field.name, value || "");
      }

      // console.log('📝 Form submission data:', {
      //  formId: formData._id,
      //  formTitle: formData.title,
      //  recipientCount: formData.recipients?.length,
      //});

      const response = await fetch("/api/form-submission", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      setIsSubmitted(true);
      onSubmit(result);

      // Handle success action
      if (
        formData.successAction?.type === "redirect" &&
        formData.successAction.redirectUrl
      ) {
        router.push(formData.successAction.redirectUrl);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (
    isSubmitted &&
    formData.successAction?.type === "message" &&
    formData.successAction.message
  ) {
    return (
      <div className="lg:col-span-2">
        <RichText richText={formData.successAction.message} />
        <Button
          onClick={() => {
            reset();
            setIsSubmitted(false);
          }}
          className="mt-4"
        >
          Reset
        </Button>
      </div>
    );
  }

  return (
    <ShadForm {...form}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className={cn("grid lg:grid-cols-2 gap-2", className)}
      >
        {formData.fields.map((field, index: number) => (
          <DefaultField key={field._key} field={field} index={index} />
        ))}
        <SubmitButton
          submitButtonText={formData?.submitButtonText ?? "Submit"}
        />
      </form>
    </ShadForm>
  );
}
