import { SuccessResponse } from "@/types/apiPatterns";
import { InterfaceHunt } from "@/types/app";

export interface GetHuntRequestProps {
  huntId: string;
}

export const createHunt: (
  huntId: GetHuntRequestProps
) => Promise<InterfaceHunt | undefined> = async (huntId) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseUrl) return undefined;

  try {
    const auth = await fetch(`${baseUrl}/hunt/${huntId}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    if (auth.error) {
      throw Error("Não foi possível ");
    }

    const { data } = auth as SuccessResponse<InterfaceHunt>;

    return data;
  } catch (err) {
    // TODO: toast
    return undefined;
  }
};
