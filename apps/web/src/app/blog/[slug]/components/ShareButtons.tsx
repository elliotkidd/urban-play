"use client";

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "next-share";

export function ShareButtons({ url }) {
  return (
    <div className="mt-0 lead flex flex-col gap-1 text-left items-start">
      <div className="hover:opacity-40 transition-opacity duration-300">
        <LinkedinShareButton url={url}>Linkedin</LinkedinShareButton>
      </div>

      <div className="hover:opacity-40 transition-opacity duration-300">
        <FacebookShareButton url={url}>Facebook</FacebookShareButton>
      </div>

      <div className="hover:opacity-40 transition-opacity duration-300">
        <TwitterShareButton url={url}>X</TwitterShareButton>
      </div>
    </div>
  );
}
