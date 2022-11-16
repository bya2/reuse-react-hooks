import { IProps } from "@/misc/interfaces";

function Header({ children }: IProps) {
  return (
    <header>
      <>{children}</>
    </header>
  );
}

export default Header;
