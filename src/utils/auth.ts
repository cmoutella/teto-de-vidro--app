import { isBefore } from "date-fns";

export const isTokenValid = (expiration: string) => {
  const authExpiration = new Date(expiration);
  const now = new Date();

  const authIsValid = authExpiration && isBefore(now, authExpiration);

  return authIsValid;
};
