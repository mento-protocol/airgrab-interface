import { z } from "zod";

export const LaunchNotificationInputSchema = z.object({
  email_address: z.string().email("Please enter a valid email address"),
});