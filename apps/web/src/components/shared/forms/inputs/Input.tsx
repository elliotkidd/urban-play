import { ErrorMessage } from "@hookform/error-message";
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
  ...rest
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <div className={twMerge("relative has-[:focus]:z-10 mb-3", className)}>
        <input
          id={name}
          type={type}
          {...rest}
          className={twMerge(
            "peer block w-full appearance-none rounded-full border border-accent bg-primary px-8 pb-2 pt-5 text-base text-contrast outline-none duration-500 focus:border-contrast focus:outline-none focus:ring-0",
            errors[name] && "border-red-600",
          )}
          placeholder=" "
          {...register(name)}
        />
        <label
          htmlFor={name}
          className="absolute start-8 top-3.5 z-10 origin-[0] -translate-y-2 scale-75 transform text-base text-contrast/70 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-contrast peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-contrast/70"
        >
          {" "}
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
