import { SuccessResponse } from "@/types/apiPatterns";
import { InterfaceHunt } from "@/types/app";

export interface GetUserHuntsRequestProps {
  userId: string;
}

export const getUserHunts: ({
  userId,
}: GetUserHuntsRequestProps) => Promise<InterfaceHunt[] | undefined> = async ({
  userId,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseUrl) return undefined;

  try {
    const auth = await fetch(`${baseUrl}/hunt/search/${userId}`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    if (auth.error) {
      throw Error(`Não foi possível encontrar as buscas do suário ${userId}`);
    }

    const { data } = auth as SuccessResponse<InterfaceHunt[]>;

    return data;
  } catch (err) {
    // TODO: toast
    return undefined;
  }
};
