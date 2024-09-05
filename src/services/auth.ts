/* eslint-disable react-hooks/rules-of-hooks */

import { clearToken, getToken, setToken } from "@/services/storage";
import { isTokenValid } from "@/utils/auth";
import { SessionUser } from "@/types/app";
import { UserAuth } from "@/types/apiResponses";

export interface UserResponse {
  appToken: string;
}

export function getUserFn(): SessionUser {
  const currAuth: UserAuth = getToken();
  if (!currAuth || !currAuth.user) return undefined;

  const authIsValid = isTokenValid(currAuth.expireAt);

  if (authIsValid) return currAuth.user;

  clearToken();
  return undefined;
}

export async function handleUserResponse(loginAuth?: UserAuth) {
  const currAuth: UserAuth = getToken();

  const auth: UserAuth = loginAuth ?? currAuth;

  if (!auth) {
    clearToken();
    throw new Error("Não foi possivel confirmar suas credenciais");
  }
  const authIsValid = isTokenValid(auth.expireAt);

  if (!authIsValid) {
    clearToken();
    throw new Error("Não foi possivel confirmar suas credenciais");
  }

  setToken(auth);

  return auth.user;
}
