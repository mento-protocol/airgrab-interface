import React from "react";

/**
 * useDelay - A custom hook to simulate a delay.
 * @param {number} duration - Duration of the delay in milliseconds.
 * @return {boolean} - A boolean indicating whether delay is ongoign.
 */
export const useDelay = (duration = 1000) => {
  const [delayed, setDelayed] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDelayed(false);
    }, duration);

    return () => clearTimeout(timer); // Clean up the timer when the component is unmounted
  }, [duration]);

  return delayed;
};
