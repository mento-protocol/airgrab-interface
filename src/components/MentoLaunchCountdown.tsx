import { LAUNCH_DATE } from "@/lib/constants";
import { NotificationEmailForm } from "./NotificationEmailForm";

const countDownDate = LAUNCH_DATE.getTime();
const now = new Date().getTime();
const distance = countDownDate - now;

const days = Math.floor(distance / (1000 * 60 * 60 * 24));
const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

export const MentoLaunchCountodwn = ({
  allocation,
  shortAddress,
}: {
  allocation: string;
  shortAddress: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 text-center">
      <h3 className="font-fg font-medium text-sm sm:text-base text-center flex flex-col gap-8">
        <span>
          Congratulations, wallet address{" "}
          <span className="text-primary-blue">{shortAddress}</span> is elligible
          to receive
        </span>
        <span className="text-base sm:text-2xl">{allocation} MENTO</span>
      </h3>
      <NotificationEmailForm days={days} hours={hours} />
    </div>
  );
};
