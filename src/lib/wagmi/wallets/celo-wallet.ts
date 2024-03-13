import type { Wallet } from "@rainbow-me/rainbowkit";
import { getWalletConnectConnector } from "@rainbow-me/rainbowkit";

export interface CeloWalletOptions {
  projectId: string;
}

// export const CeloWallet = ({
//   chains = [Alfajores, Baklava, Celo],
//   projectId,
// }: CeloWalletOptions): Wallet => ({
//   id: "celo-wallet",
//   name: "Celo Wallet",
//   iconUrl: "https://rainbowkit-with-celo.vercel.app/icons/mono.svg",
//   iconBackground: "#FFF",
//   createConnector: () => {
//     const connector = getWalletConnectConnector({
//       projectId,
//     });
//     return {
//       connector,
//       mobile: {
//         getUri: () => getWalletConnectUri(connector, "2"),
//       },
//       desktop: {
//         getUri: async () => {
//           const uri = await getWalletConnectUri(connector, "2");
//           return `celowallet://wc?uri=${encodeURIComponent(uri)}`;
//         },
//       },
//     };
//   },
// });

export interface CeloWallet {
  projectId: string;
}
export const celoWallet = ({ projectId }: CeloWalletOptions): Wallet => ({
  id: "celo-wallet",
  name: "Celo Wallet",
  iconUrl: "https://rainbowkit-with-celo.vercel.app/icons/mono.svg",
  iconBackground: "#0c2f78",
  // downloadUrls: {
  //   android: "https://play.google.com/store/apps/details?id=my.wallet",
  //   ios: "https://apps.apple.com/us/app/my-wallet",
  //   chrome: "https://chrome.google.com/webstore/detail/my-wallet",
  //   qrCode: "https://my-wallet/qr",
  // },
  // mobile: {
  //   getUri: (uri: string) => uri,
  // },
  // qrCode: {
  //   getUri: (uri: string) => uri,
  //   instructions: {
  //     learnMoreUrl: "https://my-wallet/learn-more",
  //     steps: [
  //       {
  //         description:
  //           "We recommend putting My Wallet on your home screen for faster access to your wallet.",
  //         step: "install",
  //         title: "Open the My Wallet app",
  //       },
  //       {
  //         description:
  //           "After you scan, a connection prompt will appear for you to connect your wallet.",
  //         step: "scan",
  //         title: "Tap the scan button",
  //       },
  //     ],
  //   },
  // },
  // extension: {
  //   instructions: {
  //     learnMoreUrl: "https://my-wallet/learn-more",
  //     steps: [
  //       {
  //         description:
  //           "We recommend pinning My Wallet to your taskbar for quicker access to your wallet.",
  //         step: "install",
  //         title: "Install the My Wallet extension",
  //       },
  //       {
  //         description:
  //           "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
  //         step: "create",
  //         title: "Create or Import a Wallet",
  //       },
  //       {
  //         description:
  //           "Once you set up your wallet, click below to refresh the browser and load up the extension.",
  //         step: "refresh",
  //         title: "Refresh your browser",
  //       },
  //     ],
  //   },
  // },
  createConnector: getWalletConnectConnector({ projectId }),
});

export default CeloWallet;
