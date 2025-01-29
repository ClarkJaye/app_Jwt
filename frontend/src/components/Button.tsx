import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

const buttonStyles = cva(["transition-colors"], {
  variants: {
    variant: {
      default: ["bg-primary"],
      ghost: ["hover:bg-gray-100"],
    },
    size: {
      default: ["rounded", "p2-"],
      icon: [
        "rounded-full",
        "w-10",
        "h-10",
        "flex",
        "items-center",
        "justify-center",
        "p-2.5",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">;

export function Button({ variant, size, ...props }: ButtonProps) {
  return <button {...props} className={buttonStyles({ variant, size })} />;
}
