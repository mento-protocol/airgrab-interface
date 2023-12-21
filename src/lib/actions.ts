"use server";

import { z } from "zod";
import client from "@mailchimp/mailchimp_marketing";
import {
  MAILCHIMP_API_KEY,
  MAILCHIMP_AUDIENCE_ID,
  MAILCHIMP_SERVER_PREFIX,
} from "./server-constants";
import { LaunchNotificationInputSchema } from "./schema";

type LaunchNotificationInput = z.infer<typeof LaunchNotificationInputSchema>;

class APIError extends Error {
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
const MAILCHIMP_AUDIENCE_TAG_AIRGRAB_NOTIFICATION =
  "airgrab_launch_notification";

export async function processEmailInput(data: LaunchNotificationInput) {
  const result = LaunchNotificationInputSchema.safeParse(data);

  if (!result.success) {
    return { error: result.error.format() };
  }

  try {
    const { email_address } = result.data;
    await client.lists.addListMember(MAILCHIMP_AUDIENCE_ID, {
      email_address,
      status: MAILCHIMP_AUDIENCE_MEMBER_STATUS_SUBSCRIBED,
      tags: [MAILCHIMP_AUDIENCE_TAG_AIRGRAB_NOTIFICATION],
    });
    return { success: true };
  } catch (e) {
    const error = parseErrorToMessage(e);
    return { error };
  }
}

const parseErrorToMessage = (e: unknown): string => {
  if (!(e instanceof Error)) {
    return "An unknown error occurred.";
  }

  if ((e as APIError).response?.text) {
    const responseText = JSON.parse((e as APIError).response.text);

    switch (responseText.title) {
      case "Member Exists": {
        return "Email already subscribed";
      }
      default: {
        return responseText.title;
      }
    }
  }

  return e.message;
};
