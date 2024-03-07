"use client";
import React from "react";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/button";
import { processEmailInput } from "@/lib/actions";

type LaunchNotificationInput = {
  email_address: string;
};

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
  } = useForm<LaunchNotificationInput>();

  const processForm: SubmitHandler<LaunchNotificationInput> = async (data) => {
    const result = await processEmailInput(data);
    let error;

    switch (result.type) {
      case "Success":
        return;
      case "ValidationError":
        error = result?.error?.message ?? error;
        break;
      case "APIError":
        if (result.error.type === "MailchimpAPIMemberExists") {
          // Handle specific API error subtype without setting an error message
          return;
        }
        error = result.error.message ?? error;
        break;
      default:
        error = "Unkonwn";
        break;
    }

    const message = `An error occurred adding the email to the notification list. Please try again, if the problem persists contact the team. Error: ${error}`;
    setError("email_address", {
      type: "manual",
      message,
    });
    toast.error(message);
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
                required: "required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid email addresss",
                },
              })}
              placeholder="Enter your email"
              className="placeholder:text-md text-center text-xl font-fg w-full border border-primary-dark rounded-lg px-8 py-4 text-primary-dark"
            />
            {errors.email_address && (
              <span className="text-red-400">
                {errors.email_address.message}
              </span>
            )}
            <Button color="blue" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Notify me"}
            </Button>
          </form>
        </>
      ) : (
        <>{successMessage}</>
      )}
    </div>
  );
};
