"use client";
import { getAllLotsByAddress } from "@/features/lot";
import { InterfaceLot } from "@/types/app";
import Button from "@/ui/components/button";
import { useState } from "react";

const HomeView = () => {
  const [lots, setLots] = useState<InterfaceLot[]>();

  async function getLots() {
    try {
      const data = await getAllLotsByAddress({
        street: "Rua Guaxupé",
        city: "Rio de Janeiro",
        province: "RJ",
        country: "Brazil",
      });

      console.log(data);

      setLots(data);
    } catch {
      console.log("error");
    }
  }

  return (
    <div className="w-full p-20 flex justify-center items-center">
      <div className="container flex flex-col gap-5">
        <h1>Home</h1>

        <div>
          <Button label="Fetch!" theme="secondary" onClick={getLots} />
        </div>

        <div className="border border-1 border-black min-h-5 p-2">
          {lots?.map((lot) => {
            return (
              <div key={lot.id}>
                <p>{lot.street}</p>
                <p>{lot.lotNumber}</p>
                <p>{lot.city}</p>
                <p>{lot.province}</p>
                <p>{lot.country}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeView;
