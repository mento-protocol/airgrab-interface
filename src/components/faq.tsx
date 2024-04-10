"use client";

import { Disclosure } from "@headlessui/react";
import { motion } from "framer-motion";
import { ChevronDown } from "./svgs";
import Link from "next/link";
import { links } from "@/lib/constants";

export interface FAQ {
  id: string;
  question: string;
  answer: JSX.Element;
}

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

const AccordianMenu = ({ list }: { list: FAQ[] }) => {
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
                  }  p-[1rem] pl-8 sm:p-[1.875rem] md:p-[1.875rem] sm:text-base mt-2 font-medium text-left text-sm font-fg flex justify-between w-full`}
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

export const faqs: FAQ[] = [
  {
    id: "what-mento",
    question: "What is the Mento Protocol?",
    answer: (
      <span>
        <Link
          className="font-fg text-primary-blue underline text-sm"
          href="https://www.mento.org/"
          target="_blank"
        >
          Mento
        </Link>{" "}
        is an EVM-compatible protocol that enables creation of onchain digital
        assets. The goal of the Platform is to onboard a billion Web3 users.
      </span>
    ),
  },
  {
    id: "what-token",
    question: "What will the MENTO token do?",
    answer: (
      <span>
        The MENTO token is an ERC-20 token on the Celo Blockchain that will
        grant access to a tailored governance structure that specifically caters
        to the unique needs of the Mento Platform.
      </span>
    ),
  },
  {
    id: "what-airdrop",
    question: "What is an airdrop, and how will it be performed?",
    answer: (
      <>
        <span>
          An airdrop is the process of distributing MENTO governance tokens to
          the existing community members as a reward for their past
          contributions to the development and usage of Mento decentralized
          stable assets or the Celo ecosystem overall.
        </span>
        <span>
          Eligible Celo addresses can claim a combined max of 5% of the overall
          total supply. Users claiming the airdrop will receive it as veMENTO
          locked for 2 years (linearly unlocking without a cliff). The duration
          of an airdrop campaign is 2 months. After the airdrop period ends,
          unclaimed amounts will go to the Mento Community Fund.
        </span>
      </>
    ),
  },
  {
    id: "what-vemento",
    question: "What is veMENTO?",
    answer: (
      <>
        <span>
          veMENTO (vote-escrowed MENTO) is a locked version of the MENTO token
          that allows its holders to participate in the governance process of
          the Mento Protocol. The veModel is an on-chain governance framework
          pioneered by Curve Finance and adopted by multiple protocols in the
          space since then. Its main goal is to reward people who are committed
          to the protocol long term. This is achieved by giving more voting
          power to those who lock MENTO for longer periods of time.
        </span>
        <span>
          In the case of the Mento Protocol, it is possible to lock MENTO for a
          period of one week up to two years.
        </span>
      </>
    ),
  },
  {
    id: "eligibility-criteria",
    question: "What are the airdrop eligibility criteria?",
    answer: (
      <>
        To be eligible, an address must fulfil at least one of the following
        criteria:
        <ul className="list-disc">
          <li className="ml-6 mb-5">
            Staked at least $10 (US dollars) worth of CELO (amount based on avg.
            over 16 monthly snapshots, taken between November 15th, 2022, and
            February 15th, 2024);
          </li>
          <li className="ml-6 mb-5">
            Held more than $10 (US dollars) worth of any of Mento&apos;s
            decentralized stable assets (amount based on avg. over 16 monthly
            snapshots, taken between November 15th, 2022, and February 15th,
            2024);
          </li>
          <li className="ml-6">
            Transacted in any of Mento’s decentralized stable assets with a
            volume greater than $100 (US dollars) (volume calculated as the
            cumulative sum over the 16 monthly snapshots between November 15th,
            2022, and February 15th, 2024).
          </li>
        </ul>
        <span>
          Community members are encouraged to check the logic and exact formulas
          with parameters used in airdrop calculations in{" "}
          <Link
            className="font-fg text-primary-blue underline text-sm"
            href="https://colab.research.google.com/drive/17sGsXPjZDjTOlajpemzDTG40_3igetdd?usp=sharing"
            target="_blank"
          >
            this Google Collab notebook
          </Link>
          .
        </span>
        <span>
          The community can take a look at the raw CSV file with eligible
          addresses and their allocations in{" "}
          <Link
            className="font-fg text-primary-blue underline text-sm"
            href="https://github.com/mento-protocol/airdrop-snapshot"
            target="_blank"
          >
            this Github repository
          </Link>
          .
        </span>
      </>
    ),
  },
  {
    id: "why-verify-identity",
    question: "Why do I need to verify my identity?",
    answer: (
      <>
        <span>
          To comply with local regulations in various jurisdictions, there is a
          need to make sure that owners of eligible addresses are not on the AML
          sanctions list and are not residents of one of the restricted
          jurisdictions. We have partnered with Fractal ID to ensure that
          claimers fulfil these conditions. Claimers will be asked to upload
          their verification documents directly to Fractal ID.
        </span>
        <span>
          The uploaded data will be deleted after validation and submission of
          on-chain proof that the user is on or off the restriction list.{" "}
          <b className="font-medium">
            Neither Mento Community members, nor Mento Labs will have access to
            the personal data uploaded to Fractal ID by users.
          </b>
        </span>
        <span>
          A detailed overview of restricted jurisdictions is available in the
          Airdrop article of the Mento documentation
        </span>
      </>
    ),
  },
  {
    id: "token-distribution",
    question: "What is the proposed initial token distribution?",
    answer: (
      <>
        <span>
          The detailed overview of intial token distribution can be found in the
          MENTO token article of the Mento documentation.
        </span>
      </>
    ),
  },
  {
    id: "how-many-tokens",
    question: "How many Mento Tokens will exist?",
    answer: (
      <>
        <span>
          The total possible supply of the token will be 1,000,000,000 (one
          billion) MENTO, with 65% being minted at the genesis block (see
          distribution above), and the rest is emitted to the Mento Community
          Treasury via exponential decay with a half-life of 10 years.
        </span>
      </>
    ),
  },
  {
    id: "token-info",
    question: "Where can I find more information about MENTO token?",
    answer: (
      <>
        <span>
          The governance section of the Mento documentation provides a
          comprehensive overview of the governance setup, MENTO token
          functionality and initial allocation.
        </span>
      </>
    ),
  },
  {
    id: "mento-info",
    question: "Where can I find more information about Mento?",
    answer: (
      <>
        <span>
          Website:{" "}
          <Link
            className="font-fg text-primary-blue underline text-sm"
            href={links.mento}
            target="_blank"
          >
            mento.org
          </Link>
        </span>
        <span>
          Discord:{" "}
          <Link
            className="font-fg text-primary-blue underline text-sm"
            href={links.discord}
            target="_blank"
          >
            Mento Discord
          </Link>
        </span>
        <span>
          Documentation:{" "}
          <Link
            className="font-fg text-primary-blue underline text-sm"
            href={links.docs}
            target="_blank"
          >
            docs.mento.org
          </Link>
        </span>
        <span>
          Blog:{" "}
          <Link
            className="font-fg text-primary-blue underline text-sm"
            href={links.mirror}
            target="_blank"
          >
            mirror.xyz/mentoprotocol.eth
          </Link>
        </span>
        <span>
          X:{" "}
          <Link
            className="font-fg text-primary-blue underline text-sm"
            href={links.twitter}
            target="_blank"
          >
            twitter.com/MentoLabs
          </Link>
        </span>
      </>
    ),
  },
];
