import { createPortal } from "react-dom";
import type { IProps } from "@/misc/interfaces";

interface IPopUpProps extends IProps {
  condition: boolean;
  containerId?: string;
}

function PopUp({ children, condition, containerId = "modal" }: IPopUpProps): React.ReactPortal | null {
  const container = document.getElementById(containerId);
  return container && condition ? createPortal(children, container) : null;
}

export default PopUp;
