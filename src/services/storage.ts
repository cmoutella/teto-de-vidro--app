import { authCookie } from "@/config/auth";
import { UserAuth } from "@/types/apiResponses";
import { cookie } from "./cookies";

function storage() {
  const cookies = cookie();

  const getToken: () => UserAuth = () => {
    const app = cookies.get(authCookie.api);

    if (app) {
      return JSON.parse(app);
    }

    return undefined;
  };

  const setToken = (payload: UserAuth) => {
    cookies.set(
      authCookie.api,
      JSON.stringify(payload),
      new Date(payload.expireAt)
    );
  };

  const clearToken = () => {
    cookies.remove(authCookie.api);
  };

  const hasToken = () => {
    const authCookie = getToken();
    if (!authCookie) return false;

    const app = authCookie.token;

    return !!app;
  };

  return {
    getToken,
    setToken,
    clearToken,
    hasToken,
  };
}

export default storage;
