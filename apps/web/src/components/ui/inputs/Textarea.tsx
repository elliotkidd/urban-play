import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { TextareaHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
interface Props {
  name: string;
  label: string;
  type?: string;
  className?: string;
}

export function Textarea({
  name,
  label,
  type = "text",
  className,
  ...rest
}: Props & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div className="relative -mt-px has-[:focus]:z-10">
        <textarea
          {...rest}
          id={name}
          className={twMerge(
            "peer block w-full appearance-none text-white bg-nav-bar-background/20 placeholder:text-white rounded-lg p-4 text-base outline-none duration-500 focus:outline-none focus:ring-0",
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
