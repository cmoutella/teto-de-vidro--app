export type ButtonType = "default" | "outline" | "ghost" | "raw";
export type ButtonTheme =
  | "default"
  | "primary"
  | "secondary"
  | "dark"
  | "shade"
  | "white"
  | "custom"
  | "disabled";
export type ButtonSize = "xsmall" | "small" | "medium" | "large" | "xlarge";
export type ButtonRadius = "none" | "sm" | "md" | "lg" | "xl";

export const btnSize: { [key in ButtonSize]: string } = {
  xsmall: "py-0.5 px-1 max-h-7 text-sm",
  small: "py-1 px-1 max-h-7 text-sm",
  medium: "py-1.5 px-2 max-h-8 text-sm",
  large: "py-2 px-3.5 max-h-9 text-sm",
  xlarge: "py-3 px-4 max-h-10 text-md",
};

export const roundedBtnSize: { [key in ButtonSize]: string } = {
  xsmall: "p-0.5 h-4 w-4 text-xs",
  small: "p-1 h-5 w-5 text-xs",
  medium: "p-1.5 h-6 w-6 text-sm",
  large: "p-2 h-7 w-7",
  xlarge: "p-3 h-8 w-8",
};

export const btnBorderRadius: { [key in ButtonRadius]: string } = {
  none: "rounded-0",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
};

export const btnThemeDefault: { [key in ButtonTheme]: string } = {
  default:
    "bg-brand-primary-300 text-white active:bg-brand-primary-400 hover:bg-brand-primary-400",
  primary:
    "bg-brand-primary-500 text-white active:bg-brand-primary-600 hover:bg-brand-primary-600",
  secondary:
    "bg-violet-500 text-white active:bg-violet-600 hover:bg-violet-600",
  dark: "bg-brand-primary-800 text-white active:bg-brand-primary-900 hover:bg-brand-primary-900",
  shade:
    "bg-brand-gray-500 text-white active:bg-brand-gray-600 hover:bg-brand-primary-600",
  white:
    "bg-white text-brand-primary-500 active:outline-none hover:bg-brand-primary-000",
  disabled: "bg-brand-gray-300 text-brand-gray-600 cursor-default",
  custom: "active:box-shadow-md",
};

// outline
export const btnThemeOutline: { [key in ButtonTheme]: string } = {
  default:
    "border border-1 border-brand-primary-300 text-brand-primary-300 hover:bg-brand-primary-300 hover:text-white hover:font-bold",
  primary:
    "border border-1 border-brand-primary-500 text-brand-primary-500 hover:bg-brand-primary-500 hover:text-white hover:font-bold",
  secondary:
    "border border-1 border-violet-500 text-violet-500 hover:bg-violet-500 hover:text-white hover:font-bold",
  dark: "border border-1 border-brand-primary-800 text-brand-primary-800 hover:bg-brand-primary-700 hover:text-white hover:font-bold",
  shade:
    "border border-1 border-brand-gray-500 text-brand-gray-500 hover:bg-brand-gray-500 hover:text-white hover:font-bold",
  white:
    "border border-1 border-white text-white hover:bg-white hover:text-brand-primary-500 hover:font-bold",
  disabled:
    "border-brand-gray-300 bg-brand-gray-300 text-brand-gray-500 cursor-default",
  custom: "border border-1 border-transparent bg-transparent",
};

//ghost
export const btnThemeGhost: { [key in ButtonTheme]: string } = {
  default:
    "bg-brand-primary-300 bg-opacity-35 text-brand-primary-700 hover:bg-opacity-65",
  primary: "bg-brand-primary-500 bg-opacity-35 text-white hover:bg-opacity-65",
  secondary: "bg-violet-500 bg-opacity-35 text-white hover:bg-opacity-65",
  dark: "bg-brand-primary-800 bg-opacity-35 text-white hover:bg-opacity-65",
  shade: "bg-brand-gray-500 bg-opacity-35 text-white hover:bg-opacity-65",
  white: "bg-white bg-opacity-35 text-brand-primary-500 hover:bg-opacity-65",
  disabled:
    "bg-brand-gray-300 bg-opacity-35 text-brand-gray-600 cursor-default",
  custom: "bg-opacity-35 hover:bg-opacity-65",
};

//raw
export const btnThemeRaw: { [key in ButtonTheme]: string } = {
  default: "bg-transparent text-brand-primary-300",
  primary: "bg-transparent text-brand-primary-500",
  secondary: "bg-transparent text-violet-500",
  dark: "bg-transparent text-brand-primary-800",
  shade: "bg-transparent text-brand-gray-500",
  white: "bg-transparent text-white",
  disabled: "bg-brand-gray-300 opacity-30 text-brand-gray-900 cursor-default",
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
