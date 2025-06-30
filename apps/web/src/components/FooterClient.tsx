"use client";

import { FooterType } from "@/lib/sanity/queries/documents";
import { getColorSchemeStyle } from "@/utils/utils";
import Link from "next/link";
import FooterLogo from "./FooterLogo";
import { Input } from "@workspace/packages/ui/src/components/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@workspace/packages/ui/src/components/form";
import { useForm } from "react-hook-form";
import { ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

type SocialLinksProps = {
  data: any;
};

type ContactDetailsProps = {
  data: any;
};

function ContactDetails({ data }: ContactDetailsProps) {
  if (!data) return null;

  const { name, email, phone, address } = data;

  return (
    <div className="lg:col-start-7 lg:col-span-2">
      <h4 className="text-sm mb-1">Contact</h4>
      <Link
        href={`mailto:${email}`}
        className="block opacity-50 hover:opacity-100 transition-opacity duration-500"
      >
        {name}
      </Link>
      <Link
        href={`tel:${phone}`}
        className="block opacity-50 hover:opacity-100 transition-opacity duration-500"
      >
        {phone}
      </Link>
      <Link
        href={`https://maps.app.goo.gl/${address}`}
        className="block opacity-50 hover:opacity-100 transition-opacity"
      >
        {address}
      </Link>
    </div>
  );
}

function SocialLinks({ data }: SocialLinksProps) {
  if (!data) return null;

  const { facebook, twitter, instagram, youtube, linkedin } = data;

  const socialLinks = [
    {
      url: instagram,
      label: "Instagram",
    },
    { url: facebook, label: "Facebook" },
    { url: twitter, label: "Twitter" },
    { url: linkedin, label: "LinkedIn" },
    {
      url: youtube,
      label: "YouTube",
    },
  ].filter((link) => link.url);

  return (
    <div className="lg:col-start-9">
      <h4 className="text-sm mb-1">Follow</h4>
      <ul className="">
        {socialLinks.map(({ url, label }, index) => (
          <li
            key={`social-link-${url}-${index.toString()}`}
            className="opacity-50 hover:opacity-100 transition-opacity duration-500"
          >
            <Link
              href={url ?? "#"}
              target="_blank"
              prefetch={false}
              rel="noopener noreferrer"
              aria-label={label}
            >
              <span className="">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NewsletterSignup({
  recipients,
}: {
  recipients: { email: string; name: string }[];
}) {
  const form = useForm({
    defaultValues: {
      email: "",
    },
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

    const formDataToSend = new FormData();

    formDataToSend.append("email", data.email);

    const recaptchaToken = await executeRecaptcha("footer_Submission");
    formDataToSend.append("recaptchaToken", recaptchaToken);
    formDataToSend.append("recipients", JSON.stringify(recipients || []));

    try {
      const response = await fetch(`/api/email-submission`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        toast({
          title: "Error",
          description: "Failed to submit form",
        });
        return;
      } else {
        toast({
          title: "Success",
          description: "Email sent successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
      });
    }
    form.reset();
  };

  return (
    <div className="lg:col-span-3">
      <h4 className="text-sm mb-fluid-xs font-semibold">Join our newsletter</h4>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full rounded-lg overflow-hidden border border-white/10">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-0 flex-1">
                  <FormLabel htmlFor="email" className="sr-only">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Email"
                      className="rounded-none bg-transparent placeholder:opacity-60 text-white placeholder:text-white"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <button
              type="submit"
              className="bg-text text-background h-[57px] w-[57px] flex items-center justify-center aspect-square"
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
    </div>
  );
}

export function FooterSection({ data }: { data: FooterType }) {
  const { colorScheme, settings, subtitle } = data;
  const { socialLinks, contactDetails, recipients } = settings;

  return (
    <footer
      className="h-screen lg:h-[60dvh]"
      style={{
        clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0)",
        ...getColorSchemeStyle(colorScheme),
      }}
    >
      <div className="h-screen lg:h-[60dvh] w-full bottom-0 fixed bg-background text-text flex">
        <div className="wrapper py-fluid-xs flex flex-col justify-between flex-1 mt-fluid-lg lg:mt-0">
          <div className="grid lg:grid-cols-9 gap-fluid-sm">
            <div className="lg:col-span-2">
              <FooterLogo className="w-[190px] lg:w-[224px]" />
            </div>
            <ContactDetails data={contactDetails} />
            <SocialLinks data={socialLinks} />
          </div>
          <div className="grid lg:grid-cols-9 gap-fluid-sm">
            <NewsletterSignup recipients={recipients} />
            <div className="lg:col-span-3 lg:col-start-7 prose">
              <p className="lead">{subtitle}</p>
            </div>
            <div className="flex lg:col-span-9 justify-between border-t pt-4 border-white/20 text-xs">
              <ul className="">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="opacity-50 hover:opacity-100 transition-opacity duration-500"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="opacity-50 hover:opacity-100 transition-opacity duration-500"
                  >
                    Terms and Conditions
                  </Link>
                </li>
              </ul>
              <a
                className="opacity-60 hover:opacity-100 transition-opacity duration-500"
                href="https://groundcrew.com.au"
                target="_blank"
                rel="noopener noreferrer"
              >
                Site by Groundcrew
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
