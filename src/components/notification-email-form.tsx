"use client";
import React from "react";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PrimaryButton } from "@/components/button";
import { LaunchNotificationInputSchema } from "@/lib/schema";
import { processEmailInput } from "@/lib/actions";

type LaunchNotificationInput = z.infer<typeof LaunchNotificationInputSchema>;

export const NotificationEmailForm = ({
  defaultMessage,
  successMessage,
}: {
  defaultMessage: React.ReactNode;
  successMessage: React.ReactNode;
}) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<LaunchNotificationInput>({
    resolver: zodResolver(LaunchNotificationInputSchema),
  });

  const processForm: SubmitHandler<LaunchNotificationInput> = async (data) => {
    const result = await processEmailInput(data);

    if (!result?.success) {
      let message = result?.error?.toString() ?? "Something went wrong";

      setError("email_address", {
        type: "manual",
        message,
      });
      toast.error(message);
      return;
    }

    toast.success("Success!");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      {!isSubmitSuccessful ? (
        <>
          {defaultMessage}
          <form
            className="flex flex-col gap-8 w-full"
            onSubmit={handleSubmit(processForm)}
          >
            <input
              {...register("email_address", {
                required: true,
              })}
              placeholder="Enter your email"
              className="placeholder:text-md placeholder:text-center text-xl font-fg w-full border border-primary-dark rounded-lg px-8 py-4 text-primary-dark"
            />
            {errors.email_address && (
              <span className="text-red-400">
                {errors.email_address.message}
              </span>
            )}
            <PrimaryButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Notify me"}
            </PrimaryButton>
          </form>
        </>
      ) : (
        <>{successMessage}</>
      )}
    </div>
  );
};
