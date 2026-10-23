import { useId, type InputHTMLAttributes } from 'react'

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  hint?: string
}

export function Field({ label, hint, id, ...inputProps }: FieldProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 block text-[14px] leading-[18px] font-semibold">
        {label}
      </label>
      <input
        id={inputId}
        aria-describedby={hint ? `${inputId}-hint` : undefined}
        className="h-11 w-full rounded-xl border border-line-strong bg-white px-4 text-[14px] text-ink outline-none transition-shadow placeholder:text-muted/80 focus:border-ink focus:ring-2 focus:ring-ink/10"
        {...inputProps}
      />
      {hint && (
        <p id={`${inputId}-hint`} className="mt-1.5 text-[13px] leading-[18px] text-muted">
          {hint}
        </p>
      )}
    </div>
  )
}
