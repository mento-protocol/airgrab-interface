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

  if (result.success) {
    const { email_address } = result.data;
    try {
      await client.lists.addListMember(MAILCHIMP_AUDIENCE_ID, {
        email_address,
        status: MAILCHIMP_AUDIENCE_MEMBER_STATUS_SUBSCRIBED,
        tags: [MAILCHIMP_AUDIENCE_TAG_AIRGRAB_NOTIFICATION],
      });
      return { success: true };
    } catch (e) {
      if (e instanceof Error) {
        return { success: false, error: e.message };
      }
    }
  }

  if (!result.success) {
    return { success: false, error: result.error.format() };
  }
}
