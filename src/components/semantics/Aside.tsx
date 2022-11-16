import { IProps } from "@/misc/interfaces";

function Aside({ children }: IProps) {
  return (
    <aside>
      <>{children}</>
    </aside>
  );
}

export default Aside;
