import React from "react";
import cn from "classnames";

export type ButtonColor = "blush" | "blue" | "white" | "disabled";
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
  disabled,
  ...restProps
}: ButtonProps) => {
  const isLink = isPropsForAnchorElement(restProps);
  const colorClasses = {
    blue: {
      accent: "bg-[#2A326A]",
      background: "bg-[#4D62F0]",
      text: "text-clean-white",
      border: "border-primary-dark",
    },
    blush: {
      accent: "bg-[#845F84]",
      background: "bg-primary-blush",
      text: "text-primary-dark",
      border: "border-primary-dark",
    },
    white: {
      accent: "bg-[#B3B3B3]",
      background: "bg-clean-white",
      text: "text-primary-dark",
      border: "border-primary-dark",
    },
    disabled: {
      accent: "bg-[#636366]",
      background: "bg-[#B3B3B3]",
      text: "text-[#636366]",
      border: "border-[#636366]",
    },
  };

  const containerClasses = [
    "group",
    "font-inter",
    "outline-offset-4",
    disabled ? "cursor-default" : "cursor-pointer",
    "border-b",
    "rounded-lg",
    disabled ? colorClasses.disabled.border : colorClasses[color].border,
    "font-medium",
    "select-none",
    "inline-block",
    "pb-[4px]",
    isLink ? "inline-block" : "",
    disabled ? colorClasses.disabled.accent : colorClasses[color].accent,
    width ? width : "w-[298px] sm:w-[260px] md:w-[260px]",
  ].filter(Boolean);

  const innerClasses = [
    "text-center",
    !disabled && "group-active:-translate-y-[2px]",
    "block",
    "py-[18px]",
    !disabled && "group-hover:brightness-110",
    "group-active:brightness-90",
    "transition-transform",
    "delay-[250]",
    !disabled && "hover:-translate-y-[2px]",
    "font-medium",
    "text-[15px]",
    "border",
    "rounded-lg",
    disabled ? colorClasses.disabled.border : colorClasses[color].border,
    "leading-5",
    disabled ? colorClasses.disabled.text : colorClasses[color].text,
    disabled
      ? colorClasses.disabled.background
      : colorClasses[color].background,
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
