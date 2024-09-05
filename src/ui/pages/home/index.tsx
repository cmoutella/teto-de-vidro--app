"use client";

import { useSessionContext } from "@/providers/AuthProvider";
import PublicHomeView from "./publicHome";
import PrivateHomeView from "./privateHome";

const HomeView = () => {
  const { user } = useSessionContext();

  return (
    <div className="w-full h-full">
      {!user && <PublicHomeView />}

      {user && <PrivateHomeView />}
    </div>
  );
};

export default HomeView;
