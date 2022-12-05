import PopUp from "./PopUp";
import ShadowOuter from "./ShadowOuter";
import CloseButton from "./Button";
import { on, stopPropagation } from "@/misc/utils";
import type { IProps } from "@/misc/interfaces";

interface IModalProps extends IProps {
  condition: boolean;
  closeFn: () => void;
  containerId?: string;
}

export default function Modal({ children, condition, closeFn }: IModalProps) {
  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    on(window, "mouseup", closeFn, { once: true });
  };

  return (
    <PopUp condition={condition}>
      <ShadowOuter className="outer" onMouseDown={closeModal}>
        <div className="inner paper" onMouseDown={stopPropagation}>
          <CloseButton behavior={closeFn} />
          <>{children}</>
        </div>
      </ShadowOuter>
    </PopUp>
  );
}

/*
- Modal:
PopUp
  ShadowOuter
    Paper
      Contents
      CloseButton(top-right)
*/
