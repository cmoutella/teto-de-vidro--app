import { ReactNode } from "react";
import PrivateNavbar from "@/ui/components/navbar/privateNavbar";

const PrivateBasePage = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full min-h-full">
      <PrivateNavbar />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default PrivateBasePage;
