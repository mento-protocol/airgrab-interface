import { ethers, JsonRpcProvider, hashMessage } from "ethers";

import { getSignMessageLibDeployment } from "@safe-global/safe-deployments";
import { celo } from "viem/chains";
import { SiweMessage } from "siwe";

export default async function verifyGnosisSignature(message: SiweMessage) {
  const PROVIDER = new JsonRpcProvider(celo.rpcUrls.default.http[0]);
  const walletAddress = message.address;
  // check if exists on network first
  const byteCode = await PROVIDER.getCode(walletAddress);
  if (!byteCode || byteCode == "0x") {
    return false;
  }

  const gnosisSafeDeployment = getSignMessageLibDeployment({
    network: celo.id.toString(),
  });

  if (!gnosisSafeDeployment) {
    return false;
  }

  const gnosisSafeContract = new ethers.Contract(
    walletAddress,
    gnosisSafeDeployment?.abi,
    PROVIDER,
  );

  const messageHash = hashMessage(message.toMessage());
  // this is the message hash that would be emitted in the event SignMsg
  const gnosisMessageHash =
    await gnosisSafeContract.getMessageHash(messageHash);
  console.log({ gnosisMessageHash });
  let timeout: NodeJS.Timeout;
  const waitForSignedEvent = new Promise<boolean>((resolve, reject) => {
    const onMultiSigSigned = () => {
      clearTimeout(timeout);
      resolve(true);
    };
    timeout = setTimeout(() => {
      gnosisSafeContract.removeListener("SignMsg", onMultiSigSigned);
      reject(false);
    }, 60000); // 60 seconds

    gnosisSafeContract.on("SignMsg", async (msgHash) => {
      if (msgHash == gnosisMessageHash) {
        onMultiSigSigned();
      }
    });
  });

  waitForSignedEvent
    .then(async (value) => {
      if (value) {
        return value;
      }
      return false;
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
  return await waitForSignedEvent;
}
