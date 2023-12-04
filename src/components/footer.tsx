import ThemeSwitch from "@/components/theme-switch";
import MobileAccordianMenu from "@/components/mobile-accordian-menu";
import Link from "next/link";
import {
  DiscordIcon,
  GithubIcon,
  MentoLogo,
  TwitterIcon,
} from "@/components/svgs";
import { links } from "@/lib/constants";

const Footer = () => {
  return (
    <>
      <DesktopFooter />
      <MobileFooter />
    </>
  );
};

export default Footer;

const DesktopFooter = () => {
  return (
    <footer className="hidden lg:flex border-t border-primary-dark dark:border-[#343437] xl:max-w-[1120px] px-4 mx-auto pt-20 justify-between xl:gap-36 lg:gap-16 pb-20 lg:mx-10 xl:mx-auto">
      <div className="-mt-2">
        <MentoLogo />
        <p className="pt-3 text-body-light">
          Mento © 2023. <br />
          All rights reserved.
        </p>
      </div>
      <FooterNav />
      <div className="flex flex-col gap-8">
        <SocialLinks />
        <div className="flex justify-between">
          <span className="dark:text-body-dark">Theme</span>
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  );
};

const MobileFooter = () => {
  return (
    <footer className="px-4 pb-8 mt-10 lg:hidden ">
      <div className="border-t border-primary-dark">
        <MobileAccordianMenu />
        <div className="flex justify-between">
          <div className="flex flex-col">
            <MentoLogo className="h-5 w-[90px]" />
            <p className="pt-4 text-body-light">
              Mento © 2023. <br />
              All rights reserved.
            </p>
          </div>
          <div className="flex flex-col gap-8">
            <SocialLinks />
            <div className="flex justify-between">
              <span className="dark:text-body-dark">Theme</span>
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterNav = () => {
  return (
    <nav className="flex justify-between flex-1 ">
      {Object.entries(footerMenuItems).map(([heading, links]) => {
        return (
          <div key={heading}>
            <h3 className="mb-3 font-medium font-fg text-body-light">
              {heading}
            </h3>
            <ul className="flex flex-col gap-3">
              {links.map(({ title, href }) => {
                return (
                  <Link
                    key={title}
                    target="_blank"
                    rel="noopener noreferrer"
                    href={href}
                  >
                    {title}
                  </Link>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
};

const SocialLinks = ({}) => {
  return (
    <nav className="flex -mt-[10px] dark:text-clean-white">
      <Link
        className="p-2.5"
        target="_blank"
        rel="noopener noreferrer"
        href={links.twitter}
      >
        <TwitterIcon className="dark:text-clean-white" />
      </Link>
      <Link
        className="p-2.5"
        target="_blank"
        rel="noopener noreferrer"
        href={links.github}
      >
        <GithubIcon className="dark:text-clean-white" />
      </Link>
      <Link
        className="p-2.5"
        target="_blank"
        rel="noopener noreferrer"
        href={links.discord}
      >
        <DiscordIcon className="dark:text-clean-white" />
      </Link>
    </nav>
  );
};

const footerMenuItems = {
  Developers: [
    { title: "Docs", href: links.docs },
    { title: "Github", href: links.github },
  ],
  Community: [
    { title: "Forum", href: links.forum },
    { title: "Discord", href: links.discord },
    { title: "Twitter", href: links.twitter },
  ],
  Other: [{ title: "Team", href: links.mentolabs }],
};
