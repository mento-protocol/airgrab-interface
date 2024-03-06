"use server";

import client from "@mailchimp/mailchimp_marketing";
import {
  MAILCHIMP_API_KEY,
  MAILCHIMP_AUDIENCE_ID,
  MAILCHIMP_SERVER_PREFIX,
} from "./constants.server";

type LaunchNotificationInput = {
  email_address: string;
};
type ValidationError = {
  error?: { message: string; type: string };
  type: "ValidationError";
};
type APIError = { error: { message: string; type: string }; type: "APIError" };
type Success = { success: true; type: "Success" };
type ProcessEmailInputResult = Success | APIError | ValidationError;

class MailchimpAPIError extends Error {
  response: any;

  constructor(message: string, response: any) {
    super(message);
    this.response = response;
  }
}

//TODO: Update this with the correct environment variables
client.setConfig({
  apiKey: MAILCHIMP_API_KEY,
  server: MAILCHIMP_SERVER_PREFIX,
});

const MAILCHIMP_AUDIENCE_MEMBER_STATUS_SUBSCRIBED = "subscribed";
//TODO: Update this with the correct tag
const MAILCHIMP_AUDIENCE_TAG_AIRDROP_NOTIFICATION =
  "airdrop_launch_notification";

export async function processEmailInput(
  data: LaunchNotificationInput,
): Promise<ProcessEmailInputResult> {
  const result = validateEmail(data.email_address);

  if (result.error) {
    return { error: result.error, type: "ValidationError" };
  }

  try {
    const { email_address } = result.data;

    const mailChimpResult = await client.lists.addListMember(
      MAILCHIMP_AUDIENCE_ID,
      {
        email_address,
        status: MAILCHIMP_AUDIENCE_MEMBER_STATUS_SUBSCRIBED,
        tags: [MAILCHIMP_AUDIENCE_TAG_AIRDROP_NOTIFICATION],
      },
    );

    console.log({ mailChimpResult });

    return { success: true, type: "Success" };
  } catch (e) {
    const error = parseError(e);
    return error;
  }
}

const parseError = (e: unknown): APIError => {
  if (!(e instanceof Error)) {
    return {
      error: { message: "An unknown error occurred.", type: "Unknown" },
      type: "APIError",
    };
  }

  if ((e as MailchimpAPIError).response?.text) {
    const responseText = JSON.parse((e as MailchimpAPIError).response.text);

    switch (responseText.title) {
      case "Member Exists": {
        return {
          error: {
            message: "Email already subscribed",
            type: "MailchimpAPIMemberExists",
          },
          type: "APIError",
        };
      }
      default: {
        return {
          error: { message: responseText.title, type: "MailchimpAPI" },
          type: "APIError",
        };
      }
    }
  }

  return { error: { message: e.message, type: "Generic" }, type: "APIError" };
};

const validateEmail = (email_address: string) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email_address)
    ? { success: true, data: { email_address } }
    : {
        error: { message: "email address not valid", type: "Invalid Email" },
      };
