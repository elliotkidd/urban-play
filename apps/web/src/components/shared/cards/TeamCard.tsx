"use client";

import React from "react";

import SanityImage from "../SanityImage";

export default function TeamCard({ person }) {
  const { _id, avatar, name, role, bio } = person;
  return (
    <li key={_id} className="grid grid-cols-3 gap-4">
      <div className="relative aspect-portrait overflow-hidden rounded">
        <SanityImage
          src={avatar}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="col-span-2">
        <h5 className="mb-2 text-lg">
          {name}, {role}
        </h5>
        <p className="opacity-70">{bio}</p>
      </div>
    </li>
  );
}
