import {
  FRACTAL_CLIENT_ID,
  RESTRICTED_COUNTRIES,
  COUNTRY_NAMES,
} from "@/lib/constants";

function countryList(countryCodes: string[]): string {
  if (countryCodes.length === 0) return "";

  return countryCodes
    .map((code) => {
      const name = COUNTRY_NAMES[code];
      if (!name) {
        console.error("invalid country code:", code);
        throw new Error("invalid country");
      }
      return `${name} (${code})`;
    })
    .join(", ");
}

export function createFractalAuthMessage(
  verificationType: string = "KYC",
): string {
  const countriesString = countryList(RESTRICTED_COUNTRIES.split(","));

  return `I authorize Airdrop (${FRACTAL_CLIENT_ID}) to get a proof from Fractal that:
- I passed ${verificationType} level plus+liveness
- I am not a resident of the following countries: ${countriesString}`;
}
