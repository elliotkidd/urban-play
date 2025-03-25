import { ContactProps } from "@/lib/sanity/queries/sections";
import Link from "next/link";
import { Input } from "../ui/inputs/Input";
import { Button } from "../ui/Button";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import { Textarea } from "../ui/inputs/Textarea";
import { useFormspark } from "@formspark/use-formspark";

const INPUT_CLASSES = [
  "focus:bg-theme-blue ",
  "focus:bg-theme-green ",
  "focus:bg-theme-yellow ",
  "focus:bg-theme-red ",
];

const FORM_SPARK_ID = process.env.NEXT_PUBLIC_FORM_SPARK_ID ?? "";

function Contact({ title, globalSettings }: ContactProps) {
  const { contactDetails, socialLinks } = globalSettings;
  const { instagram, facebook, twitter, linkedin, youtube } = socialLinks;
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

  // const methods = useForm({
  //   resolver: zodResolver(schema),
  // });

  const methods = useForm();
  const [submit, submitting] = useFormspark({
    formId: FORM_SPARK_ID,
  });

  const { formState, handleSubmit, reset } = methods;
  const { isSubmitting, isSubmitSuccessful, errors } = formState;

  // const handleSubmit = (data) => {
  //   console.log(data);
  //   methods.reset();
  // };

  useEffect(() => console.log(errors), [errors]);

  const onValid = async (data) => {
    console.log(data);
    const response = await submit(data);
    console.log(response);
    alert("Thank you!");
  };

  return (
    <FormProvider {...methods}>
      <div className="wrapper grid grid-cols-1 gap-4 lg:grid-cols-3 py-fluid-xs">
        <div className="prose">
          <h2 className="h2 mb-fluid-lg">{title}</h2>
          <div className="space-y-fluid-sm">
            {socialLinks && (
              <div className="not-prose leading-none space-y-1 text-xs">
                <h4 className="">Socials</h4>
                <ul className="space-y-1">
                  {socials.map(({ url, label }, index) => (
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
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="not-prose leading-none space-y-1 text-xs">
              <h4 className="">Address</h4>
              <p className="opacity-50 hover:opacity-100 transition-opacity duration-500">
                {formattedAddress}
              </p>
            </div>
            <div className="not-prose leading-none space-y-1 text-xs">
              <h4 className="">Phone</h4>
              <Link
                href={`tel:${phone}`}
                className="opacity-50 hover:opacity-100 transition-opacity duration-500"
              >
                {phone}
              </Link>
            </div>
          </div>
        </div>
        {isSubmitSuccessful ? (
          <div className="lg:col-span-2 prose">
            <h2 className="h2 mb-fluid-lg">Thank you!</h2>
            <p>We will get back to you as soon as possible.</p>
            <Button as="span" onClick={reset}>
              Back to form
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onValid)}
            className="lg:col-span-2 grid gap-4 not-prose"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                name="firstName"
                label="First Name"
                required
                className={INPUT_CLASSES[0]}
              />
              <Input
                name="lastName"
                label="Last Name"
                required
                className={INPUT_CLASSES[1]}
              />
              <Input
                name="email"
                label="Email"
                type="email"
                required
                className={INPUT_CLASSES[2]}
              />
              <Input
                name="phone"
                label="Phone"
                type="tel"
                required
                className={INPUT_CLASSES[3]}
              />
            </div>
            <Textarea
              name="message"
              label="Message"
              required
              rows={10}
              className={INPUT_CLASSES[0]}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        )}
      </div>
    </FormProvider>
  );
}
export default Contact;
