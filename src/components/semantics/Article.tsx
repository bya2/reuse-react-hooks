import { IProps } from "@/misc/interfaces";

function Article({ children }: IProps) {
  return (
    <article>
      <>{children}</>
    </article>
  );
}

export default Article;
