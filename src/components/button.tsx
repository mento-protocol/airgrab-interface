import React from "react";
import cn from "classnames";

export type ButtonColor = "blush" | "blue" | "white";
type HTMLButtonProps = React.ComponentPropsWithRef<"button">;
type HTMLAnchorProps = React.ComponentPropsWithRef<"a">;

type ButtonProps = {
  icon?: React.ReactNode;
  fullWidth?: boolean;
  innerClassNames?: string;
  containerClassNames?: string;
  color: ButtonColor;
  noFlexZone?: boolean;
  width?: string;
} & HTMLButtonProps &
  HTMLAnchorProps;

export const Button = ({
  children,
  icon,
  color,
  fullWidth,
  innerClassNames,
  containerClassNames,
  noFlexZone,
  width,
  ...restProps
}: ButtonProps) => {
  const isLink = isPropsForAnchorElement(restProps);

  const colorClasses = {
    blue: {
      accent: "bg-[#2A326A]",
      background: "bg-[#4D62F0]",
      text: "text-clean-white",
    },
    blush: {
      accent: "bg-[#845F84]",
      background: "bg-primary-blush",
      text: "text-primary-dark",
    },
    white: {
      accent: "bg-[#B3B3B3]",
      background: "bg-clean-white",
      text: "text-primary-dark",
    },
  };

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
    isLink ? "inline-block" : "",
    colorClasses[color].accent,
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
    colorClasses[color].text,
    colorClasses[color].background,
    fullWidth ? "w-full flex items-center justify-center" : "",
  ].filter(Boolean);

  const contentClasses = [
    "flex",
    noFlexZone ? "" : "flex-col",
    "items-center",
    icon ? "gap-3" : "",
  ].filter(Boolean);

  return (
    <ButtonOrLink {...restProps}>
      <span className={cn(containerClasses.join(" "), containerClassNames)}>
        <span className={cn(innerClasses.join(" "), innerClassNames)}>
          <span className={contentClasses.join(" ")}>
            {children}
            {icon}
          </span>
        </span>
      </span>
    </ButtonOrLink>
  );
};

const ButtonOrLink: React.FC<
  React.PropsWithChildren<HTMLButtonProps | HTMLAnchorProps>
> = ({ children, ...props }) => {
  if (isPropsForAnchorElement(props)) {
    return <a {...(props as HTMLAnchorProps)}>{children}</a>;
  } else {
    return <button {...(props as HTMLButtonProps)}>{children}</button>;
  }
};

function isPropsForAnchorElement(
  props: HTMLButtonProps | HTMLAnchorProps,
): props is HTMLAnchorProps {
  return "href" in props;
}
