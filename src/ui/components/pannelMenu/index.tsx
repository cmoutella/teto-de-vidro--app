import { useRouter } from "next/navigation";
import Button from "../button";

const PannelMenu = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5 items-center h-full w-full px-4 py-10 bg-brand-primary-300">
      <Button
        uiType="raw"
        theme="dark"
        label="Minhas buscas"
        onClick={() => router.push("/hunt")}
      />
    </div>
  );
};

export default PannelMenu;
