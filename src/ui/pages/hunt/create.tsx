"use client";

import { useRouter } from "next/navigation";

import PrivateBasePage from "@template/PrivateBasePage";
import CreateHuntForm from "@/ui/forms/Hunt/CreateHunt";

const CreateHuntView = () => {
  const router = useRouter();

  const handleSuccess = async (id: string) => {
    router.push(`/hunt/${id}`);
  };

  return (
    <PrivateBasePage>
      <div className="w-full flex justify-center flex-col items-center px-14 py-10 gap-3">
        <div className="container px-20 mb-10">
          <h1 className="text-3xl text-brand-primary-800 font-semibold">
            Nova mudança
          </h1>
        </div>
        <div className="container px-20">
          <CreateHuntForm
            onSuccess={(createdId: string) => handleSuccess(createdId)}
            onFail={() => {}}
          />
        </div>
      </div>
    </PrivateBasePage>
  );
};

export default CreateHuntView;
