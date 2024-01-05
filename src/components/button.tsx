import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import cn from "classnames";

type BaseProps = {
  icon?: ReactNode;
  fullWidth?: boolean;
  className?: string;
  innerClassNames?: string;
  containerClassNames?: string;
  color?: "blush" | "blue";
  noFlexZone?: boolean;
  width?: string;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

type ColorProps = {
  color: "blush" | "blue";
};

const BaseButton = ({
  children,
  icon,
  color,
  fullWidth,
  innerClassNames,
  containerClassNames,
  noFlexZone,
  width,
  ...restProps
}: BaseProps & Partial<ColorProps>) => {
  const { href } = restProps;
  const isLink = Boolean(href);
  const Component: any = isLink ? "a" : "button";

  const isBlue = color === "blue";

  const containerClasses = [
    "group",
    "font-inter",
    "outline-offset-4",
    "cursor-pointer",
    "border-b",
    "rounded-lg",
    "border-primary-dark",
    "font-medium",
    "select-none",
    "inline-block",
    href ? "inline-block" : "",
    color === "blue" ? "bg-[#2A326A]" : "bg-[#845F84]",
    width ? width : "w-[298px] sm:w-[260px] md:w-[260px]",
  ].filter(Boolean);

  const innerClasses = [
    "text-center",
    "group-active:-translate-y-[2px]",
    "block",
    "py-[18px]",
    "group-hover:brightness-110",
    "group-active:brightness-90",
    "transition-transform",
    "delay-[250]",
    "hover:-translate-y-[6px]",
    "-translate-y-[4px]",
    "font-medium",
    "text-[15px]",
    "border",
    "rounded-lg",
    "border-primary-dark",
    "leading-5",
    isBlue
      ? "bg-[#4D62F0] text-clean-white"
      : "bg-primary-blush text-primary-dark",
    fullWidth ? "w-full flex items-center justify-center" : "",
  ].filter(Boolean);

  const contentClasses = [
    "flex",
    noFlexZone ? "" : "flex-col",
    "items-center",
    icon ? "gap-3" : "",
  ].filter(Boolean);

  return (
    <Component {...restProps}>
      <span className={cn(containerClasses.join(" "), containerClassNames)}>
        <span className={cn(innerClasses.join(" "), innerClassNames)}>
          <span className={contentClasses.join(" ")}>
            {children}
            {icon}
          </span>
        </span>
      </span>
    </Component>
  );
};

export const PrimaryButton = (props: BaseProps) => (
  <BaseButton {...props} color="blue" />
);
export const SecondaryButton = (props: BaseProps) => (
  <BaseButton {...props} color="blush" />
);
export const TertiaryButton = (props: BaseProps) => (
  <BaseButton {...props} color={props.color} />
);
