import { IProps } from "@/misc/interfaces";

function Footer({ children }: IProps) {
  return (
    <footer>
      <>{children}</>
    </footer>
  );
}

export default Footer;
