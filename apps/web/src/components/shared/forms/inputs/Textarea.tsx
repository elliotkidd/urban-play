import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  type?: string;
}

export function Textarea({ name, label, type = "text", ...rest }: Props) {
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
          rows={4}
          className="peer block w-full appearance-none rounded border border-contrast/10 bg-primary px-4 pb-2 pt-6 text-base text-contrast outline-none duration-500 focus:border-accent focus:outline-none focus:ring-0"
          placeholder=" "
          {...register(name)}
        />
        <label
          htmlFor={name}
          className="text-label absolute start-4 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-base text-contrast/70 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-contrast peer-focus:-translate-y-2 peer-focus:scale-75 peer-focus:text-contrast/70"
        >
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
