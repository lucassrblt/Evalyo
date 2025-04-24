import { ReactNode } from "react";

const ShareLayout = ({ children }: { children: ReactNode }) => {
  return <div className="bg-slate-950 w-screen h-screen">{children}</div>;
};

export default ShareLayout;
