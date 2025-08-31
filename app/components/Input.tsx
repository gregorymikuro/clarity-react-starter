import type { ComponentProps } from "react";
import { cn } from "~/utils";

type InputProps = ComponentProps<"input"> & {
  label?: string;
  errorText?: string;
};

export default function Input({ label: givenLabel, errorText, className, ...props }: InputProps) {
  return (
    <div className="space-y-2">
      {givenLabel && (
        <label
          htmlFor={props.id}
          className={cn(
            "text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          )}
        >
          {givenLabel}
        </label>
      )}

      <input
        {...props}
        className={cn(
          "border-brand-4 bg-brand-1 ring-offset-brand-1 file:text-brand-2 placeholder:text-brand-2/70 focus-visible:ring-brand-12 flex h-10 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
      />
      {errorText && <p className="text-brand-6 text-sm">{errorText}</p>}
    </div>
  );
}
