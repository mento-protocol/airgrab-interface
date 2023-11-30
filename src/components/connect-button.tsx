"use client";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { toast } from "react-toastify";
import { Identicon } from "@/components/identicon";
import {
   Clipboard,
   LogoutDark,
   ClipboardDark,
   Logout,
} from "@/components/svgs";
import { shortenAddress } from "@/lib/addresses";
import { tryClipboardSet } from "@/lib/clipboard";
import { useAccount, useDisconnect } from "wagmi";
import { TertiaryButton } from "./button";
import React, { ReactNode } from "react";
import { DropdownModal } from "./dropdown";

export function ConnectButton({
   containerClassNames,
   color,
   icon,
}: {
   containerClassNames?: string;
   color?: "blush" | "blue";
   icon?: ReactNode;
}) {
   const { address } = useAccount();
   const { openConnectModal } = useConnectModal();
   const { disconnect } = useDisconnect();

   const onClickCopy = async () => {
      if (!address) return;
      await tryClipboardSet(address);
      toast.success("Address copied to clipboard", { autoClose: 1200 });
   };

   const onClickDisconnect = () => {
      disconnect();
   };

   return (
      <div className="relative flex justify-end mb-1 min-h-6">
         {address ? (
            <DropdownModal
               placement="bottom-end"
               buttonContent={() => (
                  <div className="flex items-center">
                     <Identicon address={address ?? ""} size={26} />
                     <div className="hidden sm:block ml-[12px]">
                        {address ? shortenAddress(address) : "Loading..."}
                     </div>
                  </div>
               )}
               buttonClasses={
                  styles.walletButtonConnected +
                  " " +
                  styles.walletButtonDefault
               }
               modalContent={() => (
                  <div className="py-5 font-medium leading-5">
                     <div className={styles.menuOption} onClick={onClickCopy}>
                        <ConnectButtonIcon
                           icon={<Clipboard />}
                           iconDark={<ClipboardDark />}
                           styles="sm:mr-3"
                        />
                        <div className="transition-colors duration-200 hover:text-gray-500 active:text-gray-200">
                           Copy Address
                        </div>
                     </div>
                     <hr className="mx-5 mt-4 dark:border-[#333336]" />
                     <div
                        className={styles.menuOption}
                        onClick={onClickDisconnect}
                     >
                        <ConnectButtonIcon
                           icon={<Logout />}
                           iconDark={<LogoutDark />}
                           styles="sm:mr-1.5"
                        />
                        <div className="transition-colors duration-200 dark:text-primary-blush hover:text-gray-500 active:text-gray-200">
                           Disconnect
                        </div>
                     </div>
                  </div>
               )}
               modalClasses="right-px min-w-[272px] border border-solid border-black dark:border-[#333336] text-sm !rounded-[16px] !shadow-lg2 dark:bg-[#1D1D20]/[1]"
            />
         ) : (
            <TertiaryButton
               onClick={openConnectModal}
               containerClassNames={containerClassNames}
               color={color}
               icon={icon}
            >
               Connect Wallet
            </TertiaryButton>
         )}
      </div>
   );
}

const ConnectButtonIcon = ({
   icon,
   iconDark,
   width = 32,
   height = 32,
   styles,
}: {
   icon: ReactNode;
   iconDark: ReactNode;
   width?: number;
   height?: number;
   styles?: string;
}) => {
   return (
      <div className={`flex items-center ${styles}`}>
         <div className="inline dark:hidden">{icon}</div>
         <div className="hidden dark:inline">{iconDark}</div>
      </div>
   );
};

const styles = {
   // TODO DRY up with SolidButton styles
   walletButtonDefault:
      "shadow-md h-[52px] min-w-[137px] py-[16px] !pl-[20px] !pr-[24px] sm:px-4 rounded-lg border border-solid border-black dark:border-white font-medium leading-5 dark:text-white dark:bg-primary-dark",
   walletButtonConnected:
      "flex items-center justify-center bg-white text-black rounded-full shadow-md transition-all duration-300",
   menuOption:
      "flex items-center cursor-pointer rounded pl-4 pt-4 dark:text-white",
};
