import { twMerge } from "tailwind-merge";
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
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/Button";

const FORMSPARK_FORM_ID = process.env.NEXT_PUBLIC_FORM_SPARK_ID ?? "";

function SignupForDownload({ downloadableFile }: { downloadableFile: any }) {
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

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: any, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const lastPathSegment = getLastPathSegment(pathname);
    const dataWithPath = { ...data, page: lastPathSegment };

    try {
      await axios.post(
        `https://submit-form.com/${FORMSPARK_FORM_ID}`,
        dataWithPath,
      );

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
        description: "Email sent successfully",
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
                    label="Email"
                    placeholder="Enter Email"
                    className="rounded-none bg-transparent placeholder:opacity-60 p-2 text-xs placeholder:text-xs h-[35px]"
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
}: ParagraphProps) {
  return (
    <motion.div
      {...sectionAnimationConfig}
      className={twMerge(
        "wrapper py-fluid-xs",
        smallWrapper && "wrapper--small",
        largeSpacing ? "space-y-fluid-xl" : "space-y-fluid-md",
      )}
    >
      <div className="flex flex-col md:flex-row w-full justify-between gap-fluid-sm prose">
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
              className={twMerge(
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
                          {bottom.split(",").map((word, i) => {
                            return (
                              <span key={i} className="block">
                                {word.trim()}
                              </span>
                            );
                          })}
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
            {downloadableFile && (
              <SignupForDownload downloadableFile={downloadableFile} />
            )}
          </div>
        )}
      </div>
      {richText && <RichText richText={richText} className="max-w-[770px]" />}
    </motion.div>
  );
}
