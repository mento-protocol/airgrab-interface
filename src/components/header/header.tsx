import React from "react";
import { MobileHeader } from "../mobile-header";
import { ChevronRight, MentoLogo } from "../svgs";
import HeaderNav from "./header-nav";

import Link from "next/link";
import { ConnectButton } from "@/components/connect-button";

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
      {/* <ConnectButton
        icon={<ChevronRight />}
        color="blush"
        noFlexZone={true}
        width="w-[206px]"
        innerClassNames="pl-10"
      /> */}
    </header>
  );
};

export default Header;
