import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        brand: {
          primary: {
            "000": "#FAFFFF",
            "100": "#F2FFFE",
            "200": "#D8F2F0",
            "300": "#ACD9D6",
            "400": "#84BFBB",
            "500": "#62A6A1",
            "600": "#2D736E",
            "700": "#2D736E",
            "800": "#1A5955",
            "900": "#0C403C",
          },
          gray: {
            "000": "#EDF2F2",
            "100": "#D2D9D9",
            "200": "#B0BFBF",
            "300": "#98B2B2",
            "400": "#8DA6A6",
            "500": "#7A9999",
            "600": "#708B8C",
            "700": "#5C7273",
            "800": "#435859",
            "900": "#303F40",
            "1000": "#1B2626",
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
