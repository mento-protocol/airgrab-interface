import { ReactNode } from "react";

export const TertiaryButton = ({
  children,
  href = "#",
  className,
  ...restProps
}: Omit<BaseButtonProps, "color"> & { className?: string }) => {
  return (
    <a
      href={href}
      target={href ?? "_blank"}
      rel={href ?? "noopener noreferrer"}
      {...restProps} // rest props before className so it cannot be overwritten
      className={`font-inter flex items-center justify-center border rounded-lg dark:hover:bg-[#0F0E17] bg-clean-white dark:bg-primary-dark dark:border-clean-white border-[#02010A] px-10 py-[18px] font-medium text-[15px] leading-5 ${className}`}
    >
      {children}
    </a>
  );
};

type BaseButtonProps = {
  children: ReactNode;
  icon?: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  color: "blush" | "blue";
  fullWidth?: boolean;
};

export const PrimaryButton = ({
  children,
  ...restProps
}: Omit<BaseButtonProps, "color">) => {
  return (
    <_3DButtonLink color="blue" {...restProps}>
      {children}
    </_3DButtonLink>
  );
};

export const SecondaryButton = ({
  children,
  ...restProps
}: Omit<BaseButtonProps, "color">) => {
  return (
    <_3DButtonLink {...restProps} color="blush">
      {children}
    </_3DButtonLink>
  );
};

const _3DButtonLink = ({
  children,
  color = "blue",
  href = "#",
  icon,
  fullWidth,
  ...restProps
}: BaseButtonProps) => {
  return (
    <a {...restProps} href={href}>
      <span
        className={`group font-inter outline-offset-4 cursor-pointer ${
          href ? "inline-block" : ""
        } ${color === "blue" ? "bg-[#2A326A]" : "bg-[#845F84]"} ${
          fullWidth ? "w-full md:w-auto" : ""
        } border-b rounded-lg border-primary-dark font-medium select-none inline-block`}
      >
        <span
          className={`${
            icon ? "pr-6" : "pr-10"
          } pl-10 group-active:-translate-y-[2px] block py-[18px] group-hover:brightness-110 group-active:brightness-90 transition-transform delay-[250] hover:-translate-y-[6px] -translate-y-[4px] font-medium text-[15px] border rounded-lg border-primary-dark leading-5 ${
            color === "blue"
              ? "bg-[#4D62F0] text-clean-white "
              : "bg-primary-blush text-primary-dark"
          } ${fullWidth ? "w-full flex items-center justify-center" : ""} `}
        >
          <span className={`flex items-center ${icon ? "gap-3" : ""}`}>
            {children}
            {icon ? icon : null}
          </span>
        </span>
      </span>
    </a>
  );
};
