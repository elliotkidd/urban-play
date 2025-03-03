"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "./inputs/Input";
import Submit from "./inputs/Submit";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  emailAddress: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
});

export default function NewsletterForm() {
  const [success, setSuccess] = useState(false);
  const methods = useForm({
    resolver: zodResolver(schema),
  });
  const handleSubmit = (data) => {
    console.log(data);
    setSuccess(true);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <Input name="name" label="Name*" />
        <Input name="emailAddress" label="Email*" />
        <Submit
          success={success}
          submitText="Get your freebie"
          submittedText="Check your email!"
        />
      </form>
    </FormProvider>
  );
}
