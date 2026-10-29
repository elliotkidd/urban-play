const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const LOAD_TIMEOUT_MS = 10000;

type RecaptchaEnterprise = {
  ready: (callback: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

let loading: Promise<RecaptchaEnterprise> | null = null;

// reCAPTCHA Enterprise is ~350KB, so it's fetched when someone starts using a
// form instead of on every page load. Safe to call repeatedly.
export function loadRecaptcha(): Promise<RecaptchaEnterprise> {
  if (loading) return loading;

  loading = new Promise<RecaptchaEnterprise>((resolve, reject) => {
    if (!SITE_KEY) {
      reject(new Error("NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set"));
      return;
    }

    const timeout = setTimeout(
      () => reject(new Error("reCAPTCHA took too long to load")),
      LOAD_TIMEOUT_MS,
    );

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${SITE_KEY}`;
    script.async = true;
    script.onerror = () => {
      clearTimeout(timeout);
      reject(new Error("reCAPTCHA failed to load"));
    };
    script.onload = () => {
      const enterprise = (
        window as unknown as { grecaptcha?: { enterprise?: RecaptchaEnterprise } }
      ).grecaptcha?.enterprise;
      if (!enterprise) {
        clearTimeout(timeout);
        reject(new Error("reCAPTCHA Enterprise not available"));
        return;
      }
      enterprise.ready(() => {
        clearTimeout(timeout);
        resolve(enterprise);
      });
    };
    document.head.appendChild(script);
  }).catch((error) => {
    // Let the next attempt try again rather than reusing a failed load
    loading = null;
    throw error;
  });

  return loading;
}

export async function getRecaptchaToken(action: string) {
  const enterprise = await loadRecaptcha();
  return enterprise.execute(SITE_KEY!, { action });
}
