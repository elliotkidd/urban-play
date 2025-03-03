import { TypeFromSelection } from "groqd";
import React from "react";

import { SOCIALS_FRAGMENT } from "@/sanity/lib/queries/fragments";

import {
  SocialIconDiscord,
  SocialIconGithub,
  SocialIconLinkedIn,
  SocialIconTelegram,
  SocialIconX,
} from "../SocialIcon";

type Socials = TypeFromSelection<typeof SOCIALS_FRAGMENT>;

interface Props {
  socialIcons: Socials;
}

export default function SocialIconLinks({ socialIcons }: Props) {
  return (
    <ul className="flex items-center gap-4">
      {socialIcons.xUrl && (
        <li>
          <a
            href={socialIcons.xUrl}
            target="_blank"
            rel="noreferrer"
            className="duration-500 hover:text-accent"
          >
            <SocialIconX />
          </a>
        </li>
      )}
      {socialIcons.instagramUrl && (
        <li>
          <a
            href={socialIcons.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="duration-500 hover:text-accent"
          >
            <SocialIconTelegram />
          </a>
        </li>
      )}
      {socialIcons.linkedInUrl && (
        <li>
          <a
            href={socialIcons.linkedInUrl}
            target="_blank"
            rel="noreferrer"
            className="duration-500 hover:text-accent"
          >
            <SocialIconLinkedIn />
          </a>
        </li>
      )}
      {socialIcons.githubUrl && (
        <li>
          <a
            href={socialIcons.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="duration-500 hover:text-accent"
          >
            <SocialIconGithub />
          </a>
        </li>
      )}
    </ul>
  );
}
