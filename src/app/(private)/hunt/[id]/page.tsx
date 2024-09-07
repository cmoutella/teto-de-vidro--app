import HuntView from "@/ui/pages/hunt/oneHunt";

const HuntPage = ({ params }: { params: { id: string } }) => {
  return <HuntView id={params.id} />;
};

export default HuntPage;
