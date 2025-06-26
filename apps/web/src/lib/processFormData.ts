export async function processFormData(formData: FormData) {
  const fields: any[] = [];
  const attachments: any[] = [];

  // Fields to exclude from the notification email
  const excludedFields = [
    "formId",
    "recaptchaToken",
    "title",
    "recipients",
    "formTitle",
    "responseEmail",
    "form",
  ];

  // Get the form data to access field labels and rich text content
  const formDataJson = formData.get("form");
  const formFields = formDataJson
    ? JSON.parse(formDataJson as string).fields || []
    : [];

  for (const [key, value] of formData.entries()) {
    if (excludedFields.includes(key)) {
      continue;
    }

    // Find the field definition to get its label and rich text content
    const fieldDefinition = formFields.find((field: any) => field.name === key);
    const fieldLabel = fieldDefinition?.label || key;
    const richTextContent = fieldDefinition?.richText;

    if (value instanceof File && value.size > 0) {
      const buffer = await value.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      attachments.push({
        filename: value.name,
        fileblob: base64,
        mimetype: value.type || "application/octet-stream",
      });
      fields.push({
        name: key,
        value: `📎 ${value.name}`,
        label: fieldLabel,
        richText: richTextContent,
      });
      continue;
    }

    if (typeof value === "string" && value.startsWith("data:image")) {
      const base64Data = value.split(",")[1];
      if (base64Data) {
        attachments.push({
          filename: `${key}-signature.png`,
          fileblob: base64Data,
          mimetype: "image/png",
        });
        fields.push({
          name: key,
          value: "✍️ Signature added",
          label: fieldLabel,
          richText: richTextContent,
        });
        continue;
      }
    }

    fields.push({
      name: key,
      value: value as string,
      label: fieldLabel,
      richText: richTextContent,
    });
  }

  return { fields, attachments };
}
