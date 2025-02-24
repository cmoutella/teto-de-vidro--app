import { InterfaceUser } from "./app";

export interface UserAuth {
  token: string;
  expireAt: string;
  user: Omit<InterfaceUser, "password">;
}
