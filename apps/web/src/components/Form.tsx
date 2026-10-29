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
import Link from "next/link";

interface Props {
  formData: FormProps;
  onSubmit?: (data: any) => void;
  className?: string;
  contactEmail?: string;
}

const ERROR_MESSAGES = {
  recaptchaUnavailable:
    "Our spam protection didn't load. Please refresh the page and try again.",
  verificationFailed:
    "We couldn't verify your submission, so it wasn't sent. Please try again.",
  generic:
    "Something went wrong and your message wasn't sent. Please try again in a moment.",
};

export function Form({
  formData,
  onSubmit = console.log,
  className,
  contactEmail,
}: Props) {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm();

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const handleFormSubmit = async (data: any) => {
    setError(null);

    try {
      if (!executeRecaptcha) {
        console.log("Recaptcha not ready");
        setError(ERROR_MESSAGES.recaptchaUnavailable);
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
      formDataToSend.append("fullname", data.fullname || "");

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

        // Opt-in is a boolean; send Yes/No so the enquiry email reads clearly
        if (field.type === "mailchimpOptIn") {
          formDataToSend.append(field.name, value ? "Yes" : "No");
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
        // 400s are reCAPTCHA rejections; anything else is a server/email failure
        setError(
          response.status === 400
            ? ERROR_MESSAGES.verificationFailed
            : ERROR_MESSAGES.generic,
        );
        return;
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
      setError(ERROR_MESSAGES.generic);
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
        <input
          type="text"
          autoComplete="off"
          tabIndex={-1}
          className="hidden control--pot"
          aria-hidden="true"
          {...form.register("fullname")}
        />
        {formData.fields.map((field, index: number) => (
          <DefaultField key={field._key} field={field} index={index} />
        ))}
        <p className="text-xs opacity-50 lg:col-span-2">
          This site is protected by reCAPTCHA and the Google{" "}
          <Link
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-dotted"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-dotted"
          >
            Terms of Service
          </Link>{" "}
          apply.
        </p>
        {error && (
          <p role="alert" className="text-sm text-red-500 lg:col-span-2">
            {error}
            {contactEmail && (
              <>
                {" "}
                You can also email us at{" "}
                <Link href={`mailto:${contactEmail}`} className="underline">
                  {contactEmail}
                </Link>
                .
              </>
            )}
          </p>
        )}
        <SubmitButton
          submitButtonText={formData?.submitButtonText ?? "Submit"}
          isSubmitting={isSubmitting}
        />
      </form>
    </ShadForm>
  );
}
