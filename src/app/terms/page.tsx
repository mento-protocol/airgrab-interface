import type { NextPage } from "next";
import Link from "next/link";

const Page: NextPage = () => {
  return (
    <div className="pb-16" id="team">
      <div className="space-y-4">
        <h4 className="text-xl font-bold uppercase sm:text-6xl md:text-2xl ">
          <span className="stroked-text">
            MENTO Governance Token Airdrop <br /> Terms and Conditions
          </span>
        </h4>

        <p className="text-md md:text-lg tracking-loose">
          These MENTO Governance Tokens Airdrop Terms and Conditions
          (hereinafter referred to as <strong>“Airdrop TnCs”</strong>) apply to
          all participants of the Airdrop of the MENTO Governance Tokens
          (hereinafter referred to as <strong>“Airdrop”</strong>) by the
          [issuing company]. The Airdrop TnCs govern the ability to participate
          in the Airdrop. By participating and claiming MENTO Governance Tokens
          in the Airdrop, you agree to these Airdrop TnCs. If you don’t agree
          with the Airdrop TnCs, please DO NOT ACCESS, USE, PARTICIPATE in the
          Airdrop. If you DO NOT AGREE to these TnCs YOU SHALL BE PROHIBITED
          FROM CLAIMING THE MENTO GOVERNANCE TOKEN(S).
        </p>

        <p className="text-md md:text-lg tracking-loose">
          These Airdrop TnCs constitute the entire agreement between you and
          [issuing company] in regard to the Airdrop and supersede all prior
          agreements – if any - between you and the [issuing company]. These
          Airdrop TnCs may be modified from time to time in which case the “as
          of” date of these Airdrop TnCs will be updated respectively. The
          updated Airdrop TnCs will be effective as of the time of posting, or
          at a later date as may be stipulated in the updated Airdrop TnCs. By
          continuing to participate in the Airdrop after the changes come into
          effect, you agree to the modified Airdrop TnCs.
        </p>

        <p className="text-lg md:text-xl tracking-loose">
          <span className="font-bold">
            What does Airdrop mean?
            <br />
          </span>
        </p>

        <p className="text-md md:text-lg tracking-loose">
          The Airdrop is the process of distributing MENTO Governance Tokens to
          existing community members, engaging with the Mento protocol and
          participating in the Mento governance process, as a reward for their
          past contributions to the development of the decentralized
          permissionless Mento protocol and the use of Mento decentralized
          stable assets (cUSD, cEUR, cREAL, eXOF) or the Mento and Celo
          ecosystem overall.
        </p>

        <p className="text-lg md:text-xl tracking-loose">
          <span className="font-bold">
            Who can claim MENTO Governance Tokens?
            <br />
          </span>
        </p>

        <p className="text-md md:text-lg tracking-loose">
          Eligible Celo wallet addresses, as further described below, can claim
          a combined maximum of 5% of the overall total supply. Users claiming
          the Airdrop will receive it as veMENTO locked for 2 years (linearly
          unlocking without a cliff). After the Airdrop period, unclaimed
          amounts will go to the Mento Community Fund for the use of the Mento
          community.
        </p>

        <p className="text-lg md:text-xl tracking-loose">
          <span className="font-bold">
            What are the Airdrop Eligibility Criteria?
            <br />
          </span>
        </p>

        <p className="text-md md:text-lg tracking-loose">
          To be eligible, a Celo wallet address must fulfill at least one of the
          following criteria:
          <ul className="list-disc mb-5">
            <li className="ml-6 mb-2 mt-2">
              Staked at least $10 (US dollars) worth of CELO (amount based on
              avg. over 16 monthly snapshots, taken between November 15th, 2022,
              and February 15th, 2024);
            </li>
            <li className="ml-6 mb-2">
              Held more than $10 (US dollars) worth of any of Mento&apos;s
              decentralized stable assets (amount based on avg. over 16 monthly
              snapshots, taken between November 15th, 2022, and February 15th,
              2024);
            </li>
            <li className="ml-6">
              Transacted in any of Mento’s decentralized stable assets with a
              volume greater than $100 (US dollars) (volume calculated as the
              cumulative sum over the 16 monthly snapshots between November
              15th, 2022, and February 15th, 2024).
            </li>
          </ul>
          Claimable amounts are concave (think square root) in the balances of
          locked CELO and Mento’s decentralized stable assets, as well as the
          Mento stablecoin volumes:
          <ul className="list-disc mb-5">
            <li className="ml-6 mb-2 mt-2">
              50% allocated to locked CELO holders
            </li>
            <li className="ml-6 mb-2">
              50% allocated to holders of Mento’s decentralized stable assets
            </li>
          </ul>
          Smart contract addresses are excluded, except for{" "}
          <Link
            className="font-fg text-primary-blue underline"
            href="https://docs.celo.org/holder/manage/release-gold"
            target="_blank"
          >
            ReleaseGold
          </Link>{" "}
          addresses (here, we would use the beneficiary address) and Gnosis
          Safes. Mento’s decentralized stable assets held in liquidity pools,
          etc. will not be counted directly because it is not (feasible to
          account for all pools, etc., on all DeFi protocols on Celo), but since
          depositing stablecoins in liquidity pools leads to volume, they are
          counted indirectly. <br /> <br />
          To verify, participants can review raw data from the snapshots in CSV
          files in{" "}
          <Link
            className="font-fg text-primary-blue underline"
            href="https://github.com/mento-protocol/airdrop-snapshot"
            target="_blank"
          >
            this Github repository
          </Link>
          .
        </p>

        <p className="text-lg md:text-xl tracking-loose">
          <span className="font-bold">
            How to participate in the Airdrop?
            <br />
          </span>
        </p>

        <p className="text-md md:text-lg tracking-loose">
          When the Airdrop starts, participants can go to airdrop.mento.org,
          connect a compatible third-party digital wallet, check eligibility,
          provide proof of ownership, verify that they are not on a restricted
          or prohibited list, and claim their allocation.
        </p>

        <p className="text-lg md:text-xl tracking-loose">
          <span className="font-bold">
            Which countries are restricted?
            <br />
          </span>
        </p>

        <p className="text-md md:text-lg tracking-loose">
          <span className="">There are 3 types of restricted countries:</span>{" "}
          <br /> <br />
          <span className="mt-3">
            As further described below, the TnCs refer to “sanction lists” which
            means any sanctions designations listed on economic/trade embargo
            lists and/or specially designated persons/blocked persons lists
            published by international organisations, as well as any state and
            governmental authorities of any jurisdiction, including, but not
            limited to the lists of United Nations, European Union and its
            Member States, United States and United Kingdom sanctions lists.
          </span>
          <ul className="list-decimal mb-5">
            <li className="ml-6 mb-2 mt-2">
              <strong>Prohibited Localities</strong>. You will NOT be eligible
              if the digital wallets are located in, established in, or you are
              a resident of Myanmar (Burma), Cuba, Crimea, Donetsk People’s
              Republic, Democratic Republic of Congo, Iran, the so-called
              Luhansk People’s Republic, Mali, Democratic People’s Republic of
              Korea (North Korea), South Sudan, Syria, Yemen.
            </li>
            <li className="ml-6 mb-2 mt-2">
              <strong>Restricted Persons</strong>. You will NOT be eligible with
              digital wallets, which have been previously classified or
              otherwise identified by international organizations or any state
              and governmental authorities of any jurisdiction, as belonging or
              affiliated with the persons specially designated or otherwise
              included in the Sanction Lists (
              <strong>“Restricted Persons”</strong>). For the purposes of these
              TnCs, Restricted Persons shall also include all persons or
              entities who reside in, are citizens of, are incorporated in, or
              have a registered office in the Prohibited Localities.
            </li>
            <li className="ml-6 mb-2 mt-2">
              Persons residing in the United States or the United Kingdom will
              also be PROHIBITED from participating.
            </li>
            <li className="ml-6 mb-2 mt-2">
              <strong>Non-Circumvention</strong>. You agree not to participate
              or claim the Airdrop using any technology for the purposes of
              circumventing these Terms.
            </li>
          </ul>
        </p>

        <p className="text-lg md:text-xl tracking-loose">
          <span className="font-bold">
            General Airdrop participation rules
            <br />
          </span>
        </p>

        <p className="text-md md:text-lg tracking-loose">
          <strong>No tax advice.</strong> You agree and acknowledge that you
          have the sole responsibility and liability for all taxes in connection
          with your participation in the Airdrop and you should consult a tax
          advisor before participating in the Airdrop.
        </p>

        <p className="text-md md:text-lg tracking-loose">
          <strong>Complying with laws. </strong> You agree and acknowledge that
          you have the sole responsibility for complying with all applicable
          laws of the jurisdiction you are located in when participating in the
          Airdrop and you are the legal owner of the blockchain address that you
          use to access or participate in the Airdrop.
        </p>

        <p className="text-md md:text-lg tracking-loose">
          <strong>Mento Governance Tokens Entitlement. </strong> You agree and
          acknowledge not to engage in any activities that are designed to
          obtain more MENTO Governance Tokens in the Airdrop than you are
          entitled to.
        </p>

        <p className="text-md md:text-lg tracking-loose">
          <strong>Unable to claim MENTO Governance Tokens. </strong> You agree
          and acknowledge that the [issuing company] will not bear any liability
          if you are unable to claim MENTO Governance Tokens in the Airdrop due
          to technical bugs, smart contract issue, gas fees, wallet
          incompatibility, loss of access to a wallet or the keys thereto, or
          for any other reason; you will have no recourse or claim against
          [issuing company].
        </p>

        <p className="text-md md:text-lg tracking-loose">
          <strong>Assets control.</strong> You always retain control over your
          digital assets when participating in the Airdrop.
        </p>

        <p className="text-md md:text-lg tracking-loose">
          <strong>Warranties.</strong> You make the warranties that you (a) have
          never violated any anti-terrorism laws, (b) have never engaged in any
          transaction, investment, undertaking or activity that conceals the
          identity, source or destination of the proceeds from any category of
          prohibited offenses designated by the Financial Action Task Force (
          <strong>“FATF”</strong>) standards on Combating Money Laundering and
          the Financing of Terrorism and Proliferation, as updated from time to
          time, (c) are not identified on the most current list of “Specially
          Designated Nationals and Blocked Persons” published by the Office of
          Foreign Assets Control of the U.S. Department of the Treasury (
          <strong>“OFAC”</strong>) or (d) reside in a country or territory
          identified by the FATF as high risk or that is subject to OFAC
          sanctions or embargo programs.
        </p>

        <p className="text-md md:text-lg tracking-loose">
          <strong>VPN/Circumventions.</strong> You confirm that you will not use
          a VPN or other tool to circumvent any geoblock or other restrictions
          that the [issuing company] may have implemented for Airdrop
          participants. Any such circumvention, or attempted circumvention, may
          permanently disqualify you from participation in the Airdrop and any
          future Mento token airdrops in the sole discretion of the [issuing
          company].
        </p>

        <p className="text-md md:text-lg tracking-loose">
          <strong>Regulatory Uncertainty.</strong> You agree and acknowledge
          that the regulatory regime governing blockchain technologies,
          cryptocurrencies and other digital assets, including governance tokens
          is uncertain and unpredictable, that new regulations may materially
          adversely affect the potential utility or value of such
          cryptocurrencies and digital assets, including governance tokens and
          that there are risks of new taxation related to the purchase or sale
          of cryptocurrencies and other digital assets, including governance
          tokens.
        </p>

        <p className="text-md md:text-lg tracking-loose">
          <strong>No Deposit Insurance.</strong> You agree and acknowledge that
          cryptocurrencies and other digital assets, including governance tokens
          are not covered by any deposit insurance scheme neither (i) as
          deposits of or guaranteed by a bank nor (ii) insured by the European
          Forum of Deposits Insurers (<strong>“EFDI”</strong>) or International
          Association of Deposits Insurers (<strong>“IADI”</strong>) or by any
          other governmental agency.
        </p>
      </div>
    </div>
  );
};

export default Page;
