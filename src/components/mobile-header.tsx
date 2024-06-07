"use client";

import React from "react";

import { motion } from "framer-motion";

import {
  Clipboard,
  DiscordIcon,
  GithubIcon,
  MentoLogo,
  MobileMenuHamburger,
  MobileMenuX,
  TwitterIcon,
} from "@/components/svgs";
import { links } from "@/lib/constants";
import Link from "next/link";

import MobileAccordionMenu from "@/components/mobile-accordion-menu";
import { DisconnectButton } from "@/components/disconnect-button";
import { useAccount } from "wagmi";
import ClientOnly from "./client-only";
import { ConnectButton } from "./connect-button";
import { shortenAddress } from "@/lib/addresses";
import { Identicon } from "./identicon";
import { toast } from "sonner";
import { tryClipboardSet } from "@/lib/clipboard";
import Spacer from "./spacer";
import { Button } from "./button";

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
  const { isConnected } = useAccount();

  return (
    <ClientOnly>
      <motion.div
        className="fixed top-0 left-0 z-50 flex flex-col w-full h-full p-4 bg-clean-white dark:bg-primary-dark"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-between">
          <MentoLogo className="h-5 w-[90px]" />
          <button onClick={() => setIsOpen(false)}>
            <MobileMenuX className="w-5 h-5" />
          </button>
        </div>
        {isConnected ? (
          <>
            <Spacer className="h-[43px]" />
            <div className="flex items-center justify-between mx-auto">
              <CopyableWalletAddress />
            </div>
            <Spacer className="h-[43px]" />{" "}
          </>
        ) : (
          <Spacer className="h-[48px]" />
        )}
        <MobileAccordionMenu />
        <div className="flex flex-col w-full justify-center items-center gap-8">
          <div className="flex flex-col w-full justify-center items-center gap-[18px]">
            <ConnectionButtons isConnected={isConnected} />
            <Button color="blush" href="/">
              Homepage
            </Button>
          </div>
          <div className="flex flex-col items-center">
            <SocialLinks />
          </div>
        </div>
      </motion.div>
    </ClientOnly>
  );
};

const ConnectionButtons = ({ isConnected }: { isConnected: boolean }) => {
  return isConnected ? (
    <DisconnectButton color="white">Disconnect Wallet</DisconnectButton>
  ) : (
    <ConnectButton color="blue" />
  );
};
<Button color="blush" href="/">
  Homepage
</Button>;

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

const CopyableWalletAddress = () => {
  const { address } = useAccount();

  if (!address) return null;

  const onClickCopy = async () => {
    if (!address) return;
    await tryClipboardSet(address);
    toast.success("Address copied to clipboard", {
      unstyled: true,
      duration: 2000,
      classNames: {
        toast:
          "border font-fg border-primary-dark flex items-center justify-center bg-white text-black rounded-lg shadow-md transition-all duration-300 py-[16px] px-[20px] gap-4",
      },
    });
  };

  return (
    <div
      className="flex items-center justify-center cursor-pointer gap-4"
      onClick={onClickCopy}
    >
      <div className="flex gap-2 justify-center">
        <Identicon address={address} size={26} />
        <span className=""> {shortenAddress(address)}</span>
      </div>
      <Clipboard color="#636768" />
    </div>
  );
};
