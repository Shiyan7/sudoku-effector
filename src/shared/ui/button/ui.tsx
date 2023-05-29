import type { ButtonHTMLAttributes } from 'react';
import { VariantProps, tv } from 'tailwind-variants';

const base = 'inline-block h-[52px] rounded-full font-semibold px-14 text-[18px]';

const buttonVariants = tv({
  base,
  variants: {
    variant: {
      primary: 'bg-blue-100 text-white',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export const Button = ({ className, variant, children, ...props }: ButtonProps) => {
  return (
    <button className={buttonVariants({ variant, className })} {...props}>
      {children}
    </button>
  );
};
