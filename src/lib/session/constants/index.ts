import { SessionData } from "../types";

export const defaultSession: SessionData = {
  address: "",
  nonce: "",
  siwe: {},
  success: false,
  isKycVerified: false,
  hasClaimed: false,
  allocation: "0",
};
