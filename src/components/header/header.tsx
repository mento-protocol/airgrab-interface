import React from "react";
import { MobileHeader } from "../mobile-header";
import { ChevronRight, MentoLogo } from "../svgs";
import HeaderNav from "./header-nav";
import { ConnectButton } from "../connect-button";

import Link from "next/link";
import { Web3Provider } from "../web3-provider";

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
         <Web3Provider>
            <ConnectButton containerClassNames="w-[206px]" color="blush" />
         </Web3Provider>
      </header>
   );
};

export default Header;
