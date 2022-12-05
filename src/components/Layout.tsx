import { Outlet } from "react-router-dom";
import { IProps } from "@/misc/interfaces";

export default function Layout({ children }: IProps) {
  return (
    <div className="layout">
      <nav>
        <>{children}</>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
