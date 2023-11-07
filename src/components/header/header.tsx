import React from "react";
import { MobileHeader } from "../mobile-header";
import { MentoLogo } from "../svgs";
import HeaderNav from "./header-nav";
import { ConnectButton } from "../connect-button";
import { TertiaryButton } from "../button";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <DesktopHeader />
      <MobileHeader />
    </>
  );
};

const DesktopHeader = () => {
  return (
    <header className="items-center px-4 lg:px-10 xl:px-0 hidden h-16 pt-10 max-w-[1120px] mx-auto justify-between lg:flex">
      <Link href="/">
        <MentoLogo className="w-[108px] h-6" />
      </Link>
      <HeaderNav />
      <ConnectButton />
    </header>
  );
};

export default Header;
