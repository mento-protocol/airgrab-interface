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

export const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
export const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;
export const MAILCHIMP_AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;