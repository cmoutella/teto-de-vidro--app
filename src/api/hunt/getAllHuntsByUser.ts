import { SuccessResponse } from "@/types/apiPatterns";
import { InterfaceHunt } from "@/types/app";

export const getAllHuntsByUser: (
  userId: string,
  page: number,
  perPage: number
) => Promise<InterfaceHunt[] | undefined> = async (userId, page, perPage) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseUrl) return undefined;

  try {
    const res = await fetch(
      `${baseUrl}/hunt/search/${userId}?page=${page}&limit=${perPage}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());

    if (res.error) {
      throw Error("Não foi possível encontrar a informação solicitada");
    }

    const { data } = res as SuccessResponse<InterfaceHunt[]>;

    return data;
  } catch (err) {
    // TODO: toast
    return undefined;
  }
};
