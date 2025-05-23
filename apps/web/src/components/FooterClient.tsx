"use client";

import { FooterType } from "@/lib/sanity/queries/documents";
import { getColorSchemeStyle } from "@/utils/utils";
import { useEffect } from "react";
import { useInView } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import FooterLogo from "./FooterLogo";
import { Input } from "@workspace/packages/ui/src/components/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@workspace/packages/ui/src/components/form";
import { useForm } from "react-hook-form";
import { ArrowRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
    <div className="lg:col-start-4">
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
    <div className="lg:col-start-6">
      <h4 className="text-sm mb-1">Follow</h4>
      <ul className="">
        {socialLinks.map(({ url, label }, index) => (
          <li
            key={`social-link-${url}-${index.toString()}`}
            className="opacity-50 hover:opacity-100 transition-opacity duration-500"
          >
            <Link
              href={url?.href ?? "#"}
              target={url?.openInNewTab ? "_blank" : "_self"}
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

function NewsletterSignup() {
  const form = useForm({
    defaultValues: {
      email: "",
    },
  });

  const { toast } = useToast();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    console.log("isSubmitting", isSubmitting);
  }, [isSubmitting]);

  const onSubmit = async (data: any) => {
    console.log("onSubmit");
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log(data);
        toast({
          title: "Thank you for subscribing!",
          description: "You will receive an email with the latest news",
        });
        resolve(true);
      }, 2000);
    });
  };

  return (
    <div className="lg:col-span-2">
      <h4 className="text-sm mb-fluid-sm">Join our newsletter</h4>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full rounded-lg overflow-hidden border border-white/10">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-0 flex-1">
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      label="Email"
                      placeholder="Email"
                      className="rounded-none bg-transparent placeholder:opacity-60"
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
  const { socialLinks, contactDetails } = settings;
  const year = new Date().getFullYear();
  const ref = useRef<HTMLElement>(null);

  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      const navbar = document.getElementById("navbar");
      if (navbar) {
        navbar.classList.add("opacity-0");
        navbar.classList.add("pointer-events-none");
      }
    } else {
      const navbar = document.getElementById("navbar");
      if (navbar) {
        navbar.classList.remove("opacity-0");
        navbar.classList.remove("pointer-events-none");
      }
    }
  }, [inView]);

  return (
    <footer
      ref={ref}
      className="h-[60dvh]"
      style={{
        clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0)",
        ...getColorSchemeStyle(colorScheme),
      }}
    >
      <div className="h-[60dvh] w-full bottom-0 fixed bg-background text-text">
        <div className="wrapper py-fluid-xs flex flex-col justify-between h-full">
          <div className="grid grid-cols-6 gap-fluid-sm">
            <FooterLogo />
            <ContactDetails data={contactDetails} />
            <SocialLinks data={socialLinks} />
          </div>
          <div className="grid grid-cols-6 gap-fluid-sm">
            <NewsletterSignup />
            <div className="lg:col-span-3 lg:col-start-4 prose">
              <p className="lead">{subtitle}</p>
            </div>
            <div className="flex lg:col-span-6 justify-between border-t pt-4 border-primary text-xs">
              <ul className="">
                <li>
                  <Link
                    href="/privacy"
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
              <p className="opacity-60">Site by Groundcrew</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
