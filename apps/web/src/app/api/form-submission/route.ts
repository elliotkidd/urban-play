import { NextRequest, NextResponse } from "next/server";

import { sendEmail } from "@/lib/email";
import { processFormData } from "@/lib/processFormData";
import { isLowRecaptchaScore } from "@/lib/recaptcha";
import { subscribeOptedInEnquiry } from "@/lib/mailchimp";

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type");
    let formData: FormData | null = null;
    let body: any = null;
    let formId: string;
    let title: string;
    let fields: any[] = [];
    let attachments: any[] = [];
    let recaptchaToken: string | undefined;
    let responseEmail: {
      email?: string;
      subject?: string;
      body?: string;
    } | null = null;

    //console.log('📝 Processing form submission with content type:', contentType);

    if (contentType?.includes("multipart/form-data")) {
      formData = await request.formData();

      // Log all form data entries for debugging
      //console.log('📝 Form Data Entries:');
      for (const [key, value] of formData.entries()) {
        //console.log(
        //  `- ${key}:`,
        //  typeof value === 'string' ? value.substring(0, 100) : '[File or other type]'
        //);
      }

      formId = formData.get("formId") as string;
      title = formData.get("formTitle") as string;
      recaptchaToken = formData.get("recaptchaToken") as string;
      const responseEmailData = formData.get("responseEmail");
      const formDataJson = formData.get("form");

      console.log("📝 Form Data:", {
        formId,
        title,
        hasRecaptcha: !!recaptchaToken,
        responseEmailRaw: responseEmailData,
        formDataJson: formDataJson
          ? (formDataJson as string).substring(0, 100) + "..."
          : null,
      });

      try {
        if (responseEmailData) {
          responseEmail = JSON.parse(responseEmailData as string);
          console.log("📧 Parsed Response Email:", responseEmail);
        } else {
          console.log("❌ No response email data found in form submission");

          // Try to get response email from the full form data
          if (formDataJson) {
            const fullFormData = JSON.parse(formDataJson as string);
            if (fullFormData.responseEmail) {
              console.log(
                "📧 Found Response Email in form data:",
                fullFormData.responseEmail,
              );
              responseEmail = fullFormData.responseEmail;
            }
          }
        }
      } catch (e) {
        console.error("❌ Failed to parse form data:", e);
      }

      const processed = await processFormData(formData);
      fields = processed.fields;
      attachments = processed.attachments;
    } else {
      body = await request.json();
      formId = body.formId;
      title = body.formTitle;
      recaptchaToken = body.recaptchaToken;
      responseEmail = body.responseEmail;
      console.log("📧 Response Email from JSON body:", responseEmail);
      fields = body.formData.map(
        (field: { fieldName: string; value: string; label: string }) => ({
          name: field.fieldName,
          value: field.value,
          label: field.label,
        }),
      );
    }

    // Send notification email to form recipients
    const recipients = contentType?.includes("multipart/form-data")
      ? JSON.parse(formData!.get("recipients") as string)
      : body!.recipients;

    //console.log("📨 Notification Recipients:", recipients);

    // Honeypot: hidden field only bots fill in. Pretend it worked so they don't retry.
    const honeypot = formData ? formData.get("fullname") : body?.fullname;
    if (honeypot) {
      console.log("🍯 Honeypot filled, dropping submission");
      return NextResponse.json({ success: true });
    }

    // Verify reCAPTCHA if enabled
    if (process.env.RECAPTCHA_SECRET_KEY) {
      if (!recaptchaToken) {
        console.log("⚠️ reCAPTCHA token missing");
        return NextResponse.json(
          { success: false, error: "reCAPTCHA verification required" },
          { status: 400 },
        );
      }

      // Verify reCAPTCHA token
      console.log('Verifying reCAPTCHA token:', recaptchaToken)
      
      const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: recaptchaToken,
          remoteip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
        })
      })

      const recaptchaData = await recaptchaResponse.json()
      console.log('reCAPTCHA verification response:', recaptchaData)
      
      if (!recaptchaData.success) {
        console.log('reCAPTCHA verification failed:', recaptchaData)
        return NextResponse.json({ 
          error: 'reCAPTCHA verification failed', 
          details: recaptchaData['error-codes'] || 'Unknown error',
          recaptchaResponse: recaptchaData 
        }, { status: 400 })
      }

      if (isLowRecaptchaScore(recaptchaData.score)) {
        console.log('reCAPTCHA score too low:', recaptchaData.score)
        return NextResponse.json({
          error: 'reCAPTCHA verification failed',
          details: 'low-score',
        }, { status: 400 })
      }
      console.log('✅ reCAPTCHA verified');
    }

    if (recipients?.length > 0) {
      const validRecipients = recipients
        .filter((recipient: any) => recipient && recipient.email)
        .map((recipient: any) => ({
          email: recipient.email,
          name: recipient.name || undefined,
        }));

      //console.log('✉️ Valid Recipients:', validRecipients);

      if (validRecipients.length > 0) {
        try {
          //console.log('📤 Sending notification email to:', validRecipients);
          const notificationResult = await sendEmail({
            to: validRecipients,
            subject: `New Submission: ${title}`,
            formName: title,
            fields,
            html: fields
              .map(
                (field) =>
                  `<p><strong>${field.label}:</strong> ${field.value}</p>`,
              )
              .join("\n"),
            attachments,
          });
          //console.log('✅ Notification email sent:', notificationResult);
        } catch (emailError) {
          //console.error('❌ Notification email failed:', emailError);
        }
      }
    }

    // A Mailchimp failure shouldn't fail the enquiry, which has already been emailed
    try {
      await subscribeOptedInEnquiry(formId, fields);
    } catch (mailchimpError) {
      console.error("❌ Mailchimp opt-in failed:", mailchimpError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ Form submission error:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      { success: false, error: "Failed to submit form" },
      { status: 500 },
    );
  }
}
