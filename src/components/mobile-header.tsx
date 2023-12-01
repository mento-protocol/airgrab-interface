"use client";

import React from "react";

import { motion } from "framer-motion";

import {
   ChevronRight,
   DiscordIcon,
   GithubIcon,
   MentoLogo,
   MobileMenuHamburger,
   MobileMenuX,
   TwitterIcon,
} from "@/components/svgs";
import { links } from "@/lib/constants";
import Link from "next/link";

// import ThemeSwitch from "./ThemeSwitch";
import { PrimaryButton } from "@/components/button";
import MobileAccordianMenu from "@/components/mobile-accordian-menu";

const variants = {
   open: { opacity: 1, y: 0 },
   closed: { opacity: 0, y: "-100%" },
};

export const MobileHeader = () => {
   const [isOpen, setIsOpen] = React.useState(false);

   return (
      <header className="px-4 lg:hidden">
         <div className="flex items-center justify-between py-4 border-b border-b-primary-dark">
            <MentoLogo className="h-5 w-[90px]" />
            <button
               className="w-5 h-5 text-primary-dark"
               onClick={() => setIsOpen(true)}
            >
               <MobileMenuHamburger className="text-primary-dark dark:text-clean-white" />
            </button>
            <DropDownMenuOverlay isOpen={isOpen} setIsOpen={setIsOpen} />
         </div>
      </header>
   );
};

const DropDownMenuOverlay = ({
   isOpen,
   setIsOpen,
}: {
   isOpen: boolean;
   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
   return (
      <motion.div
         className="fixed top-0 left-0 z-50 flex flex-col w-full h-full p-4 bg-clean-white dark:bg-primary-dark"
         initial="closed"
         animate={isOpen ? "open" : "closed"}
         variants={variants}
         transition={{ duration: 0.8 }}
      >
         <div className="flex justify-between mb-12">
            <MentoLogo className="h-5 w-[90px]" />
            <button onClick={() => setIsOpen(false)}>
               <MobileMenuX className="w-5 h-5" />
            </button>
         </div>
         <MobileAccordianMenu />
         <div className="flex flex-col w-full justify-center items-center">
            <PrimaryButton
               icon={<ChevronRight />}
               href={links.app}
               fullWidth
               noFlexZone={true}
               width="w-[340px] sm:w-[260px] md:w-[260px]"
            >
               Open app
            </PrimaryButton>

            <div className="flex flex-col items-center ">
               <SocialLinks className="mt-[20%]" />
               <div className="grow"> </div>
               <div>
                  <span className="dark:text-body-dark text-[15px]">Theme</span>
                  {/* <ThemeSwitch /> */}
               </div>
            </div>
         </div>
      </motion.div>
   );
};

const SocialLinks = ({ className = "" }: { className?: string }) => {
   return (
      <nav className={`${className} flex mx-auto `}>
         <Link
            className="p-2.5"
            target="_blank"
            rel="noopener noreferrer"
            href={links.twitter}
         >
            <TwitterIcon />
         </Link>
         <Link
            className="p-2.5"
            target="_blank"
            rel="noopener noreferrer"
            href={links.github}
         >
            <GithubIcon />
         </Link>
         <Link
            className="p-2.5"
            target="_blank"
            rel="noopener noreferrer"
            href={links.discord}
         >
            <DiscordIcon />
         </Link>
      </nav>
   );
};
