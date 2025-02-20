export type FormSizes = "md" | "lg";
export type FormTheme = "light" | "dark" | "nude";
export type InputFieldParts = "wrapper" | "input" | "label" | "helpText";

export const iSizes: { [key in FormSizes]: string } = {
  md: "py-1.5 px-3 rounded-lg",
  lg: "py-2 px-4 rounded-lg",
};

export const formTheme: {
  [key in FormTheme]: { [key in InputFieldParts]: string };
} = {
  light: {
    wrapper: "border border-1 border-brand-primary-700 bg-white bg-opacity-80",
    input: "text-brand-gray-700 text-sm",
    label: "text-sm font-bold text-brand-primary-600",
    helpText: "text-xs text-brand-gray-700",
  },
  dark: {
    wrapper:
      "border border-1 border-brand-primary-700 bg-brand-gray-800 bg-opacity-80",
    input: "text-white text-sm",
    label: "text-sm font-bold text-white",
    helpText: "text-xs text-white",
  },
  nude: {
    wrapper: "border-none bg-white bg-opacity-80",
    input: "text-brand-gray-700 text-sm",
    label: "text-sm font-bold text-brand-gray-700",
    helpText: "text-xs text-brand-gray-700",
  },
};

export const baseInputStyle = "block w-full border-none bg-transparent";
