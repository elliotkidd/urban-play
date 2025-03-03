"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/Button";
import { IconCheck } from "@/components/Icon";

import Checkbox from "./inputs/Checkbox";
import { Input } from "./inputs/Input";
import Select from "./inputs/Select";
import { Textarea } from "./inputs/Textarea";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  emailAddress: z
    .string()
    .min(1, "Email address is required")
    .email("Invalid email address"),
  phone: z.string().optional(),
  businessName: z.string().optional(),
  howDidYouHearAboutUs: z
    .enum(["google", "linkedin", "friend", "other"])
    .optional(),
  uiUxDesign: z.boolean().optional(),
  branding: z.boolean().optional(),
  development: z.boolean().optional(),
  projectTimeline: z.string().optional(),
  projectDescription: z.string().min(1, "Project description is required"),
});

export default function ContactForm({ setSuccess, success }) {
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
      <form
        className="space-y-fluid-lg"
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <h3 className="text-label lg:col-span-2">
            Tell us a little about you
          </h3>
          <Input name="name" label="Name*" />
          <Input name="emailAddress" label="Email*" />
          <Input name="phone" label="Phone" type="tel" />
          <Input name="businessName" label="Business Name" />
          <Select
            name="howDidYouHearAboutUs"
            label="How did you hear about us?"
            className="lg:col-span-2"
          >
            <option value="google">Google</option>
            <option value="linkedin">LinkedIn</option>
            <option value="friend">Friend</option>
            <option value="other">Other</option>
          </Select>
        </div>
        <div className="grid gap-4">
          <h3 className="text-label">Tell us a little about your project</h3>
          <div className="grid grid-cols-3 gap-4">
            <Checkbox name="uiUxDesign" label="UI/UX Design" />
            <Checkbox name="branding" label="Branding" />
            <Checkbox name="development" label="Development" />
          </div>
          <Input name="projectTimeline" label="Project Timeline" />
          <Textarea name="projectDescription" label="Describe your project" />
          {success ? (
            <Button
              variant="accent"
              width="full"
              onClick={() => setSuccess(false)}
              appendIcon={<IconCheck />}
            >
              Form Submitted
            </Button>
          ) : (
            <Button variant="solid" width="full" type="submit">
              Submit
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
