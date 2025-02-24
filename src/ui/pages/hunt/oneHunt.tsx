"use client";

import { getAllTargetPropertiesfromHunt } from "@api/hunt/getAllTargetProperties";
import { InterfaceHunt } from "@/types/app";
import Button from "@ui/base/Button";
import TargetPropertyList from "@ui/TargetPropertyList";
import PrivateBasePage from "@template/PrivateBasePage";
import { useEffect, useState } from "react";
import { DEFAULT_HUNT_LIST_PER_PAGE } from "./consts/perPage";

interface HuntViewProps {
  hunt: InterfaceHunt;
}

const OneHuntView = ({ hunt }: HuntViewProps) => {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(DEFAULT_HUNT_LIST_PER_PAGE);
  const [properties, setProperties] = useState<TargetPropertyInterface[]>([]);

  useEffect(() => {
    fetchPropertiesData();
  }, []);

  const fetchPropertiesData = async () => {
    const data = await getAllTargetPropertiesfromHunt(hunt.id, page, perPage);

    if (!data || data.length <= 0) {
      // TODO: tooltip de feedback
      setTotalPages(0);
    }

    setProperties(data as TargetPropertyInterface[]);
  };

  return (
    <PrivateBasePage>
      <div className="w-full flex justify-center flex-col items-center px-14 py-10 gap-3">
        {/* HEADER */}
        <div className="w-full flex justify-center">
          <div className="container">
            <div className="flex flex-row items-start w-full justify-between">
              <div className="flex flex-col gap-y-1.5 justify-start items-start">
                <div className="flex flex-row items-center justify-start gap-x-2">
                  <h3 className="text-2xl font-medium text-brand-primary-900">
                    # {hunt.title}
                  </h3>
                  {/* icone clicável */}
                </div>
                {hunt.invitedUsers && hunt.invitedUsers?.length >= 1 && (
                  <div>Com Fulana e fulana</div>
                )}
              </div>
              <Button
                label="Adicionar imóvel"
                className={
                  "bg-brand-primary-500 hover:bg-brand-primary-600 text-white"
                }
              />
            </div>
          </div>
        </div>
        <TargetPropertyList
          list={properties}
          page={page}
          totalPages={totalPages}
          perPage={8}
        />
      </div>
    </PrivateBasePage>
  );
};

export default OneHuntView;
