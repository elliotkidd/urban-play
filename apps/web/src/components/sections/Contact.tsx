import { ContactProps } from "@/lib/sanity/queries/sections";
import Link from "next/link";
import { useFormspark } from "@formspark/use-formspark";
import { motion } from "motion/react";
import { sectionAnimationConfig } from "@/lib/motion";
import SanityForm from "../SanityForm";

const FORM_SPARK_ID = process.env.NEXT_PUBLIC_FORM_SPARK_ID ?? "";

function Contact({ title, globalSettings, form }: ContactProps) {
  const { contactDetails, socialLinks } = globalSettings;
  const { instagram, facebook, twitter, linkedin, youtube } = socialLinks ?? {};
  const { name, phone, address } = contactDetails;
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
            <div className="not-prose leading-none space-y-1 text-xs">
              <h4 className="text-text">Socials</h4>
              <ul className="space-y-1">
                {Array.isArray(socials) &&
                  socials.length > 0 &&
                  socials.map(({ url, label }, index) => (
                    <li
                      key={`social-link-${url}-${index.toString()}`}
                      className="hover:text-text transition-colors duration-500"
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
          <div className="not-prose leading-none space-y-1 text-xs">
            <h4 className="text-text">Address</h4>
            <p className="hover:text-text transition-colors duration-500">
              {formattedAddress}
            </p>
          </div>
          <div className="not-prose leading-none space-y-1 text-xs">
            <h4 className="text-text">Phone</h4>
            <Link
              href={`tel:${phone}`}
              className="hover:text-text transition-colors duration-500"
            >
              {phone}
            </Link>
          </div>
        </div>
      </div>
      <SanityForm className="col-span-2" form={form} />
    </motion.div>
  );
}
export default Contact;
