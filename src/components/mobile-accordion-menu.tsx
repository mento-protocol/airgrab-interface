"use client";

import { Disclosure } from "@headlessui/react";
import { motion } from "framer-motion";
import Link from "next/link";

import { links } from "@/lib/constants";
import { ChevronDown } from "./svgs";

const mobileMenuAccordionMenuItems = [
  {
    name: "Developers",
    items: [
      { name: "Documentation", href: links.docs },
      { name: "Github", href: links.github },
    ],
  },
  {
    name: "Community",
    items: [
      { name: "Forum", href: links.forum },
      { name: "Discord", href: links.discord },
      { name: "Twitter", href: links.twitter },
    ],
  },
  {
    name: "Other",
    items: [{ name: "Team", href: links.mentolabs }],
  },
];

const MobileAccordionMenu = () => {
  return (
    <div className="flex flex-col mb-8 dark:bg-primary-dark">
      {mobileMenuAccordionMenuItems
        .filter(({ items }) => !!items)
        .map(({ name: headingName, items }) => {
          return (
            <Disclosure
              as="div"
              className=" pb-4 leading-[118%] border-b border-primary-dark dark:border-clean-white mt-4"
              key={headingName}
            >
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className={`${
                      open
                        ? "text-primary-blue dark:text-primary-blush pb-4"
                        : ""
                    }  font-medium text-left text-[17px] text-fg flex justify-between w-full`}
                  >
                    {headingName}

                    <motion.span
                      animate={{ rotate: open ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown />
                    </motion.span>
                  </Disclosure.Button>
                  <Disclosure.Panel className="flex flex-col justify-around gap-4">
                    {items?.map(({ name, href }) => (
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        className="active:text-primary-blue dark:active:text-primary-blush "
                        key={name}
                        href={href}
                      >
                        {name}
                      </Link>
                    ))}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          );
        })}
    </div>
  );
};

export default MobileAccordionMenu;
