"use client";

import { useSessionContext } from "@/providers/AuthProvider";
import { genderVowel } from "@/utils/lang";

import PrivateBasePage from "@/ui/template/PrivateBasePage";
import NextMoveDashboard from "../components/NextMove";

const PrivateHomeView = () => {
  const { user } = useSessionContext();

  const firstName = user?.name.split(" ")[0];

  return (
    <PrivateBasePage>
      <div className="w-full flex justify-center flex-col items-center px-14 py-10 gap-3">
        {user && (
          <div className="container py-2">
            <h2 className="text-2xl text-brand-primary-900">
              Bem vind{genderVowel[user.gender]}{" "}
              <span className="capitalize">{firstName},</span>
            </h2>
          </div>
        )}
        <div className="container">
          <NextMoveDashboard />
        </div>
      </div>
    </PrivateBasePage>
  );
};

export default PrivateHomeView;
