"use client";

import { Disclosure } from "@headlessui/react";
import { motion } from "framer-motion";
import { ChevronDown } from "./svgs";

const faqs = [
   {
      id: "eligibility-criteria",
      question: "What are my eligibility criteria?",
      answer:
         "This is just a dummy text that has been inserted as a placeholder for future content. While it may seem insignificant at first glance, the use of dummy text is a common practice in the design and publishing industry, as it allows designers and developers to visualize the layout and overall aesthetic of a project without being distracted by the actual content.",
   },
   {
      id: "verify",
      question: "Why do I need to verify?",
      answer:
         "This is just a dummy text that has been inserted as a placeholder for future content. While it may seem insignificant at first glance, the use of dummy text is a common practice in the design and publishing industry, as it allows designers and developers to visualize the layout and overall aesthetic of a project without being distracted by the actual content.",
   },
   {
      id: "lock-tokens",
      question: "Why do I need to lock tokens?",
      answer:
         "This is just a dummy text that has been inserted as a placeholder for future content. While it may seem insignificant at first glance, the use of dummy text is a common practice in the design and publishing industry, as it allows designers and developers to visualize the layout and overall aesthetic of a project without being distracted by the actual content.",
   },
   {
      id: "locking-period",
      question: "Can I change my locking period?",
      answer:
         "This is just a dummy text that has been inserted as a placeholder for future content. While it may seem insignificant at first glance, the use of dummy text is a common practice in the design and publishing industry, as it allows designers and developers to visualize the layout and overall aesthetic of a project without being distracted by the actual content.",
   },
];

export default function FAQ() {
   return (
      <div className="w-full">
         <h2 className="font-fg text-center font-medium text-xl  md:text-[56px] tracking-[-0.02em] leading-none mb-3 dark:text-clean-white">
            Frequently asked questions
         </h2>
         <AccordianMenu list={faqs} />
      </div>
   );
}

const AccordianMenu = ({
   list,
}: {
   list: { question: string; answer: string; id: string }[];
}) => {
   return (
      <div className="w-full flex flex-col mb-8 dark:bg-primary-dark">
         {list.map(({ question, answer, id }) => {
            return (
               <Disclosure
                  as="div"
                  className="leading-[118%] bg-clean-white rounded-md border border-primary-dark dark:border-clean-white mt-[18px] sm:mt-8 md:mt-8"
                  key={question}
               >
                  {({ open }) => (
                     <>
                        <Disclosure.Button
                           id={id}
                           className={`${
                              open ? "border-b" : ""
                           }  p-[1rem] pl-8 sm:p-[1.875rem] md:p-[1.875rem] sm:text-base md:text-base mt-2 font-medium text-left text-sm font-fg flex justify-between w-full`}
                        >
                           {question}

                           <motion.span
                              animate={{ rotate: open ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                           >
                              <ChevronDown />
                           </motion.span>
                        </Disclosure.Button>
                        <Disclosure.Panel className="flex flex-col leading-7 justify-around gap-4 px-8 pb-8 pt-6 font-fg text-sm">
                           {answer}
                        </Disclosure.Panel>
                     </>
                  )}
               </Disclosure>
            );
         })}
      </div>
   );
};
