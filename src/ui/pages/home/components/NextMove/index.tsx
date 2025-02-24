import Button from "@ui/base/Button";
import DashboardCard from "@ui/DashboardCard";
import { useRouter } from "next/navigation";
import cx from "classnames";
import { useEffect, useState } from "react";
import { getAllTargetPropertiesfromHunt } from "@api/hunt/getAllTargetProperties";
import { InterfaceHunt } from "@/types/app";

interface NextMoveDashboardProps {
  hunts: InterfaceHunt[];
}

const EmptyState = () => {
  const router = useRouter();

  return (
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
  );
};

const NextMoveDashboard = ({ hunts }: NextMoveDashboardProps) => {
  const [properties, setProperties] = useState<TargetPropertyInterface[]>([]);

  useEffect(() => {
    fetchPropertiesData();
  }, []);

  if (!hunts || properties.length <= 0) {
    return (
      <DashboardCard>
        <EmptyState />
      </DashboardCard>
    );
  }

  async function fetchPropertiesData() {
    if (!hunts || hunts.length <= 0) return;

    const data = await getAllTargetPropertiesfromHunt(hunts[0].id, 1, 6);

    setProperties(data as TargetPropertyInterface[]);
  }

  return (
    <DashboardCard>
      {properties.map((property) => (
        <div key={property.id}>{property.id}</div>
      ))}
    </DashboardCard>
  );
};

export default NextMoveDashboard;
