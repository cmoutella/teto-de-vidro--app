import { ReactNode } from "react";
import PrivateNavbar from "@/ui/components/navbar/privateNavbar";
import PannelMenu from "@/ui/components/pannelMenu";

const PrivateBasePage = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full min-h-full">
      <PrivateNavbar />
      <div className="w-full min-h-full grid grid-cols-1 md:grid-cols-12 gap-x-0">
        <div className="md:col-span-3 h-full">
          <PannelMenu />
        </div>
        <div className="md:col-span-9 h-full">{children}</div>
      </div>
    </div>
  );
};

export default PrivateBasePage;
