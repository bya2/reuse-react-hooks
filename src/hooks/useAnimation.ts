import useAnimationTimer from "./useAnimationTimer";

const easing = {
  linear: (n: number) => n,
  elastic: (n: number) => n * (33 * n * n * n * n - 106 * n * n * n + 126 * n * n - 67 * n + 15),
  inExpo: (n: number) => Math.pow(2, 10 * (n - 1)),
};

const useAnimation = (easingType: "linear" | "elastic" | "inExpo" = "linear", duration: number = 1000, delay: number = 0): number => {
  const elapsed = useAnimationTimer(duration, delay);
  const n = Math.min(1, elapsed / duration);
  return easing[easingType](n);
};

export default useAnimation;
