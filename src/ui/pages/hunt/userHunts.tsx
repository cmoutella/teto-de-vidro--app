"use client";
import { getUserHunts } from "@/features/hunt/getUserHunts";
import { useSessionContext } from "@/providers/AuthProvider";
import { InterfaceHunt } from "@/types/app";
import { useEffect, useState } from "react";

const UserHuntsView = () => {
  const [hunts, setHunts] = useState<InterfaceHunt[]>([]);
  const { user } = useSessionContext();

  const getHunts = async () => {
    if (!user) return;

    const hunts = await getUserHunts({ userId: user.id });

    console.log(hunts);

    setHunts(hunts ?? []);
  };

  useEffect(() => {
    getHunts();
  }, []);

  return (
    <div className="w-full flex justify-center flex-col items-center px-14 py-10 gap-3">
      <div className="container px-20 mb-10">Minhas buscas por um lar</div>

      <div>
        {hunts.map((hunt) => {
          return (
            <div
              className="px-4 py-5 border border-brand-primary-500"
              key={hunt.id}
            >
              <span className="text-xl text-brand-primary-700">
                {hunt.title ?? `#${hunt.id}`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserHuntsView;
