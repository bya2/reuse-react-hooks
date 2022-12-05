import { off, on } from "@/misc/utils";

interface IProps {
  behavior: (e: MouseEvent) => void;
}

export default function Resizer({ behavior }: IProps): JSX.Element {
  return (
    <div
      className="resizer"
      onMouseDown={(e) => {
        e.stopPropagation();
        on(window, "mousemove", behavior);
      }}
    />
  );
}

export const behavior = (e: MouseEvent) => {
  if (e.clientX < 80) {
    // redux dispatch
  } else if (e.clientX < 160) {
    // redux dispatch
  } else {
    // redux dispatch
  }
  on(window, "mouseup", () => off(window, "mousemove", behavior), { once: true });
};
