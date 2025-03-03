"use client";

import { useEffect } from "react";

interface Props {
  portalId: string;
  formId: string;
}

export default function HubSpotForm({ portalId, formId }: Props) {
  const id = Math.random().toString(36).substring(7);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/v2.js";
    document.body.appendChild(script);

    script.addEventListener("load", () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId,
          formId,
          target: `#hubspotForm-${id}`,
        });
      }
    });
  }, [portalId, formId, id]);

  return <div id={`hubspotForm-${id}`} className="hubspot-form w-full"></div>;
}
