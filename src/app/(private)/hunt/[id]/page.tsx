import { getHuntById } from "@/features/hunt/getById";
import HuntView from "@/ui/pages/hunt/oneHunt";
import { redirect } from "next/navigation";

const HuntPage = async ({ params }: { params: { id: string } }) => {
  const hunt = await getHuntById(params.id);

  if (!hunt) {
    redirect("/");
  }

  return <HuntView hunt={hunt} />;
};

export default HuntPage;
