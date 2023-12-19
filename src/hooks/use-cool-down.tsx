import { useState, useEffect } from "react";

export function useCooldown(errorFlag: boolean, cooldownTime: number) {
  const [isCoolingDown, setIsCoolingdown] = useState(false);
  const [timeLeft, setTimeLeft] = useState(cooldownTime / 1000);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (errorFlag) {
      setIsCoolingdown(true);
      timerId = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
      setTimeout(() => {
        setIsCoolingdown(false);
        setTimeLeft(cooldownTime / 1000);
        clearInterval(timerId);
      }, cooldownTime);
    }
    return () => clearInterval(timerId); // cleanup on unmount
  }, [errorFlag, cooldownTime]);

  return { isCoolingDown, timeLeft };
}
