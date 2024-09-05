export type ButtonType = "default" | "outline" | "ghost" | "raw";
export type ButtonTheme =
  | "default"
  | "primary"
  | "secondary"
  | "dark"
  | "shade"
  | "white"
  | "custom";
export type ButtonSize = "xsmall" | "small" | "medium" | "large" | "xlarge";
export type ButtonRadius = "none" | "sm" | "md" | "lg" | "xl";

export const btnSize: { [key in ButtonSize]: string } = {
  xsmall: "py-0.5 px-1 max-h-7 text-sm",
  small: "py-1 px-1 max-h-7 text-sm",
  medium: "py-1.5 px-2 max-h-8 text-sm",
  large: "py-2 px-3.5 max-h-9",
  xlarge: "py-3 px-4 max-h-10",
};

export const btnBorderRadius: { [key in ButtonRadius]: string } = {
  none: "rounded-0",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
};

export const btnThemeDefault: { [key in ButtonTheme]: string } = {
  default: "bg-brand-primary-300 text-white active:bg-brand-primary-400",
  primary: "bg-brand-primary-500 text-white active:bg-brand-primary-600",
  secondary: "bg-violet-500 text-white active:bg-violet-600",
  dark: "bg-brand-primary-800 text-white active:bg-brand-primary-900",
  shade: "bg-brand-gray-500 text-white active:bg-brand-gray-600",
  white:
    "bg-white text-brand-primary-500 active:outline-none active:ring active:ring-brand-primary-200",
  custom: "active:box-shadow-md",
};

// outline
export const btnThemeOutline: { [key in ButtonTheme]: string } = {
  default: "border border-1 border-brand-primary-300 text-brand-primary-300",
  primary: "border border-1 border-brand-primary-500 text-brand-primary-500",
  secondary: "border border-1 border-violet-500 text-violet-500",
  dark: "border border-1 border-brand-primary-800 text-brand-primary-800",
  shade: "border border-1 border-brand-gray-500 text-brand-gray-500",
  white: "border border-1 border-white text-white",
  custom: "border border-1 border-transparent",
};

//ghost
export const btnThemeGhost: { [key in ButtonTheme]: string } = {
  default: "bg-brand-primary-300 bg-opacity-35 text-brand-primary-700",
  primary: "bg-brand-primary-500 bg-opacity-35 text-white",
  secondary: "bg-violet-500 bg-opacity-35 text-white",
  dark: "bg-brand-primary-800 bg-opacity-35 text-white",
  shade: "bg-brand-gray-500 bg-opacity-35 text-white",
  white: "bg-white bg-opacity-35 text-brand-primary-500",
  custom: " bg-opacity-35",
};

//raw
export const btnThemeRaw: { [key in ButtonTheme]: string } = {
  default: "bg-transparent text-brand-primary-300",
  primary: "bg-transparent text-brand-primary-500",
  secondary: "bg-transparent text-violet-500",
  dark: "bg-transparent text-brand-primary-800",
  shade: "bg-transparent text-brand-gray-500",
  white: "bg-transparent text-white",
  custom: "bg-transparent text-white",
};

export const btnType: {
  [key in ButtonType]: { [key in ButtonTheme]: string };
} = {
  default: btnThemeDefault,
  outline: btnThemeOutline,
  ghost: btnThemeGhost,
  raw: btnThemeRaw,
};
