const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

// reCAPTCHA v3 returns success: true for any valid token, bots included.
// The score (0.0 = bot, 1.0 = human) is what separates them.
export const RECAPTCHA_MIN_SCORE =
  Number(process.env.RECAPTCHA_MIN_SCORE) || 0.5;

export function isLowRecaptchaScore(score?: number) {
  return typeof score === "number" && score < RECAPTCHA_MIN_SCORE;
}

export async function verifyRecaptcha(token: string) {
  try {
    const params = new URLSearchParams({
      secret: RECAPTCHA_SECRET_KEY!,
      response: token,
    });

    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        body: params,
      },
    );

    const data = await response.json();

    if (!data.success) {
      console.error(
        "reCAPTCHA Verification failed with error codes:",
        data["error-codes"],
      );
    }

    return data.success;
  } catch (error) {
    console.error(
      "reCAPTCHA Error:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return false;
  }
}
