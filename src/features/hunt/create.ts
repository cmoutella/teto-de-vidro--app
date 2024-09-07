import { SuccessResponse } from "@/types/apiPatterns";
import { InterfaceHunt } from "@/types/app";

export interface CreateHuntRequestProps
  extends Omit<InterfaceHunt, "id" | "targets" | "isActive"> {}

export const createHunt: (
  bodyData: CreateHuntRequestProps
) => Promise<InterfaceHunt | undefined> = async (bodyData) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseUrl) return undefined;

  try {
    const res = await fetch(`${baseUrl}/hunt`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    }).then((res) => res.json());

    if (res.error) {
      throw Error("Não foi possível criar agora, tente novamente mais tarde");
    }

    const { data } = res as SuccessResponse<InterfaceHunt>;

    return data;
  } catch (err) {
    // TODO: toast
    return undefined;
  }
};
