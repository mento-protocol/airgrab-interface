import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { ReactNode } from "react";
import Footer from "@/components/footer";
import ClaimCard from "@/components/claim-card";
import FAQ from "@/components/faq";
import { Authorization } from "@/contexts/authorization-provider.server";
import Spacer from "@/components/spacer";
import {
  ChevronRight,
  DiscordIcon,
  LearnMoreDark,
  LearnMoreImage,
  MobileLearnIllustration,
  MobileLearnMoreDark,
  TokenL1,
  TokenL2,
  TokenL3,
  TokenL4,
  TokenR1,
  TokenR2,
  TokenR3,
  TokenR4,
} from "@/components/svgs";
import { PrimaryButton } from "@/components/button";
import { links } from "@/lib/constants";

import localFont from "next/font/local";
import { Providers } from "@/components/providers";
const founders_grotesk = localFont({
  variable: "--font-fg",
  src: [
    {
      path: "../../public/fonts/FoundersGrotesk-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/FoundersGrotesk-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/FoundersGrotesk-Semibold.otf",
      weight: "600",
      style: "normal",
    },
  ],
});

export const metadata = {
   title: "Mento | Airgrab",
   description:
      "Over-Collateralized, Decentralized & Transparent stable assets",
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en" suppressHydrationWarning>
         <body
            className={`${founders_grotesk.variable} bg-background flex justify-center w-screen`}
         >
            <Providers>
               <div className="relative w-full h-full max-w-[1440px]">
                  <Header />
                  <main className="flex-grow z-30">
                     <div className="h-12 md:h-24 " />
                     <Spacer axis="vertical" size={24} />
                     <MaxWidthContainer>
                        <MainHeading />
                        <div className="h-2" />
                        <SubHeading />
                     </MaxWidthContainer>
                     <div className="h-8 sm:h-20  md:h-20" />
                     <MaxWidthContainer>
                        <Authorization>
                           <ClaimCard>{children}</ClaimCard>
                        </Authorization>
                     </MaxWidthContainer>
                     <div className="h-[56px] sm:h-[112px] md:h-[112px]" />
                     <MaxWidthContainer>
                        <FAQ />
                     </MaxWidthContainer>
                     <LearnMoreSection />
                  </main>
                  <Footer />
                  <Background />
               </div>
            </Providers>
         </body>
      </html>
   );
}

const SubHeading = () => {
   return (
      <h2 className="font-fg font-medium text-xl md:text-2xl leading-8">
         Claim your part and participate in <br /> shaping the future of digital
         assets
      </h2>
   );
};

const Background = () => {
   return (
      <>
         {/* Floating Tokens */}
         <TokenL1 className=" hidden token-header-touchpoint:block w-[123px] h-[112px] absolute top-[175.69px] left-[176.52px] -z-10" />
         <TokenL2 className=" hidden md:block w-[106px] h-[107px] absolute top-[479px] left-[49.09px] -z-10" />
         <TokenL3 className=" hidden token-header-touchpoint:block w-[73px] h-[75px] absolute top-[786.50px] left-[200.01px] -z-10" />
         <TokenL4 className=" hidden md:block w-[144px] h-[142px] absolute top-[1192px] left-[75.31px] -z-10" />
         <TokenR1 className=" hidden md:block w-[123px] h-[112px] absolute top-[132.81px] left-[1104.23px] -z-10" />
         <TokenR2 className=" hidden md:block w-[106px] h-[107px] absolute top-[533.54px] left-[1296.08px] -z-10" />
         <TokenR3 className=" hidden md:block w-[73px] h-[75px] absolute top-[760.15px] left-[1247.53px] -z-10" />
         <TokenR4 className=" hidden md:block w-[144px] h-[142px] absolute top-[1341.4px] left-[1340.36px] -z-10" />
         {/* Top Left Gradient */}
         <GradientPrimaryLight className="top-[150px] -left-[600px] dark:hidden" />
         <GradientPrimaryLightMobile className=" w-[654px] h-[602px] top-[260.58px] -left-[328px]" />
         <GradientPrimaryLightMobile className=" w-[411px] h-[349px] top-[824.58px] left-[302px]" />
         <GradientPrimaryLightMobile className=" w-[411px] h-[368px] top-[1651px] -left-[231px]" />
         {/* Bottom Right Gradient */}
         <GradientPrimaryLight className="top-[750px] -right-[600px] dark:hidden" />
      </>
   );
};

const MainHeading = () => {
   return (
      <h1 className="font-fg font-semibold text-[32px] md:text-[56px]  tracking-[-0.02em] leading-none mb-3 dark:text-clean-white text-center">
         MENTO TOKEN <br className="md:hidden" />
         <span
            style={{ WebkitTextStroke: "1.2px black" }}
            className="text-transparent"
         >
            AIRGRAB
         </span>
      </h1>
   );
};

const MaxWidthContainer = ({ children }: { children: ReactNode }) => {
   return (
      <div className="flex flex-col items-center justify-center mx-auto max-w-[846px] px-4 md:px-0">
         {children}
      </div>
   );
};

const LearnMoreSection = () => {
   return (
      <div className="lg:mb-[150px] bg-primary-dark max-w-[1248px] mx-auto px-4 xl:px-16 lg:mt-[46px] dark:bg-[#121316] ">
         <div className="max-w-[1120px] items-center flex md:justify-between flex-col lg:flex-row xl:gap-40 lg:px-10 xl:px-0  ">
            <div className="flex-col items-center justify-center pt-16">
               <Heading className="text-clean-white ">Learn more</Heading>
               <FeatureParagraph className="text-center pb-9 lg:text-left">
                  <span className="inline xl:block">
                     If you&apos;re interested in learning more about Mento,
                     finding out what
                  </span>
                  <span className="inline xl:block">
                     {" "}
                     the team is working on now, or would like to contribute,
                     please join
                  </span>
                  <span className="inline xl:block"> our discord server.</span>
               </FeatureParagraph>

               <div className="md:w-full flex justify-center lg:justify-start">
                  <PrimaryButton
                     fullWidth
                     href={links.discord}
                     icon={<ChevronRight />}
                     noFlexZone={true}
                  >
                     <DiscordIcon className="text-clean-white" /> Join the
                     community
                  </PrimaryButton>
               </div>
            </div>
            <LearnMoreImage className="hidden overflow-visible lg:inline w-[444px] h-[352px] dark:hidden" />
            <LearnMoreDark className="hidden overflow-visible w-[444px] h-[352px] dark:lg:inline" />
            <MobileLearnIllustration className="py-8 dark:hidden lg:hidden h-[209px] w-[264px] md:h-[256px] md:w-[324px]" />
            <MobileLearnMoreDark className="py-8 hidden dark:lg:hidden dark:inline lg:hidden h-[209px] w-[264px] md:h-[256px] md:w-[324px]" />
         </div>
      </div>
   );
};

const FeatureParagraph = ({
   children,
   className = "",
}: {
   children: ReactNode;
   className?: string;
}) => {
   return (
      <p
         className={`text-body-light text-[15px] lg:text-[16px] leading-[147%] lg:leading-[162%] ${className}`}
      >
         {children}
      </p>
   );
};

const Heading = ({
   children,
   className = "",
}: {
   children: ReactNode;
   className?: string;
}) => {
   return (
      <h2
         className={`font-fg font-semibold text-[40px] text-center lg:text-left xl:text-[56px] -tracking-[0.01em] lg:whitespace-nowrap leading-[90%] ${className}`}
      >
         {children}
      </h2>
   );
};

const GradientPrimaryLight = ({ className }: { className?: string }) => {
   return (
      <div
         className={`hidden md:block absolute bg-contain bg-center -z-20 w-[1100px] h-[1100px] bg-gradient-radial-primary-light ${className} `}
      />
   );
};

const GradientPrimaryLightMobile = ({
   children,
   className,
}: {
   children?: ReactNode;
   className?: string;
}) => {
   return (
      <div
         className={`absolute md:hidden -z-10 bg-contain bg-center bg-gradient-radial-primary-light-mobile  ${className}`}
      >
         {children}
      </div>
   );
};
