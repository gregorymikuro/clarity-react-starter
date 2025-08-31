import type { ComponentProps, ReactNode } from "react";
import { type VariantProps, tv } from "tailwind-variants";

export const buttonStyles = tv({
  base: "inline-flex w-full items-center justify-center  whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  variants: {
    color: {
      default:
        "bg-brand-2 text-brand-3 hover:bg-brand-2/90 ring-offset-brand-1 focus-visible:ring-brand-12",
    },
    size: {
      default: "gap-2 rounded-md px-4 py-2 text-sm font-medium h-10",
    },
  },
  defaultVariants: {
    color: "default",
    size: "default",
  },
});

export type ButtonVariants = VariantProps<typeof buttonStyles>;

export type ButtonProps = ComponentProps<"button"> & ButtonVariants & { children?: ReactNode };

export default function Button({ className, children, color, size, ...props }: ButtonProps) {
  return (
    <button {...props} className={buttonStyles({ className, color, size })}>
      {children}
    </button>
  );
}
