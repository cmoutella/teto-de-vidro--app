import { appCokies } from "@/config/cookies";
import { cookie } from "@/services/cookies";
import { UserAuth } from "@/types/apiResponses";
import PrivateHomeView from "@/ui/pages/home/privateHome";
import PublicHomeView from "@/ui/pages/home/publicHome";
import { isTokenValid } from "@/utils/auth";
import { cookies } from "next/headers";

export default async function Home() {
  const reqCookies = await cookies();

  const cookieService = cookie();
  const authCookie = cookieService.server.get(appCokies.auth, reqCookies);

  if (!authCookie) {
    return <PublicHomeView />;
  }

  const data: UserAuth = JSON.parse(authCookie.value);

  const authValid = isTokenValid(data.expireAt);

  if (!authValid) {
    return <PublicHomeView />;
  }

  return <PrivateHomeView />;
}
