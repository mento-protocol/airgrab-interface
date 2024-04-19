"use client";
import { useEffect, useCallback, useState, Fragment, useRef } from "react";
import { Button } from "./button";
import { Dialog, Transition } from "@headlessui/react";

export default function TermsModal() {
  const [isChecked, setIsChecked] = useState(false);
  const [termsContainer, setTermsContainer] = useState<HTMLDivElement | null>(
    null,
  );
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const hasAgreedToTerms = localStorage.getItem("hasAgreedToTerms");
    setShowModal(!hasAgreedToTerms);
  }, []);

  // Set the terms container ref
  const termsContainerRef = useCallback((node: HTMLDivElement | null) => {
    setTermsContainer(node);
  }, []);

  // Check if user has scrolled to the bottom of the terms
  useEffect(() => {
    const handleScroll = () => {
      if (termsContainer) {
        const { scrollTop, scrollHeight, clientHeight } = termsContainer;
        if (scrollTop + clientHeight >= scrollHeight) {
          setHasScrolledToBottom(true);
        }
      }
    };

    if (termsContainer) {
      termsContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (termsContainer) {
        termsContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [termsContainer]);

  const onCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleAgreeAndContinue = () => {
    if (isChecked && typeof window !== "undefined") {
      localStorage.setItem("hasAgreedToTerms", "true");
      setShowModal(false);
    }
  };

  if (!showModal) {
    return null;
  }

  return (
    <>
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          open={showModal}
          as="div"
          className="relative z-10"
          onClose={() => ({})}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 modal-open backdrop-blur" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="h-[540px] w-[328px] md:w-[547px] md:min-h-[350px] md:max-w-[547px] flex flex-col p-[18px] bg-white shadow-md rounded-[8px] border-t-[1px] overflow-visible border border-primary-dark">
                  <Dialog.Title
                    as="h1"
                    className="font-fg pt-none text-[22px] leading-[22px] md:text-[32px] text-center font-medium md:pt-5"
                  >
                    MENTO token airdrop terms
                  </Dialog.Title>
                  <div
                    ref={termsContainerRef}
                    className="p-[20px] border border-[#B3B3B3] overflow-auto rounded-lg text-[12px] font-inter font-[400] my-5 leading-[14.4px]"
                  >
                    These MENTO Governance Tokens Airdrop Terms and Conditions
                    (hereinafter referred to as “<strong>Airdrop TnCs</strong>”)
                    apply to all participants of the Airdrop of the MENTO
                    Governance Tokens (hereinafter referred to as “
                    <strong>Airdrop</strong>”). The Airdrop TnCs govern the
                    ability to participate in the Airdrop. By participating and
                    claiming MENTO Governance Tokens in the Airdrop, you agree
                    to these Airdrop TnCs. If you don&apos;t agree with the
                    Airdrop TnCs, please DO NOT ACCESS, USE, PARTICIPATE in the
                    Airdrop. If you DO NOT AGREE to these TnCs YOU SHALL BE
                    PROHIBITED FROM CLAIMING THE MENTO GOVERNANCE TOKEN(S).{" "}
                    <br /> <br /> These Airdrop TnCs may be modified from time
                    to time in which case the “as of” date of these Airdrop TnCs
                    will be updated respectively. The updated Airdrop TnCs will
                    be effective as of the time of posting, or at a later date
                    as may be stipulated in the updated Airdrop TnCs. By
                    continuing to participate in the Airdrop after the changes
                    come into effect, you agree to the modified Airdrop TnCs.{" "}
                    <br />
                    <br />
                    <strong>What does Airdrop mean?</strong> <br />
                    The Airdrop is the process of distributing MENTO Governance
                    Tokens to existing community members, engaging with the
                    Mento protocol and participating in the Mento governance
                    process, as a reward for their past contributions to the
                    development of the decentralized permissionless Mento
                    protocol and the use of Mento decentralized stable assets
                    (cUSD, cEUR, cREAL, eXOF) or the Mento and Celo ecosystem
                    overall. <br />
                    <br />
                    <strong>Who can claim MENTO Governance Tokens?</strong>
                    <br /> Eligible Celo wallet addresses, as further described
                    below, can claim a combined maximum of 5% of the overall
                    total supply. Users claiming the Airdrop will receive it as
                    veMENTO locked for 2 years (linearly unlocking without a
                    cliff). After the Airdrop period, unclaimed amounts will go
                    to the Mento Community Fund for the use of the Mento
                    community. <br />
                    <br />
                    <strong>
                      What are the Airdrop Eligibility Criteria?
                    </strong>{" "}
                    <br />
                    To be eligible, a Celo wallet address must fulfill at least
                    one of the following criteria:
                    <ul className="list-disc">
                      <li className="ml-5">
                        Staked at least USD 10,00 worth of CELO (amount based on
                        avg. over 16 months snapshots, taken between November
                        15th, 2022, and February 15th, 2024);
                      </li>
                      <li className="ml-5">
                        Held more than USD 10,00 worth of any of Mento&apos;s
                        decentralized stable assets (amount based on avg. over
                        16 months snapshots, taken between November 15th, 2022,
                        and February 15th, 2024);
                      </li>
                      <li className="ml-5">
                        Transacted in any of Mento&apos;s decentralized stable
                        assets with a volume greater than USD 100,00 (volume
                        calculated as the cumulative sum over the 16 months
                        snapshots between November 15th, 2022, and February
                        15th, 2024).
                      </li>
                    </ul>
                    Claimable amounts are a function of balances of locked CELO
                    and Mento&apos;s decentralized stable assets, as well as the
                    Mento stable assets volumes:
                    <ul className="list-disc">
                      <li className="ml-5">
                        {" "}
                        50% allocated to locked CELO holders{" "}
                      </li>
                      <li className="ml-5">
                        50% allocated to holders of Mento&apos;s decentralized
                        stable assets
                      </li>
                    </ul>
                    <br />
                    Smart contract addresses are excluded, except for
                    ReleaseGold addresses (here, we would use the beneficiary
                    address) and Gnosis Safes. Mento&apos;s decentralized stable
                    assets held in liquidity pools, etc. will not be counted
                    directly because it is not (feasible to account for all
                    pools, etc., on all DeFi protocols on Celo), but since
                    depositing stable assets in liquidity pools leads to volume,
                    they are counted indirectly. <br />
                    <br /> To verify, participants can review raw data from the
                    snapshots in CSV files in this GitHub repository. <br />
                    <br />
                    <strong>
                      How to participate in the Airdrop?
                    </strong> <br /> When the Airdrop starts, participants can
                    go to airdrop.mento.org, connect a compatible third-party
                    digital wallet, check eligibility, provide proof of
                    ownership, verify that they are not on a restricted or
                    prohibited list, and claim their allocation. <br />
                    <br />
                    <strong>Which countries are blocked? </strong>
                    <br /> There are 3 types of restricted countries:
                    <br />
                    <br /> As further described below, the TnCs refer to
                    “sanction lists” which means any sanctions designations
                    listed on economic/trade embargo lists and/or specially
                    designated persons/blocked persons lists published by
                    international organisations, as well as any state and
                    governmental authorities of any jurisdiction, including, but
                    not limited to the lists of United Nations, European Union
                    and its Member States, United States and United Kingdom
                    sanctions lists.
                    <br />
                    <br />
                    <ol className="list-decimal">
                      <li className="ml-5">
                        <strong>Prohibited Localities.</strong> You will NOT be
                        eligible if the digital wallets are located in,
                        established in, or you are a resident of Myanmar
                        (Burma), Cuba, Crimea, Donetsk People&apos;s Republic,
                        Democratic Republic of Congo, Iran, the so-called
                        Luhansk People&apos;s Republic, Mali, Democratic
                        People&apos;s Republic of Korea (North Korea), South
                        Sudan, Syria, Yemen.
                      </li>
                      <br />
                      <li className="ml-5">
                        <strong>Restricted Persons.</strong> You will NOT be
                        eligible with digital wallets, which have been
                        previously classified or otherwise identified by
                        international organizations or any state and
                        governmental authorities of any jurisdiction, as
                        belonging or affiliated with the persons specially
                        designated or otherwise included in the Sanction Lists
                        (“Restricted Persons”). For the purposes of these TnCs,
                        Restricted Persons shall also include all persons or
                        entities who reside in, are citizens of, are
                        incorporated in, or have a registered office in the
                        Prohibited Localities.
                      </li>
                      <br />
                      <li className="ml-5">
                        <strong>US and UK</strong>. Persons residing in the
                        United States or the United Kingdom will also be
                        PROHIBITED from participating.
                      </li>
                      <br />
                      <li className="ml-5">
                        <strong>Non-Circumvention.</strong> You agree not to
                        participate or claim the Airdrop using any technology
                        for the purposes of circumventing these Terms.
                      </li>
                    </ol>
                    <br />
                    <strong>General Airdrop participation rules</strong> <br />
                    <br />
                    <strong>No tax advice. </strong>You agree and acknowledge
                    that you have the sole responsibility and liability for all
                    taxes in connection with your participation in the Airdrop
                    and you should consult a tax advisor before participating in
                    the Airdrop. <br />
                    <br />
                    <strong>Complying with laws.</strong> You agree and
                    acknowledge that you have the sole responsibility for
                    complying with all applicable laws of the jurisdiction you
                    are located in when participating in the Airdrop and you are
                    the legal owner of the blockchain address that you use to
                    access or participate in the Airdrop. <br />
                    <br />
                    <strong> Mento Governance Tokens Entitlement.</strong> You
                    agree and acknowledge not to engage in any activities that
                    are designed to obtain more MENTO Governance Tokens in the
                    Airdrop than you are entitled to. <br />
                    <br />
                    <strong>
                      Unable to claim MENTO Governance Tokens.
                    </strong>{" "}
                    You agree and acknowledge that no person or legal entity
                    will bear any liability if you are unable to claim MENTO
                    Governance Tokens in the Airdrop due to technical bugs,
                    smart contract issue, gas fees, wallet incompatibility, loss
                    of access to a wallet or the keys thereto, or for any other
                    reason; you will have no recourse or claim against a person
                    or legal entity.
                    <br />
                    <br />
                    <strong> Assets control.</strong> You always retain control
                    over your digital assets when participating in the Airdrop.{" "}
                    <br />
                    <br />
                    <strong> Warranties.</strong>
                    You make the warranties that you (a) have never violated any
                    anti-terrorism laws, (b) have never engaged in any
                    transaction, investment, undertaking or activity that
                    conceals the identity, source or destination of the proceeds
                    from any category of prohibited offenses designated by the
                    Financial Action Task Force (“
                    <strong>FATF</strong>”) standards on Combating Money
                    Laundering and the Financing of Terrorism and Proliferation,
                    as updated from time to time, (c) are not identified on the
                    most current list of “Specially Designated Nationals and
                    Blocked Persons” published by the Office of Foreign Assets
                    Control of the U.S. Department of the Treasury (“
                    <strong>OFAC</strong>”) or (d) reside in a country or
                    territory identified by the FATF as high risk or that is
                    subject to OFAC sanctions or embargo programs.
                    <br />
                    <br />
                    <strong>VPN/Circumventions.</strong> You confirm that you
                    will not use a VPN or other tool to circumvent any geoblock
                    or other restrictions. Any such circumvention, or attempted
                    circumvention, may permanently disqualify you from
                    participation in the Airdrop and any future Mento token
                    airdrops.
                    <br />
                    <br />
                    <strong> Regulatory Uncertainty.</strong> You agree and
                    acknowledge that the regulatory regime governing blockchain
                    technologies, cryptocurrencies and other digital assets,
                    including governance tokens is uncertain and unpredictable,
                    that new regulations may materially adversely affect the
                    potential utility or value of such cryptocurrencies and
                    digital assets, including governance tokens and that there
                    are risks of new taxation related to the purchase or sale of
                    cryptocurrencies and other digital assets, including
                    governance tokens. <br /> <br />
                    <strong>No Deposit Insurance.</strong> You agree and
                    acknowledge that cryptocurrencies and other digital assets,
                    including governance tokens are not covered by any deposit
                    insurance scheme neither (i) as deposits of or guaranteed by
                    a bank nor (ii) insured by the European Forum of Deposits
                    Insurers (“
                    <strong>EFDI</strong>”) or International Association of
                    Deposits Insurers (“<strong>IADI</strong>”) or by any other
                    governmental agency.
                  </div>
                  <div>
                    <label className="my-[18px] text-[18px] mr-[5px] flex flex-row justify-center w-full font-fg mt-0">
                      <input
                        className="scale-150 mr-[10px] flex"
                        type="checkbox"
                        onClick={onCheckboxChange}
                        disabled={!hasScrolledToBottom}
                      />
                      I have read, understand and accept these terms
                    </label>
                  </div>

                  <Button
                    className={`${
                      !isChecked && "cursor-not-allowed"
                    } outline-none`}
                    color="blue"
                    type="submit"
                    disabled={!isChecked}
                    onClick={handleAgreeAndContinue}
                  >
                    Agree and continue
                  </Button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
