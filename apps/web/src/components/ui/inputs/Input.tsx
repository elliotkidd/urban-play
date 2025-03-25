import { ErrorMessage } from "@hookform/error-message";
import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface Props {
  name: string;
  label: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  className?: string;
}

export function Input({
  name,
  label,
  type = "text",
  className,
  ...props
}: Props & InputHTMLAttributes<HTMLInputElement>) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div className={twMerge("relative has-[:focus]:z-10")}>
        <input
          id={name}
          type={type}
          {...props}
          className={twMerge(
            "peer block w-full appearance-none rounded-lg p-4 bg-nav-bar-background/20 text-base text-white placeholder:text-white font-medium outline-none duration-500 focus:placeholder:text-white  focus:outline-none focus:ring-0",
            errors[name] && "border-red-600",
            className,
          )}
          placeholder={label}
          {...register(name)}
        />
        <label htmlFor={name} className="sr-only">
          {label}
        </label>
      </div>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <p className="px-6 py-3 text-sm text-red-600">{message}</p>
        )}
      />
    </>
  );
}
