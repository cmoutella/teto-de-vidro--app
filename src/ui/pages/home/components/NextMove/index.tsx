import Button from "@/ui/components/base/Button";
import DashboardCard from "@/ui/components/DashboardCard";
import { useRouter } from "next/navigation";
import cx from "classnames";

const NextMoveDashboard = () => {
  const router = useRouter();

  return (
    <DashboardCard>
      <div
        className={cx(
          "w-full flex flex-col justify-center items-center gap-4 gap-y-5",
          {
            "py-3 px-4": true,
            "py-4 px-4": false,
          }
        )}
      >
        <p className="text-xl text-brand-primary-600 font-medium">
          Você ainda não está de olho em nenhum imóvel
        </p>
        {/*  imagem aqui */}
        <Button
          label="Começar agora!"
          size="large"
          className={cx(
            "bg-brand-primary-700 text-white hover:bg-brand-primary-800"
          )}
          onClick={() => router.push("/hunt/criar")}
        />
      </div>
    </DashboardCard>
  );
};

export default NextMoveDashboard;
