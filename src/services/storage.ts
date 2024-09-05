import { authCookie, authCookieOptions } from "@/config/auth";
import { UserAuth } from "@/types/apiResponses";
import { setCookie, getCookie, deleteCookie } from "cookies-next";

export const getToken: () => UserAuth = () => {
  const app = getCookie(authCookie.api);

  if (app) {
    return JSON.parse(app);
  }

  return undefined;
};

export const setToken = (payload: UserAuth) => {
  setCookie(authCookie.api, JSON.stringify(payload), authCookieOptions);
};

export const clearToken = () => {
  deleteCookie(authCookie.api);
};

export const hasToken = () => {
  const authCookie = getToken();
  if (!authCookie) return false;

  const app = authCookie.token;

  return !!app;
};

const storage = {
  getToken,
  setToken,
  clearToken,
  hasToken,
};

export default storage;
