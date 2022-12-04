import PopUp from "./PopUp";

const distance = 10;

interface IProps {
  hovered: boolean;
  message: string;
  coordinate: { x: number; y: number };
}

export default function Tooltip({ hovered, message, coordinate }: IProps) {
  return (
    <PopUp condition={hovered}>
      <div
        className="wrapper tooltip"
        style={{
          left: `${coordinate.x + distance}px`,
          top: `${coordinate.y + distance}px`,
        }}
      >
        <span>{message}</span>
      </div>
    </PopUp>
  );
}
