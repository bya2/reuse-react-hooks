import { useEffect, useState } from "react";

const useAnimationTimer = (duration: number = 1000, delay: number = 0): number => {
  const [elapsed, setTime] = useState(0);

  useEffect(() => {
    let animationFrame: number, timerStop: NodeJS.Timeout, start: number;

    const onFrame = () => {
      setTime(Date.now() - start);
      loop();
    };

    const loop = () => {
      animationFrame = requestAnimationFrame(onFrame);
    };

    const onStart = () => {
      timerStop = setTimeout(() => {
        cancelAnimationFrame(animationFrame);
        setTime(Date.now() - start);
      }, duration);
    };

    start = Date.now();
    loop();

    const timerDelay = setTimeout(onStart, delay);

    return () => {
      clearTimeout(timerStop);
      clearTimeout(timerDelay);
      cancelAnimationFrame(animationFrame);
    };
  }, [duration, delay]);

  return elapsed;
};

export default useAnimationTimer;
