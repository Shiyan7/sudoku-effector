import type { HTMLAttributes, PropsWithChildren } from "react";
import { VariantProps, tv } from "tailwind-variants";
import { tw } from "typewind";

const base = tw.text_blue_900.font_bold;

const titleVariants = tv({
  base,
  variants: {
    size: {
      default: tw.text_["35px"].sm(tw.text_["40px"].leading_10).leading_9,
      sm: tw.text_["18px"].font_semibold,
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface TitleProps
  extends PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>,
    VariantProps<typeof titleVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Title = ({
  as = "h1",
  children,
  size,
  className,
  ...props
}: TitleProps) => {
  const Element = as;

  return (
    <Element className={titleVariants({ size, className })} {...props}>
      {children}
    </Element>
  );
};
