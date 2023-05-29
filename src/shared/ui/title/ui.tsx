import type { HTMLAttributes, PropsWithChildren } from 'react';
import { VariantProps, tv } from 'tailwind-variants';

const base = 'text-blue-900 font-bold';

const titleVariants = tv({
  base,
  variants: {
    size: {
      default: 'text-[35px] leading_9 sm:text[40px] sm:leading-10',
      sm: 'text-[18px] font-semibold',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface TitleProps extends PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>, VariantProps<typeof titleVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Title = ({ as = 'h1', children, size, className, ...props }: TitleProps) => {
  const Element = as;

  return (
    <Element className={titleVariants({ size, className })} {...props}>
      {children}
    </Element>
  );
};
