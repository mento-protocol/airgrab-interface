import Link from "next/link";
import { ConnectButton } from "@/components/connect-button";

export default function Header() {
  return (
    <header className="px-3 w-screen pt-4 pb-5 sm:pl-5 sm:pr-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center sm:hidden">
        Mento
          {/* <Image
              src={LogoWhite}
              alt="Mento"
              quality={100}
              width={90}
              className="hidden dark:inline"
            />
            <Image src={LogoBlack} alt="Mento" quality={100} width={90} className="dark:hidden " /> */}
        </Link>
        <Link href="/" className="items-center hidden sm:flex">
          Mento
          {/* <Image
              src={LogoWhite}
              alt="Mento"
              quality={100}
              width={108}
              className="hidden dark:inline"
            />
            <Image src={LogoBlack} alt="Mento" quality={100} width={108} className="dark:hidden" /> */}
        </Link>
        <ConnectButton />
      </div>
    </header>
  );
}
