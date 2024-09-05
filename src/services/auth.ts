/* eslint-disable react-hooks/rules-of-hooks */

import { clearToken, getToken, setToken } from "@/services/storage";
import { isTokenValid } from "@/utils/auth";
import { InterfaceUser } from "@/types/app";
import { UserAuth } from "@/types/apiResponses";
import { getUserRequest } from "@/features/user/getUserRequest";

export interface UserResponse {
  appToken: string;
}

export async function getUserFn(): Promise<InterfaceUser | undefined> {
  const currAuth: UserAuth = getToken();
  if (!currAuth || !currAuth.userId) return undefined;

  const authIsValid = isTokenValid(currAuth.expireAt);

  if (!authIsValid) return undefined;

  const teacher = await getUserRequest(currAuth.userId, currAuth.token);

  return teacher;
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

  const user = (await getUserFn()) as InterfaceUser;

  return user;
}
