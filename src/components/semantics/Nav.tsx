import { IProps } from "@/misc/interfaces";

function Nav({ children }: IProps) {
  return (
    <nav>
      <>{children}</>
    </nav>
  );
}

export default Nav;
