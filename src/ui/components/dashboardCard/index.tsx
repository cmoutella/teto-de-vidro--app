import { ReactNode } from "react";

export interface DashboardCardProps {
  children: ReactNode;
}

const DashboardCard = ({ children }: DashboardCardProps) => {
  return (
    <div className="shadow-sm bg-white shadow-brand-primary-800 border border-1 border-brand-primary-400 px-6 py-5 w-full rounded-xl">
      {children}
    </div>
  );
};

export default DashboardCard;
