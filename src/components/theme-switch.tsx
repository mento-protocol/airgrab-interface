"use client";
import { Switch } from "@headlessui/react";
// import { useTheme } from "next-themes";
import React from "react";
import { MoonSVG, SunSVG } from "./svgs";

const ThemeSwitch = ({ className }: { className?: string }) => {
  const [mounted, setMounted] = React.useState(false);

  //   const { theme, setTheme } = useTheme();
  const theme = "light";
  const setTheme = () => {};

  // React.useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    // setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Switch
      //   checked={!(theme === "dark")}
      checked={true}
      onChange={toggleTheme}
      className={`${className} dark:bg-primary-blush
           flex h-[24px]  cursor-pointer rounded-full transition-colors duration-250 ease-in-out focus:outline-none focus-visible:ring-2 w-[44px] focus-visible:ring-white focus-visible:ring-opacity-75 border-primary-dark dark:border-transparent border items-center justify-between`}
    >
      <SunSVG className="hidden w-3 h-3 ml-1 dark:inline" />
      <span
        aria-hidden="true"
        className={`${
          // theme === "dark"
          //   ? "translate-x-[calc(100% - 20px)]"
          //   :
          "translate-x-[0%]"
        }
         pointer-events-none inline-block h-[20px] mx-[2px] w-[20px] transform rounded-full bg-primary-dark shadow-lg ring-0 transition duration-250 ease-in-out my-auto`}
      />
      <MoonSVG className="inline w-3 h-3 mr-1 dark:hidden" />
    </Switch>
  );
};

export default ThemeSwitch;
