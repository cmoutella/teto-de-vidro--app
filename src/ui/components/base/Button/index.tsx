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
  roundedBtnSize,
} from "./shared/style";
import { ReactNode } from "react";

export interface ButtonProps extends ButtonHeadlessProps {
  uiType?: ButtonType;
  theme?: ButtonTheme;
  size?: ButtonSize;
  label: string | ReactNode;
  fullWidth?: boolean;
  borderRadius?: ButtonRadius;
  rounded?: boolean;
  flat?: boolean;
}

const Button = ({
  uiType = "default",
  theme = "primary",
  size = "medium",
  borderRadius = "md",
  flat = false,
  label,
  fullWidth,
  rounded,
  className,
  disabled,
  ...otherProps
}: ButtonProps) => {
  const bSize = rounded ? roundedBtnSize[size] : btnSize[size];

  const bTheme = disabled ? btnType[uiType].disabled : btnType[uiType][theme];

  return (
    <ButtonHeadless
      className={cx(
        "cursor-pointer",
        bSize,
        bTheme,
        {
          "w-full": fullWidth,
        },
        {
          "hover:drop-shadow-md active:shadow-inner": !flat && !disabled,
        },
        btnBorderRadius[borderRadius],
        { "rounded-full": rounded },
        { "flex justify-center items-center": rounded },
        className
      )}
      disabled={disabled}
      {...otherProps}
    >
      {label}
    </ButtonHeadless>
  );
};

export default Button;
