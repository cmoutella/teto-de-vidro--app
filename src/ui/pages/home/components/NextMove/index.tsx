import Button from "@/ui/components/button";
import DashboardCard from "@/ui/components/dashboardCard";
import { useRouter } from "next/navigation";

const NextMoveDashboard = () => {
  const router = useRouter();

  return (
    <DashboardCard>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <p>Você ainda não começou a buscar um lugar para morar</p>
        <Button
          label="Começar agora!"
          onClick={() => router.push("/hunt/criar")}
        />
      </div>
    </DashboardCard>
  );
};

export default NextMoveDashboard;
