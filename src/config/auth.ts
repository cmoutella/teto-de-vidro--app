import type { OptionsType } from "cookies-next/lib/types";

export const authCookie = {
  api: "@tetoDeVidro:token",
};

export const authCookieOptions: OptionsType = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "strict",
  httpOnly: false,
};
