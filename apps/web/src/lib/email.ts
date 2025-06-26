import nodemailer from "nodemailer";

interface EmailRecipient {
  email: string;
  name?: string;
}

interface FormField {
  label: string;
  value: string | number | boolean | null | undefined;
  type?: string;
  richText?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal" | "h2" | "h3" | "h4" | "h5" | "h6" | "inline";
    listItem?: "number" | "bullet";
    markDefs?: Array<{
      _key: string;
      href?: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
}

interface EmailAttachment {
  filename: string;
  fileblob: string;
  mimetype: string;
  cid?: string;
}

interface EmailOptions {
  to: EmailRecipient[];
  subject: string;
  html: string;
  text?: string;
  formName?: string;
  pageName?: string;
  fields?: FormField[];
  attachments?: EmailAttachment[];
}

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
  text,
  formName,
  pageName,
  fields = [],
  attachments = [],
}: EmailOptions) {
  console.log("📧 Sending email:", {
    to,
    subject,
    formName,
    hasFields: fields.length > 0,
    hasAttachments: attachments.length > 0,
  });

  if (!process.env.SMTP_USER) {
    throw new Error("SMTP_USER is not configured");
  }

  if (!process.env.SMTP_PASSWORD) {
    throw new Error("SMTP_PASSWORD is not configured");
  }

  if (!process.env.SMTP_HOST) {
    throw new Error("SMTP_HOST is not configured");
  }

  if (!Array.isArray(to) || to.length === 0) {
    throw new Error("No recipients specified");
  }

  // Process signature fields and create inline attachments
  const signatureAttachments = fields
    .filter(
      (field): field is FormField & { value: string } =>
        field.type === "signature" &&
        typeof field.value === "string" &&
        field.value.startsWith("data:image"),
    )
    .map((field, index) => {
      const base64Data = field.value.split(",")[1];
      if (!base64Data) return null;
      return {
        filename: `signature-${index + 1}.png`,
        path: `data:image/png;base64,${base64Data}`,
        cid: `signature-${index + 1}`,
      };
    })
    .filter(
      (attachment): attachment is NonNullable<typeof attachment> =>
        attachment !== null,
    );

  // Process file attachments
  const fileAttachments = attachments.map((attachment) => {
    if (attachment.fileblob.startsWith("data:")) {
      const parts = attachment.fileblob.split(",");
      if (parts.length === 2 && parts[0] && parts[1]) {
        const mimeMatch = parts[0].match(/^data:([^;]+)/);
        const mimeType = mimeMatch ? mimeMatch[1] : attachment.mimetype;
        return {
          filename: attachment.filename,
          path: `data:${mimeType};base64,${parts[1]}`,
        };
      }
    }
    return {
      filename: attachment.filename,
      path: `data:${attachment.mimetype};base64,${attachment.fileblob}`,
    };
  });

  let htmlContent = html;

  // Only use the table template if we have fields to display
  if (fields.length > 0) {
    // Create HTML table rows for fields
    const fieldRows = fields
      .filter((field) => !["form", "formTitle", "formId"].includes(field.label))
      .map((field) => {
        const value = String(field.value || "");
        const richTextContent = field.richText
          ? field.richText
              .map((block) => {
                if (block._type === "block") {
                  const text =
                    block.children
                      ?.map((child) => {
                        let text = child.text || "";
                        if (child.marks?.includes("strong"))
                          text = `<strong>${text}</strong>`;
                        if (child.marks?.includes("em"))
                          text = `<em>${text}</em>`;
                        if (child.marks?.includes("underline"))
                          text = `<u>${text}</u>`;
                        if (child.marks?.includes("code"))
                          text = `<code>${text}</code>`;
                        return text;
                      })
                      .join("") || "";

                  if (block.style === "h2") return `<h2>${text}</h2>`;
                  if (block.style === "h3") return `<h3>${text}</h3>`;
                  if (block.style === "h4") return `<h4>${text}</h4>`;
                  if (block.style === "h5") return `<h5>${text}</h5>`;
                  if (block.style === "h6") return `<h6>${text}</h6>`;
                  if (block.listItem === "bullet") return `<li>${text}</li>`;
                  if (block.listItem === "number") return `<li>${text}</li>`;
                  return `<p>${text}</p>`;
                }
                return "";
              })
              .join("")
          : "";

        if (field.richText) {
          return `
            <tr>
              <td colspan="2" class="rich-text-content">
                ${richTextContent}
              </td>
            </tr>
          `;
        }

        return `
          <tr>
            <td>${field.label}</td>
            <td>${value}</td>
          </tr>
        `;
      })
      .join("");

    // Create HTML email content with table
    htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .form-name { font-size: 24px; font-weight: 600; margin-bottom: 8px; }
            .page-name { color: #666; font-size: 16px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th { text-align: left; padding: 12px; background-color: #f8f9fa; border-bottom: 2px solid #dee2e6; }
            td { padding: 12px; border-bottom: 1px solid #dee2e6; }
            tr:last-child td { border-bottom: none; }
            .rich-text-header { background-color: #f8f9fa; font-size: 1.1em; }
            .rich-text-content { padding-top: 0; }
            .rich-text-content h2 { font-size: 1.5em; margin: 0.5em 0; }
            .rich-text-content h3 { font-size: 1.3em; margin: 0.5em 0; }
            .rich-text-content h4 { font-size: 1.2em; margin: 0.5em 0; }
            .rich-text-content h5 { font-size: 1.1em; margin: 0.5em 0; }
            .rich-text-content h6 { font-size: 1em; margin: 0.5em 0; }
            .rich-text-content p { margin: 0.5em 0; }
            .rich-text-content ul, .rich-text-content ol { margin: 0.5em 0; padding-left: 1.5em; }
            .rich-text-content li { margin: 0.25em 0; }
            .rich-text-content code { background-color: #f8f9fa; padding: 0.2em 0.4em; border-radius: 3px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="form-name">${formName}</div>
              ${pageName ? `<div class="page-name">${pageName}</div>` : ""}
            </div>
            <table>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                ${fieldRows}
              </tbody>
            </table>
          </div>
        </body>
      </html>
    `;
  } else {
    // If no fields, wrap the HTML content in our base template for consistent styling
    htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            ${html}
          </div>
        </body>
      </html>
    `;
  }

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: to.map((recipient) =>
      recipient.name
        ? `${recipient.name} <${recipient.email}>`
        : recipient.email,
    ),
    subject,
    html: htmlContent,
    text: text || "",
    attachments: [...signatureAttachments, ...fileAttachments],
  };

  console.log(mailOptions.from);

  console.log("📤 Sending email via SMTP:", {
    to: mailOptions.to,
    subject: mailOptions.subject,
    from: mailOptions.from,
  });

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("📬 Email sent:", {
      messageId: info.messageId,
      response: info.response,
    });
    return info;
  } catch (error) {
    console.error("❌ Email sending failed:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    throw error;
  }
}
