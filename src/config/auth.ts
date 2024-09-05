import type { OptionsType } from "cookies-next/lib/types";

export const authCookie = {
  api: "@tBlog:token",
};

export const authCookieOptions: OptionsType = {
  maxAge: 15 * 60 * 15,
  sameSite: "strict",
  httpOnly: false,
};
