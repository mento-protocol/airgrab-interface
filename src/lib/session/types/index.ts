export interface SessionData {
  address: string;
  nonce?: string;
  siwe: any;
  success: boolean;
  isKycVerified: boolean;
  hasClaimed: boolean;
}
