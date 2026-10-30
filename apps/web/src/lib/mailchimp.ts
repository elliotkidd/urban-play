import mailchimp from "@mailchimp/mailchimp_marketing";
import { createHash } from "crypto";

import { client } from "@/lib/sanity/client";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER,
});

type SubmittedField = { name: string; value: string };

type FormFieldConfig = {
  name: string;
  type: string;
  audienceId?: string;
};

// Read from Sanity rather than the request body so the audience can't be
// swapped by whoever submits the form.
const FORM_FIELDS_QUERY = `*[_type == "form" && id.current == $formId][0].fields[]{
  name,
  type,
  "audienceId": mailchimp.audienceId
}`;

/**
 * Adds an enquiry to the Mailchimp audience set on the form's opt-in field,
 * but only if the person ticked it.
 */
export async function subscribeOptedInEnquiry(
  formId: string,
  submitted: SubmittedField[],
) {
  const formFields = await client.fetch<FormFieldConfig[] | null>(
    FORM_FIELDS_QUERY,
    { formId },
    { stega: false },
  );
  const optIn = formFields?.find(
    (field) => field.type === "mailchimpOptIn" && field.audienceId,
  );
  if (!formFields || !optIn?.audienceId) return;

  const valueOf = (name?: string) =>
    submitted.find((field) => field.name === name)?.value?.trim();

  if (valueOf(optIn.name) !== "Yes") return;

  const email = valueOf(formFields.find((field) => field.type === "email")?.name);
  if (!email) {
    console.log("⚠️ Opted in but no email field found on form:", formId);
    return;
  }

  const firstName = valueOf(
    formFields.find((field) => /^first[_-]?name$/i.test(field.name))?.name,
  );
  const lastName = valueOf(
    formFields.find((field) => /^(last[_-]?name|surname)$/i.test(field.name))
      ?.name,
  );

  await upsertAudienceMember({
    audienceId: optIn.audienceId,
    email,
    firstName,
    lastName,
  });
}

async function upsertAudienceMember({
  audienceId,
  email,
  firstName,
  lastName,
}: {
  audienceId: string;
  email: string;
  firstName?: string;
  lastName?: string;
}) {
  if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_API_SERVER) {
    throw new Error("MAILCHIMP_API_KEY or MAILCHIMP_API_SERVER not configured");
  }

  const subscriberHash = createHash("md5")
    .update(email.toLowerCase())
    .digest("hex");

  const mergeFields: Record<string, string> = {};
  if (firstName) mergeFields.FNAME = firstName;
  if (lastName) mergeFields.LNAME = lastName;

  await mailchimp.lists.setListMember(
    audienceId,
    subscriberHash,
    {
      email_address: email,
      // Only applies to new contacts, so anyone who unsubscribed stays unsubscribed
      status_if_new: "subscribed",
      merge_fields: mergeFields,
    },
    // Audiences can require fields the form doesn't map (e.g. company, sector)
    { skipMergeValidation: true },
  );
}
