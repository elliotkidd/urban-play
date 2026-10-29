"use client";

import { ArrowRight } from "lucide-react";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ERROR_MESSAGES = {
  recaptchaUnavailable:
    "Our spam protection didn't load. Please refresh the page and try again.",
  verificationFailed: "We couldn't verify your sign-up. Please try again.",
  invalidEmail:
    "That email address couldn't be added. Please check it and try again.",
  unsubscribed:
    "This email has unsubscribed before, so it can't be re-added here. Please get in touch and we'll sort it out.",
  generic: "Sorry, something went wrong. Please try again in a moment.",
};

// Maps an /api/mailchimp error to a message the subscriber can act on
function getErrorMessage(errorData) {
  if (typeof errorData === "string") {
    return errorData.includes("reCAPTCHA")
      ? ERROR_MESSAGES.verificationFailed
      : ERROR_MESSAGES.generic;
  }

  switch (errorData?.title) {
    case "Invalid Resource":
      return ERROR_MESSAGES.invalidEmail;
    case "Forgotten Email Not Subscribed":
    case "Member In Compliance State":
      return ERROR_MESSAGES.unsubscribed;
    default:
      return ERROR_MESSAGES.generic;
  }
}

const Newsletter = ({ data = {} }) => {
  // Extract our module data
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  // Call to reset the form
  const resetForm = (e) => {
    e.preventDefault();
    reset();
    setError(null);
    setSuccess(false);
    setSubmitting(false);
  };

  // handle form submission
  const onSubmit = async (data) => {
    console.log("Form data being submitted:", data);
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    // Check if reCAPTCHA Enterprise is available, wait if not ready
    if (
      typeof window === "undefined" ||
      !window.grecaptcha ||
      !window.grecaptcha.enterprise
    ) {
      console.log("reCAPTCHA Enterprise not available, waiting...");

      // Wait for reCAPTCHA to load
      let attempts = 0;
      const maxAttempts = 20; // 10 seconds total

      const waitForRecaptcha = () => {
        if (
          typeof window !== "undefined" &&
          window.grecaptcha &&
          window.grecaptcha.enterprise
        ) {
          console.log("reCAPTCHA Enterprise is now ready");
          onSubmit(data);
        } else if (attempts < maxAttempts) {
          attempts++;
          console.log(
            `Waiting for reCAPTCHA Enterprise... attempt ${attempts}`,
          );
          setTimeout(waitForRecaptcha, 500);
        } else {
          console.log(
            "reCAPTCHA Enterprise failed to load after multiple attempts",
          );
          setSubmitting(false);
          setError(ERROR_MESSAGES.recaptchaUnavailable);
        }
      };

      waitForRecaptcha();
      return;
    }

    try {
      // Use reCAPTCHA Enterprise API directly
      const recaptchaToken = await new Promise((resolve, reject) => {
        if (
          typeof window !== "undefined" &&
          window.grecaptcha &&
          window.grecaptcha.enterprise
        ) {
          window.grecaptcha.enterprise.ready(async () => {
            try {
              const token = await window.grecaptcha.enterprise.execute(
                process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
                { action: "newsletter_subscription" },
              );
              resolve(token);
            } catch (error) {
              reject(error);
            }
          });
        } else {
          reject(new Error("reCAPTCHA Enterprise not available"));
        }
      });

      fetch("/api/mailchimp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          recaptchaToken,
        }),
      })
        .then(async (res) => {
          console.log("Response status:", res.status);
          console.log("Response ok:", res.ok);

          const responseData = await res.json();
          console.log("Response data:", responseData);

          if (!res.ok) {
            const errorData = responseData.error;

            // Check if the error is because the email is already subscribed
            const isAlreadySubscribed =
              (typeof errorData === "string" &&
                errorData.includes("already a list member")) ||
              (typeof errorData === "object" &&
                (errorData.detail?.includes("already a list member") ||
                  errorData.detail?.includes("already subscribed") ||
                  errorData.detail?.includes("Member Exists")));

            if (isAlreadySubscribed) {
              console.log(
                "Email already subscribed to newsletter:",
                data.email,
              );
              // Return success response instead of throwing error
              return { success: true, message: "Already subscribed" };
            } else {
              const errorMessage =
                typeof errorData === "string"
                  ? errorData
                  : errorData?.message || JSON.stringify(errorData);
              throw Object.assign(new Error(errorMessage), {
                userMessage: getErrorMessage(errorData),
              });
            }
          }

          return responseData;
        })
        .then((res) => {
          setSubmitting(false);
          setSuccess(true);
          reset();
        })
        .catch((error) => {
          setSubmitting(false);
          setError(error.userMessage ?? ERROR_MESSAGES.generic);
          console.error("Newsletter submission error:", error);
          console.error("Error message:", error.message);
          console.error("Full error object:", JSON.stringify(error, null, 2));
        });
    } catch (error) {
      setSubmitting(false);
      setError(ERROR_MESSAGES.recaptchaUnavailable);
      console.error("reCAPTCHA error:", error);
    }
  };

  return (
    <div className="w-full">
      <h4 className="text-sm mb-2">Join our newsletter</h4>
      {!error && !success && (
        <form
          className="form text-left"
          onSubmit={(e) => {
            console.log("Form submitted, calling handleSubmit");
            console.log("Current form errors:", errors);
            handleSubmit(onSubmit)(e);
          }}
        >
          <input
            type="text"
            autoComplete="none"
            className="hidden control--pot"
            aria-hidden="true"
            {...register("fullname")}
          />
          <div className="flex flex-col sm:flex-row border border-white/10 items-center rounded-lg overflow-hidden">
            <input
              type="text"
              inputMode="email"
              autoComplete="name"
              placeholder="Name"
              className="py-4 px-4 w-full border-b sm:border-b-0 sm:border-r border-white/10 bg-transparent focus:outline-none  placeholder:opacity-60 text-white placeholder:text-white"
              {...register("name")}
            />
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="Email"
              className="py-4 px-4 w-full  bg-transparent focus:outline-none  placeholder:opacity-60 text-white placeholder:text-white"
              {...register("email", {
                required: "This field is required.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address.",
                },
              })}
            />
            <button
              className="bg-text text-background h-[57px] w-full sm:w-[57px] flex items-center justify-center aspect-square"
              type="submit"
              disabled={submitting}
            >
              {submitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <ArrowRight />
              )}
            </button>
          </div>

          {errors?.email && (
            <span role="alert" className="text-sm text-red-500">
              {(errors.email as any)?.message || "Invalid email address"}
            </span>
          )}
        </form>
      )}
      {success && (
        <div key="success" className="form--success mt-5">
          <div className="form--success-content">
            <p>Thank you for subscribing</p>
          </div>
        </div>
      )}
      {error && (
        <div key="error" className="form--error mt-5">
          <div className="form--error-content">
            <p role="alert">{error}</p>
            <p className="form--error-reset">
              <button
                className="label px-4 py-2 rounded-full border border-primary/50 hover:border-primary/100 duration-500"
                onClick={(e) => resetForm(e)}
              >
                Try again
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
export default Newsletter;
