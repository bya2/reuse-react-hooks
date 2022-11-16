import { IProps } from "@/misc/interfaces";

function Section({ children }: IProps) {
  return (
    <section>
      <>{children}</>
    </section>
  );
}

export default Section;
