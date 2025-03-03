import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

import { IconSelectCarat } from "@/components/Icon";

interface Props {
  name: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}

export default function Select({ name, label, children, className }: Props) {
  const {
    register,
    formState: { errors },
    watch,
    setValue: setFormValue,
  } = useFormContext();

  const value = watch(name);

  return (
    <>
      <div className={twMerge("relative has-[:focus]:z-10", className)}>
        <select
          {...register(name)}
          id={name}
          value={value || ""}
          onChange={(e) => setFormValue(name, e.target.value)}
          className={twMerge(
            "peer block w-full appearance-none rounded border border-contrast/10 bg-primary px-4 pb-2 pt-6 text-base text-contrast outline-none duration-500 focus:border-accent focus:outline-none focus:ring-0",
            errors[name] && "border-red-600",
          )}
        >
          <option value=""></option>
          {children}
        </select>
        <label
          htmlFor={name}
          className={twMerge(
            "pointer-events-none absolute start-4 top-4 z-10 origin-[0] transform font-mono text-base duration-300",
            value
              ? "-translate-y-2 scale-75 text-contrast/70"
              : "translate-y-0 scale-100 text-contrast",
          )}
        >
          {label}
        </label>
        <IconSelectCarat className="pointer-events-none absolute right-4 top-1/2 z-10 -translate-y-1/2 text-contrast" />
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
