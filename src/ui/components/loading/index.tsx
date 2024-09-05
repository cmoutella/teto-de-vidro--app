import React from "react";

import cx from "classnames";

import { useUIContext } from "@/providers/UIProvider";

export const Loading = () => {
  const { loading } = useUIContext();

  return (
    <div
      className={cx(
        loading.state
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
        " fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-gray-900 bg-opacity-75 transition-opacity duration-300 ease-in"
      )}
    >
      <span className="loading loading-spinner z-20 w-20"></span>
      <div role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
