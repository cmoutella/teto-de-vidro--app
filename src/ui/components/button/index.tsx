"use client";

import {
  Button as ButtonHeadless,
  ButtonProps as ButtonHeadlessProps,
} from "@headlessui/react";
import cx from "classnames";
import {
  btnBorderRadius,
  btnSize,
  btnType,
  ButtonRadius,
  ButtonSize,
  ButtonTheme,
  ButtonType,
} from "./shared/style";

export interface ButtonProps extends ButtonHeadlessProps {
  uiType?: ButtonType;
  theme?: ButtonTheme;
  size?: ButtonSize;
  label: string;
  fullWidth?: boolean;
  borderRadius?: ButtonRadius;
  flat?: boolean;
}

const Button = ({
  uiType = "default",
  theme = "default",
  size = "medium",
  borderRadius = "md",
  flat = false,
  label,
  fullWidth,
  className,
  ...otherProps
}: ButtonProps) => {
  return (
    <ButtonHeadless
      className={cx(
        "cursor-pointer",
        btnSize[size],
        btnType[uiType][theme],
        {
          "w-full": fullWidth,
        },
        {
          "hover:drop-shadow-md active:shadow-inner": !flat,
        },
        btnBorderRadius[borderRadius],
        className
      )}
      {...otherProps}
    >
      {label}
    </ButtonHeadless>
  );
};

export default Button;
