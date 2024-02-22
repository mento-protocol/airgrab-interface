import "server-only";

if (!process.env.MAILCHIMP_SERVER_PREFIX) {
  throw new Error(
    "MAILCHIMP_SERVER_PREFIX is not set. Please set MAILCHIMP_SERVER_PREFIX environment variable.",
  );
}
if (!process.env.MAILCHIMP_API_KEY) {
  throw new Error(
    "MAILCHIMP_API_KEY is not set. Please set MAILCHIMP_API_KEY environment variable.",
  );
}
if (!process.env.MAILCHIMP_AUDIENCE_ID) {
  throw new Error(
    "MAILCHIMP_AUDIENCE_ID is not set. Please set MAILCHIMP_AUDIENCE_ID environment variable.",
  );
}
if (!process.env.FRACTAL_CLIENT_SECRET)
  throw new Error(
    "FRACTAL_CLIENT_SECRET is not set. Please set FRACTAL_CLIENT_SECRET environment variable.",
  );
if (!process.env.SECRET_COOKIE_PASSWORD) {
  throw new Error(
    "SECRET_COOKIE_PASSWORD is not set, please set in environment variables",
  );
}
if (!process.env.FRACTAL_KYC_LEVEL) {
  throw new Error("FRACTAL_KYC_LEVEL is not set");
}

// Exporting the variables
export const FRACTAL_KYC_LEVEL = process.env.FRACTAL_KYC_LEVEL;
export const SECRET_COOKIE_PASSWORD = process.env.SECRET_COOKIE_PASSWORD;
export const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
export const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;
export const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
export const FRACTAL_CLIENT_SECRET = process.env.FRACTAL_CLIENT_SECRET;
export const FRACTAL_TOKEN_COOKIE_NAME = "fid";
