import React from "react";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/Button";
import { AsteriskIcon, IconCheck } from "@/components/Icon";

export default function Submit({
  success,
  submitText = "Submit",
  submittedText = "Form Submitted",
}) {
  const { reset } = useFormContext();
  return (
    <div className="relative rounded">
      {success ? (
        <Button
          prependIcon={<AsteriskIcon />}
          as="span"
          variant="accent"
          appendIcon={<IconCheck />}
          onClick={reset}
          width="full"
          size="large"
        >
          {submittedText}
        </Button>
      ) : (
        <Button
          prependIcon={<AsteriskIcon />}
          size="large"
          variant="accent"
          width="full"
          type="submit"
        >
          {submitText}
        </Button>
      )}
    </div>
  );
}
