import { SuccessResponse } from "@/types/apiPatterns";
import { InterfaceLot } from "@/types/app";

export type GetLotsByAddressProps = {
  street: string;
  city: string;
  neighborhood?: string;
  province: string;
  country: string;
  lotName?: string;
  lotNumber?: string;
  postalCode?: string;
};

export const getAllLotsByAddress: (
  requestBody: GetLotsByAddressProps
) => Promise<InterfaceLot[]> = async (requestBody) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseUrl) return [];

  const fetchUrl = `${baseUrl}/address/lots`;

  const mockRequestData = {
    street: "Rua Guaxupé",
    city: "Rio de Janeiro",
    province: "RJ",
    country: "Brazil",
  };

  const requestData = requestBody ?? mockRequestData;

  try {
    const res = await fetch(fetchUrl, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    }).then((res) => res.json());

    if (res.error) {
      throw Error("Não foi possivel buscar agora");
    }

    const { data } = res as SuccessResponse<InterfaceLot[]>;

    return data;
  } catch (err) {
    return [];
  }
};
