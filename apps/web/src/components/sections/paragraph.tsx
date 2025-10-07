import { RichText } from "../richtext";
import { ParagraphProps } from "@/lib/sanity/queries/sections";
import { motion } from "motion/react";
import { sectionAnimationConfig } from "@/lib/motion";
import { SanityButtons } from "../sanity-buttons";
import { cn } from "@/lib/utils";
import { Fragment } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@workspace/packages/ui/src/components/form";
import { useForm } from "react-hook-form";
import { Input } from "@workspace/packages/ui/src/components/input";
import { ArrowRight, Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

function SignupForDownload({
  downloadableFile,
  recipients,
}: {
  downloadableFile: any;
  recipients: any;
}) {
  const pathname = usePathname();

  const getLastPathSegment = (path: string) => {
    if (!path) return "";
    const segments = path.split("/").filter(Boolean);
    return segments[segments.length - 1] || "";
  };

  const form = useForm({
    defaultValues: { email: "", page: getLastPathSegment(pathname) },
  });

  const { toast } = useToast();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: any, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      console.log("Recaptcha not ready");
      return;
    }

    try {
      // Submit to Mailchimp
      const mailchimpResponse = await fetch("/api/mailchimp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          name: "", // This form doesn't collect name
        }),
      });

      if (!mailchimpResponse.ok) {
        const errorData = await mailchimpResponse.json();

        // Check if the error is because the email is already subscribed
        const isAlreadySubscribed =
          errorData.error?.detail?.includes("already a list member") ||
          errorData.error?.detail?.includes("already subscribed") ||
          errorData.error?.detail?.includes("Member Exists");

        if (isAlreadySubscribed) {
          console.log("Email already subscribed to newsletter:", data.email);
          // Don't throw error, continue with success flow
        } else {
          throw new Error(
            errorData.error || "Failed to subscribe to newsletter",
          );
        }
      }

      // Also send to the original email system if recipients are provided
      if (recipients && recipients.length > 0) {
        const formDataToSend = new FormData();
        formDataToSend.append("email", data.email);

        const lastPathSegment = getLastPathSegment(pathname);
        formDataToSend.append("page", lastPathSegment);

        const recaptchaToken = await executeRecaptcha(
          lastPathSegment.replace("-", "_"),
        );
        formDataToSend.append("recaptchaToken", recaptchaToken);
        formDataToSend.append("recipients", JSON.stringify(recipients || []));

        const emailResponse = await fetch(`/api/email-submission`, {
          method: "POST",
          body: formDataToSend,
        });

        if (!emailResponse.ok) {
          console.warn(
            "Failed to send email notification, but newsletter subscription succeeded",
          );
        }
      }

      // Trigger file download after successful submission
      if (downloadableFile && downloadableFile.url) {
        const link = document.createElement("a");
        link.href = downloadableFile.url;
        link.download = "download";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      toast({
        title: "Success",
        description: "Successfully subscribed and downloaded!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
      });
    }
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="not-prose">
        <p className="text-xs font-medium">Get Information Brochure</p>
        <div className="flex w-full rounded-lg overflow-hidden border border-bottle-green/10 text-text">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-0 flex-1">
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter Email"
                    className="rounded-none bg-transparent placeholder:opacity-60 p-2 text-xs placeholder:text-xs h-[35px] placeholder:text-text text-text"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <button
            type="submit"
            className="bg-text text-background h-[35px] w-[35px] flex items-center justify-center aspect-square"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <ArrowRight />
            )}
          </button>
        </div>
      </form>
    </Form>
  );
}

export default function ParagraphSection({
  richText,
  topText,
  buttons,
  annotations,
  smallWrapper,
  largeSpacing,
  annotationDirection,
  downloadableFile,
  recipients,
}: ParagraphProps) {
  return (
    <motion.div
      {...sectionAnimationConfig}
      className={cn(
        "wrapper py-fluid-xs",
        smallWrapper && "wrapper--small",
        largeSpacing ? "space-y-fluid-xl" : "space-y-fluid-md",
      )}
    >
      <div
        className={cn(
          "flex md:flex-row w-full justify-between gap-fluid-sm prose",
          !(buttons && buttons.length === 1 && !annotations)
            ? "flex-col"
            : "flex-row",
        )}
      >
        {topText && (
          <RichText
            richText={topText}
            className={cn(
              "max-w-[770px]",
              !buttons && !annotations && "max-w-p-xl",
            )}
          />
        )}
        {buttons && !annotations && <SanityButtons buttons={buttons} />}
        {annotations && !buttons && (
          <div className="w-80 flex-none space-y-fluid-sm">
            <ul
              className={cn(
                "list-none not-prose text-xs",
                annotationDirection !== "horizontal"
                  ? "space-y-4"
                  : "space-y-1",
              )}
            >
              {annotations.map(({ top, bottom, _key }, index) => {
                return (
                  <Fragment key={_key}>
                    {annotationDirection === "horizontal" ? (
                      <li className="leading-none grid grid-cols-3 gap-2">
                        <span className="block text-body-copy">{top}</span>
                        <span className="block col-span-2 text-text">
                          {(typeof bottom === "string"
                            ? bottom.split(",")
                            : []
                          ).map((word, i) => (
                            <span key={i} className="block">
                              {word.trim()}
                            </span>
                          ))}
                        </span>
                      </li>
                    ) : (
                      <li className="leading-none">
                        <span className="block text-text">{top}</span>
                        <span className="block text-body-copy">{bottom}</span>
                      </li>
                    )}
                  </Fragment>
                );
              })}
            </ul>
            {downloadableFile && recipients && (
              <GoogleReCaptchaProvider
                reCaptchaKey={RECAPTCHA_SITE_KEY ?? "NOT DEFINED"}
              >
                <SignupForDownload
                  downloadableFile={downloadableFile}
                  recipients={recipients}
                />
              </GoogleReCaptchaProvider>
            )}
          </div>
        )}
      </div>
      {richText && <RichText richText={richText} className="max-w-[770px]" />}
    </motion.div>
  );
}
