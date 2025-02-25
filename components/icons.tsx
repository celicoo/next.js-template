import type { ComponentProps, JSX, ReactElement, SVGProps } from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "~/libs/shadcn";

type IconVariantProps = VariantProps<typeof iconVariants>;

const iconVariants = cva(
  `
    fill-foreground
    transition-colors
  `,
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-6",
        lg: "size-8",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type SVGTitleElement = ReactElement<
  SVGProps<globalThis.SVGTitleElement>,
  "title"
>;

type BaseIconProps = IconVariantProps & {
  children: [SVGTitleElement, ...ReactElement[]];
} & Omit<ComponentProps<"svg">, "xmlns" | "children">;

function BaseIcon({
  size,
  className,
  children: [title, ...children],
  ...props
}: BaseIconProps): JSX.Element {
  return (
    <SVG
      {...(title.props.id !== undefined && {
        "aria-labelledby": title.props.id,
      })}
      className={cn(iconVariants({ size }), className)}
      {...props}
    >
      {/* For backward compatibility with SVG 1.1, <title> elements should be the first child element of their parent. */}
      {title}
      {children}
    </SVG>
  );
}

type IconProps = Omit<BaseIconProps, "children">;
