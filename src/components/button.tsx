import { ReactNode } from "react";
import cn from "classnames";
import { color } from "framer-motion";

type BaseProps = {
   children: ReactNode;
   icon?: ReactNode;
   target?: string;
   rel?: string;
   fullWidth?: boolean;
   className?: string;
   internal?: boolean;
   innerClassNames?: string;
   containerClassNames?: string;
   color?: "blush" | "blue";
   noFlexZone?: boolean;
   width?: string;
};

type ButtonActionProps =
   | { href?: string; onClick?: () => void }
   | { href?: undefined; onClick?: (() => void) | undefined };

type ButtonProps = BaseProps & ButtonActionProps;

type ColorProps = {
   color: "blush" | "blue";
};

const BaseButton = ({
   children,
   icon,
   href,
   target = "_blank",
   rel = "noopener noreferrer",
   color,
   fullWidth,
   internal,
   className,
   innerClassNames,
   containerClassNames,
   noFlexZone,
   width,
   ...restProps
}: ButtonProps & Partial<ColorProps>) => {
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
      isBlue ? "bg-[#2A326A]" : "bg-[#845F84]",
      width ? width : "w-[260px]",
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
      <Component
         href={href}
         target={isLink && !internal ? target : undefined}
         rel={isLink && !internal ? rel : undefined}
         {...restProps}
      >
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

export const PrimaryButton = (props: ButtonProps) => (
   <BaseButton {...props} color="blue" />
);
export const SecondaryButton = (props: ButtonProps) => (
   <BaseButton {...props} color="blush" />
);
export const TertiaryButton = (props: ButtonProps) => (
   <BaseButton {...props} color={props.color} />
);
