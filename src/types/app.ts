export interface InterfaceUser {
  id?: string;
  nickName: string;
  name: string;
  password: string;
  profession?: string;
  gender: "male" | "female" | "neutral";
  birthDate: string;
  email: string;
}

export type SUN_LIGHT = "morning" | "afternoon" | "none";

export interface InterfaceProperty {
  id?: string;
  mainAddressId: string;
  block?: string;
  propertyNumber: string;
  size?: number;
  rooms?: number;
  bathrooms?: number;
  parking?: number;
  is_front?: boolean;
  sun?: SUN_LIGHT;
  condoPricing?: number;
  propertyConvenience: string[];
}

type PropertyDataProps = Omit<InterfaceProperty, "id">;

export interface InterfaceLot {
  id?: string;
  name?: string;
  street: string;
  lotNumber: string;
  postalCode?: string;
  neighborhood?: string;
  city: string;
  province: string;
  country: string;
  lotConvenience?: string[];
}

type LotDataProps = Omit<InterfaceLot, "id">;

export interface InterfaceAddress extends PropertyDataProps, LotDataProps {}

export type CONTRACT_TYPE = "buy" | "rent" | "either";

export interface InterfaceHunt {
  id?: string;
  creatorId: string;
  invitedUsers?: string[];
  title?: string;
  type: CONTRACT_TYPE;
  movingExpected?: string;
  isActive?: boolean;
  livingPeople?: number;
  livingPets?: number;
  targets: string[];
}
