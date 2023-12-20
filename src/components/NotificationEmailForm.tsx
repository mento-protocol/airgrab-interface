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
  days,
  hours,
}: {
  days: number;
  hours: number;
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

    if (!result) {
      toast.error("Something went wrong");
      setError("email_address", {
        type: "manual",
        message: "Something went wrong",
      });
      return;
    }

    if (result.success) {
      toast.success("Success!");
      return;
    }

    if (result.error) {
      toast.error(result.error.toString());
      setError("email_address", {
        type: "manual",
        message: "Something went wrong",
      });
    }
  };

  return (
    <>
      <p className="text-center max-w-[500px] text-xl font-fg">
        Tokens will be available in{" "}
        <span className="block md:inline-block">
          {" "}
          <span className="font-bold">{days}</span> days{" "}
          {hours > 0 ? (
            <>
              {" "}
              <span className="font-bold">{hours}</span> hours
            </>
          ) : null}
          .{" "}
        </span>
        {!isSubmitSuccessful ? (
          <span className="block md:inline-block">
            Complete the form to be notified when tokens are available to be
            claimed
          </span>
        ) : (
          <span>
            You will be notified when tokens are available to be claimed.
          </span>
        )}
      </p>
      {!isSubmitSuccessful ? (
        <form
          className="flex flex-col gap-8 w-full"
          onSubmit={handleSubmit(processForm)}
        >
          {" "}
          <input
            {...register("email_address", {
              required: true,
            })}
            placeholder="Enter your email"
            className="placeholder:text-md placeholder:text-center text-xl font-fg w-full border border-primary-dark rounded-lg px-8 py-4 text-primary-dark"
          />
          {errors.email_address && (
            <span className="text-red-400">{errors.email_address.message}</span>
          )}
          <PrimaryButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Notify me"}
          </PrimaryButton>
        </form>
      ) : null}
    </>
  );
};
