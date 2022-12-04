import { IProps } from "@/misc/interfaces";
import { on } from "@/misc/utils";

interface IButtonProps extends IProps {
  behavior: () => void;
  image?: any;
  message?: string;
}

export default function Button({ behavior, image, message }: IButtonProps) {
  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    on(window, "mouseup", behavior, { once: true });
  };

  return (
    <div className="wrapper button">
      <button onMouseDown={handleMouseDown}>
        {image ? <></> : null}
        {message ? <span>{message}</span> : null}
      </button>
    </div>
  );
}

// const Wrapper = styled.div`
//   // location
//   position: absolute;
//   top: 0;
//   right: 0;
//   transform: translate(-30%, 30%);
//   transform-origin: center;

//   // size
//   width: 20px;
//   height: 30px;

//   // border
//   border-radius: 50%;
//   box-shadow: 0 0 0 1px hsla(0, 0%, 0%, 0.1);
// `;

// const buttonReset = css`
//   outline: none;
//   border: none;
// `;

// const Button = styled.button`
//   ${buttonReset};
//   position: absolute;
//   inset: 0;
//   background-color: transparent;
//   cursor: pointer;
// `;
