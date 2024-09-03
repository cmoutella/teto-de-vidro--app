import PublicNavbar from "@/ui/components/navbar/publicNavbar";
import { ReactNode } from "react";

const PublicBasePage = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full min-h-full">
      <PublicNavbar />
      {children}
    </div>
  );
};

export default PublicBasePage;
