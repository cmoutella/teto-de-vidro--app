"use client";
import { createContext, useContext } from "react";

import { UIProvider } from "./UIProvider";
import { SessionProvider } from "./AuthProvider";

interface AllContext {}

const AllContext = createContext<AllContext>({});

export const useAllContext = () => {
  const context = useContext(AllContext);

  if (context === undefined) {
    throw new Error("Missing AllContext on React three");
  }

  return context;
};

export const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AllContext.Provider value={{}}>
      <UIProvider>
        <SessionProvider>{children}</SessionProvider>
      </UIProvider>
    </AllContext.Provider>
  );
};
