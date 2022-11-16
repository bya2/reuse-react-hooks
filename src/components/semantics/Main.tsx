import { IProps } from "@/misc/interfaces";

function Main({ children }: IProps) {
  return (
    <main>
      <>{children}</>
    </main>
  );
}

export default Main;
