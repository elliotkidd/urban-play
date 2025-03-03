import { TypeFromSelection } from "groqd";
import React from "react";

import { Button } from "@/components/Button";
import { AsteriskIcon } from "@/components/Icon";
import { BUTTON_FRAGMENT } from "@/sanity/lib/queries/link";

import SanityLink from "./SanityLink";

interface Props {
  buttons: TypeFromSelection<typeof BUTTON_FRAGMENT>[];
  className?: string;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}

export default function ButtonGroup({
  buttons,
  className,
  onClick,
  size,
}: Props) {
  return (
    buttons && (
      <ul className={className}>
        {buttons.map((item, index) => {
          const { variant, text, width, link } = item;

          return (
            <li key={index}>
              <SanityLink link={link}>
                <Button
                  as="span"
                  variant={variant}
                  width={width}
                  size={size}
                  onClick={onClick}
                  prependIcon={<AsteriskIcon />}
                >
                  {text || undefined}
                </Button>
              </SanityLink>
            </li>
          );
        })}
      </ul>
    )
  );
}
