"use client";
import { createContext, useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { hash } from "bcryptjs";

import { SessionUser } from "@/types/app";
import { UserAuth } from "@/types/apiResponses";
import storage from "@/services/storage";
import { getUserFn, handleUserResponse } from "@/services/auth";
import { authLogin } from "@/features/auth/login";

interface SessionContext {
  user?: SessionUser;
  isLogged: boolean;
  authenticate: (token: UserAuth) => void;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const DEFAULT_VALUES = {
  user: getUserFn(),
  isLogged: storage.hasToken(),
  login: (u: string, p: string) => {},
  logout: () => {},
  authenticate: () => {},
};

const SessionContext = createContext<SessionContext>(DEFAULT_VALUES);

export const useSessionContext = () => {
  const context = useContext(SessionContext);

  if (context === undefined) {
    throw new Error("Missing SessionContext on React three");
  }

  return context;
};

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<SessionUser>(DEFAULT_VALUES.user);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    // const hashedPassword = await hash(password, 8);
    const auth = await authLogin(email, password);

    if (!auth) return;

    await handleUserResponse(auth).then((res) => {
      setUser(res);
      router.push("/");
    });
  };

  const logout = () => {
    setUser(undefined);
    storage.clearToken();
  };

  const authenticate = () => {
    if (user) return;

    handleUserResponse()
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        // showToast({
        //   type: "error",
        //   message: "Não foi possivel realizar o login tente mais tarde",
        // });
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      });
  };

  // TODO: esse nao ta rolando, pq?
  const isLogged = useMemo(
    () => user !== undefined && storage.hasToken(),
    [user]
  );

  const value = {
    user,
    isLogged,
    login,
    logout,
    authenticate,
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
