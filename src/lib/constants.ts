export const links = {
  discord: "https://discord.com/invite/Zszgng9NdF",
  github: "https://github.com/mento-protocol",
  twitter: "https://twitter.com/MentoLabs",
  docs: "https://docs.mento.org/mento/mento-protocol/readme",
  mento2: "https://forum.celo.org/t/towards-mento-2-0/3473",
  gcp61: "https://celo.stake.id/#/proposal/62",
  app: "https://app.mento.org/",
  roadmap: "https://mento.canny.io/",
  forum: "https://forum.celo.org/c/mento/33",
  mentolabs: "https://www.mentolabs.xyz/team",
  cookiePolicy: "/files/cookie-policy.pdf",
  mirror: "https://mirror.xyz/mentoprotocol.eth",
  mento: "https://www.mento.org/",
};

// Ensuring the environment variables are set
if (!process.env.NEXT_PUBLIC_FRACTAL_AUTH_URL) {
  throw new Error(
    "NEXT_PUBLIC_FRACTAL_AUTH_URL is undefined. Plesae set FRACTAL_AUTH_URL environment variable.",
  );
}
if (!process.env.NEXT_PUBLIC_FRACTAL_CLIENT_ID) {
  throw new Error(
    "NEXT_PUBLIC_FRACTAL_CLIENT_ID is undefined. Please set FRACTAL_CLIENT_ID environment variable.",
  );
}
if (!process.env.NEXT_PUBLIC_FRACTAL_APP_URL) {
  throw new Error(
    "NEXT_PUBLIC_FRACTAL_APP_URL is undefined. Please set FRACTAL_APP_URL environment variable.",
  );
}
if (!process.env.NEXT_PUBLIC_FRACTAL_RESOURCE_URL) {
  throw new Error(
    "NEXT_PUBLIC_FRACTAL_RESOURCE_URL is undefined. Please set FRACTAL_RESOURCE_URL environment variable.",
  );
}
if (!process.env.NEXT_PUBLIC_BASE_URL) {
  throw new Error("NEXT_PUBLIC_BASE_URL is undefined");
}
if (!process.env.NEXT_PUBLIC_LAUNCH_DATE) {
  throw new Error("NEXT_PUBLIC_LAUNCH_DATE is undefined");
}
if (!process.env.NEXT_PUBLIC_RESTRICTED_COUNTRIES) {
  throw new Error("NEXT_PUBLIC_RESTRICTED_COUNTRIES is undefined");
}

// Exporting the variables
export const FRACTAL_APP_URL = process.env.NEXT_PUBLIC_FRACTAL_APP_URL;
export const FRACTAL_AUTH_URL = process.env.NEXT_PUBLIC_FRACTAL_AUTH_URL;
export const FRACTAL_RESOURCE_URL =
  process.env.NEXT_PUBLIC_FRACTAL_RESOURCE_URL;
export const FRACTAL_CLIENT_ID = process.env.NEXT_PUBLIC_FRACTAL_CLIENT_ID;
export const FRACTAL_CRED_URL = process.env.NEXT_PUBLIC_FRACTAL_CRED_URL;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
//TODO: Update this with the correct date
export const LAUNCH_DATE = process.env.NEXT_PUBLIC_LAUNCH_DATE;

export const RESTRICTED_COUNTRIES =
  process.env.NEXT_PUBLIC_RESTRICTED_COUNTRIES;

export const COUNTRY_NAMES: Record<string, string> = {
  AD: "Andorra",
  AE: "United Arab Emirates",
  AF: "Afghanistan",
  AG: "Antigua and Barbuda",
  AI: "Anguilla",
  AL: "Albania",
  AM: "Armenia",
  AO: "Angola",
  AQ: "Antarctica",
  AR: "Argentina",
  AS: "American Samoa",
  AT: "Austria",
  AU: "Australia",
  AW: "Aruba",
  AX: "Åland Islands",
  AZ: "Azerbaijan",
  BA: "Bosnia and Herzegovina",
  BB: "Barbados",
  BD: "Bangladesh",
  BE: "Belgium",
  BF: "Burkina Faso",
  BG: "Bulgaria",
  BH: "Kingdom of Bahrain",
  BI: "Burundi",
  BJ: "Benin",
  BL: "Collectivity of Saint Barthélemy",
  BM: "Bermuda",
  BN: "Brunei",
  BO: "Bolivia",
  BR: "Brazil",
  BS: "Commonwealth of the Bahamas",
  BT: "Kingdom of Bhutan",
  BW: "Botswana",
  BY: "Belarus",
  BZ: "Belize",
  CA: "Canada",
  CC: "Cocos (Keeling) Islands",
  CD: "Democratic Republic of the Congo",
  CF: "Central African Republic",
  CG: "Congo",
  CH: "Switzerland",
  CI: "Côte d'Ivoire",
  CK: "Cook Islands",
  CL: "Chile",
  CM: "Cameroon",
  CN: "People's Republic of China",
  CO: "Colombia",
  CR: "Costa Rica",
  CU: "Cuba",
  CV: "Cabo Verde",
  CW: "Curaçao",
  CX: "Territory of Christmas Island",
  CY: "Cyprus",
  CZ: "Czech Republic",
  DE: "Germany",
  DJ: "Djibouti",
  DK: "Denmark",
  DM: "Commonwealth of Dominica",
  DO: "Dominican Republic",
  DZ: "Algeria",
  EC: "Ecuador",
  EE: "Estonia",
  EG: "Egypt",
  EH: "Sahrawi",
  ER: "Eritrea",
  ES: "Spain",
  ET: "Ethiopia",
  FI: "Finland",
  FJ: "Fiji",
  FK: "Falkland Islands",
  FM: "Micronesia",
  FO: "Faroe Islands",
  FR: "France",
  GA: "Gabonese Republic",
  GB: "United Kingdom",
  GD: "Grenada",
  GE: "Georgia",
  GF: "Guiana",
  GG: "Bailiwick of Guernsey",
  GH: "Ghana",
  GI: "Gibraltar",
  GL: "Greenland",
  GM: "Gambia",
  GN: "Guinea",
  GP: "Guadeloupe",
  GQ: "Equatorial Guinea",
  GR: "Greece",
  GS: "South Georgia and the South Sandwich Islands",
  GT: "Guatemala",
  GU: "Guam",
  GW: "Guinea-Bissau",
  GY: "Guyana",
  HK: "Hong Kong",
  HM: "Heard Island and McDonald Islands",
  HN: "Honduras",
  HR: "Croatia",
  HT: "Haiti",
  HU: "Hungary",
  ID: "Indonesia",
  IE: "Ireland",
  IL: "Israel",
  IM: "Isle of Man",
  IN: "India",
  IO: "British Indian Ocean Territory",
  IQ: "Iraq",
  IR: "Iran",
  IS: "Iceland",
  IT: "Italy",
  JE: "Bailiwick of Jersey",
  JM: "Jamaica",
  JO: "Jordan",
  JP: "Japan",
  KE: "Kenya",
  KG: "Kyrgyzstan",
  KH: "Cambodia",
  KI: "Kiribati",
  KM: "Union of the Comoros",
  KN: "Saint Christopher and Nevisa",
  KP: "Democratic People's Republic of Korea",
  KR: "Republic of Korea",
  KW: "Kuwait",
  KY: "Cayman Islands",
  KZ: "Kazakhstan",
  LA: "Lao People's Democratic Republic",
  LB: "Lebanese Republic",
  LC: "Saint Lucia",
  LI: "Liechtenstein",
  LK: "Sri Lanka",
  LR: "Liberia",
  LS: "Lesotho",
  LT: "Lithuania",
  LU: "Luxembourg",
  LV: "Latvia",
  LY: "Libya",
  MA: "Morocco",
  MC: "Monaco",
  MD: "Moldova",
  ME: "Montenegro",
  MF: "Saint Martin",
  MG: "Madagascar",
  MH: "Marshall Islands",
  MK: "Macedonia",
  ML: "Mali",
  MM: "Myanmar",
  MN: "Mongolia",
  MO: "Macao",
  MP: "Northern Mariana Islands",
  MQ: "Martinique",
  MR: "Mauritania",
  MS: "Montserrat",
  MT: "Malta",
  MU: "Mauritius",
  MV: "Maldives",
  MW: "Malawi",
  MX: "Mexico",
  MY: "Malaysia",
  MZ: "Mozambique",
  NA: "Namibia",
  NC: "New Caledonia",
  NE: "Niger",
  NF: "Norfolk Island",
  NG: "Nigeria",
  NI: "Nicaragua",
  NL: "Netherlands",
  NO: "Norway",
  NP: "Nepal",
  NR: "Nauru",
  NU: "Niue",
  NZ: "New Zealand",
  OM: "Oman",
  PA: "Panama",
  PE: "Peru",
  PF: "French Polynesia",
  PG: "Papua New Guinea",
  PH: "Philippines",
  PK: "Pakistan",
  PL: "Poland",
  PM: "Saint Pierre and Miquelon",
  PN: "Pitcairn Group of Islands",
  PR: "Puerto Rico",
  PS: "Palestine",
  PT: "Portugal",
  PW: "Palau",
  PY: "Paraguay",
  QA: "Qatar",
  RE: "Réunion Island",
  RO: "Romania",
  RS: "Serbia",
  RU: "Russian Federation",
  RW: "Rwanda",
  SA: "Saudi Arabia",
  SB: "Solomon Islands",
  SC: "Seychelles",
  SD: "Sudan",
  SE: "Sweden",
  SG: "Singapore",
  SI: "Slovenia",
  SJ: "Svalbard og Jan Mayen",
  SK: "Slovakia ",
  SL: "Sierra Leone",
  SM: "San Marino",
  SN: "Senegal",
  SO: "Somalia",
  SR: "Suriname",
  SS: "South Sudan",
  ST: "São Tomé and Príncipe",
  SV: "El Salvador",
  SX: "Sint Maarten",
  SY: "Syria",
  SZ: "Swaziland",
  TC: "Turks and Caicos Islands",
  TD: "Chad",
  TF: "French Southern and Antarctic Lands",
  TG: "Togolese Republic",
  TH: "Thailand",
  TJ: "Tajikistan",
  TK: "Tokelau",
  TL: "Timor-Leste",
  TM: "Turkmenistan",
  TN: "Tunisia",
  TO: "Tonga",
  TR: "Turkey",
  TT: "Trinidad and Tobago",
  TV: "Tuvalu",
  TW: "Republic of China (Taiwan)",
  TZ: "Tanzania",
  UA: "Ukraine",
  UG: "Uganda",
  UM: "United States Minor Outlying Islands",
  US: "United States of America",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VA: "Vatican",
  VC: "Saint Vincent and the Grenadines",
  VE: "Venezuela",
  VG: "Virgin Islands",
  VI: "Virgin Islands of the United States",
  VN: "Vietnam",
  VU: "Vanuatu",
  WF: "Wallis and Futuna Islands",
  WS: "Samoa",
  XK: "Kosovo",
  YE: "Yemen",
  YT: "Department of Mayotte",
  ZA: "South Africa",
  ZM: "Zambia",
  ZW: "Zimbabwe",
};
