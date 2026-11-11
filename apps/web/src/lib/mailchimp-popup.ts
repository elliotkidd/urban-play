declare global {
  interface Window {
    _mcfq?: unknown[] & { tick?: () => void };
    mailchimpFormsSettings?: { configURL?: string };
  }
}

type MailchimpFormsConfig = {
  experiences?: {
    id: number;
    variations?: { id: number; status: string; isEmbedded: boolean }[];
  }[];
};

// Opens whichever pop-up form is live in Mailchimp, so swapping the form there
// needs no change here. Mailchimp's forms script is loaded by the mcjs
// connected-site script in the root layout. Its "trigger-campaign" command
// isn't documented (it's what Mailchimp's own integrations use), so this
// returns false when there's nothing to open and the caller can fall back.
export async function openMailchimpPopup() {
  const configURL = window.mailchimpFormsSettings?.configURL;
  if (!configURL) return false;

  try {
    const config: MailchimpFormsConfig = await (await fetch(configURL)).json();

    for (const experience of config.experiences ?? []) {
      const variation = experience.variations?.find(
        ({ status, isEmbedded }) => status === "live" && !isEmbedded,
      );
      if (!variation) continue;

      window._mcfq = window._mcfq || [];
      window._mcfq.push({
        command: "trigger-campaign",
        experienceId: experience.id,
        variationId: variation.id,
      });
      // The queue is otherwise only read once a second
      window._mcfq.tick?.();
      return true;
    }
  } catch (error) {
    console.error("Couldn't open the Mailchimp pop-up form", error);
  }

  return false;
}
