import type { ButtonHTMLAttributes } from "react";
import { VariantProps, tv } from "tailwind-variants";
import { tw } from "typewind";

const base =
  tw.inline_block.h_["52px"].rounded_full.font_semibold.px_14.text_["18px"];

const buttonVariants = tv({
  base,
  variants: {
    variant: {
      primary: tw.bg_blue_100.text_white,
      white: tw,
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = ({
  className,
  variant,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button className={buttonVariants({ variant, className })} {...props}>
      {children}
    </button>
  );
};
