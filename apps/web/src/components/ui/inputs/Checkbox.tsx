import { ErrorMessage } from '@hookform/error-message'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface Props {
  name: string
  label: string
  className?: string
}

export default function Checkbox({ name, label, className, ...rest }: Props) {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  const [checked, setChecked] = useState(false)

  return (
    <>
      <div className={twMerge('relative has-[:focus]:z-10', className)}>
        <label
          htmlFor={`${name}`}
          className={twMerge(
            'text-label flex cursor-pointer items-center rounded border border-contrast/10 bg-primary p-4 text-base text-contrast outline-none duration-500 focus-within:outline-none focus-within:ring-0',
            checked && 'border-accent'
          )}
        >
          <input
            {...register(name)}
            id={`${name}`}
            className={twMerge(
              'peer sr-only appearance-none',
              errors[name] && 'border-red-600'
            )}
            checked={checked}
            onChange={() => setChecked(!checked)}
            type='checkbox'
            {...rest}
          />
          {label}
        </label>
      </div>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <p className='px-6 py-3 text-sm text-red-600'>{message}</p>
        )}
      />
    </>
  )
}
