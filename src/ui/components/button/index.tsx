import {
  Button as ButtonHeadless,
  ButtonProps as ButtonHeadlessProps,
} from "@headlessui/react";
import cx from "classnames";

type ButtonType = "default" | "outline" | "ghost" | "raw";
type ButtonTheme =
  | "default"
  | "primary"
  | "secondary"
  | "dark"
  | "shade"
  | "white"
  | "custom";
type ButtonSize = "xsmall" | "small" | "medium" | "large" | "xlarge";
type ButtonRadius = "none" | "sm" | "md" | "lg" | "xl";

interface ButtonComponent {
  uiType?: ButtonType;
  theme?: ButtonTheme;
  size?: ButtonSize;
  label: string;
  fullWidth?: boolean;
  borderRadius?: ButtonRadius;
}

export interface ButtonProps
  extends ButtonComponent,
    Omit<ButtonHeadlessProps, "className"> {}

const Button = ({
  uiType = "default",
  theme = "default",
  size = "medium",
  borderRadius = "md",
  label,
  fullWidth,
  ...otherProps
}: ButtonProps) => {
  const btnSize: { [key in ButtonSize]: string } = {
    xsmall: "py-0.5 px-1",
    small: "py-1 px-1",
    medium: "py-1.5 px-2",
    large: "py-2 px-3.5",
    xlarge: "py-3 px-4",
  };

  const btnBorderRadius: { [key in ButtonRadius]: string } = {
    none: "rounded-0",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
  };

  const btnThemeDefault: { [key in ButtonTheme]: string } = {
    default: "bg-brand-primary-300 text-white",
    primary: "bg-brand-primary-500 text-white",
    secondary: "bg-violet-500 text-white",
    dark: "bg-brand-primary-800 text-white",
    shade: "bg-brand-gray-500 text-white",
    white: "bg-white text-brand-primary-500",
    custom: "",
  };

  // outline
  const btnThemeOutline: { [key in ButtonTheme]: string } = {
    default: "border border-1 border-brand-primary-300 text-brand-primary-300",
    primary: "border border-1 border-brand-primary-500 text-brand-primary-500",
    secondary: "border border-1 border-violet-500 text-violet-500",
    dark: "border border-1 border-brand-primary-800 text-brand-primary-800",
    shade: "border border-1 border-brand-gray-500 text-brand-gray-500",
    white: "border border-1 border-white text-white",
    custom: "border border-1 border-transparent",
  };

  //ghost
  const btnThemeGhost: { [key in ButtonTheme]: string } = {
    default: "bg-brand-primary-300 bg-opacity-35 text-brand-primary-700",
    primary: "bg-brand-primary-500 bg-opacity-35 text-white",
    secondary: "bg-violet-500 bg-opacity-35 text-white",
    dark: "bg-brand-primary-800 bg-opacity-35 text-white",
    shade: "bg-brand-gray-500 bg-opacity-35 text-white",
    white: "bg-white bg-opacity-35 text-brand-primary-500",
    custom: " bg-opacity-35",
  };

  //raw
  const btnThemeRaw: { [key in ButtonTheme]: string } = {
    default: "bg-transparent text-brand-primary-300",
    primary: "bg-transparent text-brand-primary-500",
    secondary: "bg-transparent text-violet-500",
    dark: "bg-transparent text-brand-primary-800",
    shade: "bg-transparent text-brand-gray-500",
    white: "bg-transparent text-white",
    custom: "bg-transparent text-white",
  };

  const btnType: { [key in ButtonType]: { [key in ButtonTheme]: string } } = {
    default: btnThemeDefault,
    outline: btnThemeOutline,
    ghost: btnThemeGhost,
    raw: btnThemeRaw,
  };

  return (
    <ButtonHeadless
      className={cx(
        btnSize[size],
        btnType[uiType][theme],
        {
          "w-full": fullWidth,
        },
        btnBorderRadius[borderRadius]
      )}
      {...otherProps}
    >
      {label}
    </ButtonHeadless>
  );
};

export default Button;
