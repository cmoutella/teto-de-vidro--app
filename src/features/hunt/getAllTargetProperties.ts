import { SuccessResponse } from "@/types/apiPatterns";

export const getAllTargetPropertiesfromHunt: (
  huntId: string,
  page: number,
  perPage: number
) => Promise<TargetPropertyInterface[] | undefined> = async (
  huntId,
  page,
  perPage
) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseUrl) return undefined;

  try {
    const res = await fetch(
      `${baseUrl}/target-property/search/${huntId}?page=${page}&limit=${perPage}`,
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

    const { data } = res as SuccessResponse<TargetPropertyInterface[]>;

    return data;
  } catch (err) {
    // TODO: toast
    return undefined;
  }
};
