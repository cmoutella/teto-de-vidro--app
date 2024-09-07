import { Gender } from "@/types/app";

export const genderVowel: { [key in Gender]: string } = {
  female: "a",
  male: "o",
  neutral: "e",
};
