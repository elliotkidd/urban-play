import { ContactProps } from "@/lib/sanity/queries/sections";
import Link from "next/link";
import { motion } from "motion/react";
import { sectionAnimationConfig } from "@/lib/motion";
import { Form } from "../Form";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

function Contact({ title, globalSettings, form }: ContactProps) {
  const { contactDetails, socialLinks } = globalSettings;
  const { instagram, facebook, twitter, linkedin, youtube } = socialLinks ?? {};
  const { phone, address } = contactDetails;
  const formattedAddress = address.split(",", 2).map((line, index) => (
    <span key={index} className="block">
      {line}
    </span>
  ));

  const socials = [
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
    <motion.div
      {...sectionAnimationConfig}
      className="wrapper grid grid-cols-1 gap-fluid lg:grid-cols-3 py-fluid-xs"
    >
      <div className="prose">
        <h2 className="h2 mb-fluid-sm">{title}</h2>
        <div className="space-y-fluid-sm">
          {socialLinks && (
            <div className="not-prose leading-none space-y-1 text-base">
              <p className="text-text">Socials</p>
              <ul className="space-y-1">
                {Array.isArray(socials) &&
                  socials.length > 0 &&
                  socials.map(({ url, label }, index) => (
                    <li
                      key={`social-link-${url}-${index.toString()}`}
                      className="text-text opacity-50 hover:opacity-100 transition-opactiy duration-500"
                    >
                      <Link
                        href={url ?? "#"}
                        target="_blank"
                        prefetch={false}
                        rel="noopener noreferrer"
                        aria-label={label}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          )}
          <div className="not-prose leading-none space-y-1 text-base">
            <p className="text-text">Address</p>
            <p className="">{formattedAddress}</p>
          </div>
          <div className="not-prose leading-none space-y-1 text-base">
            <p className="text-text">Phone</p>
            <Link
              href={`tel:${phone}`}
              className="text-text opacity-50 hover:opacity-100 transition-opactiy duration-500 block"
            >
              {phone}
            </Link>
          </div>
        </div>
      </div>
      <GoogleReCaptchaProvider
        reCaptchaKey={RECAPTCHA_SITE_KEY ?? "NOT DEFINED"}
      >
        <Form formData={form} className="lg:col-span-2" />
      </GoogleReCaptchaProvider>
    </motion.div>
  );
}
export default Contact;
