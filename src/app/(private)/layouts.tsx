import { ReactNode } from "react";
import PrivateBasePage from "@/ui/template/PrivateBasePage";

const PrivateLayout = ({ children }: { children: ReactNode }) => {
  return <PrivateBasePage>{children}</PrivateBasePage>;
};

export default PrivateLayout;
