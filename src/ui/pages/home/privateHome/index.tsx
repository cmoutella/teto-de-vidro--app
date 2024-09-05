"use client";

import { useSessionContext } from "@/providers/AuthProvider";

const PrivateHomeView = () => {
  const { user } = useSessionContext();
  return <>Hello {user?.name}</>;
};

export default PrivateHomeView;
