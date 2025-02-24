"use client";

import {
  Button as ButtonHeadless,
  ButtonProps as ButtonHeadlessProps,
} from "@headlessui/react";
import cx from "classnames";
import {
  btnBorderRadius,
  btnSize,
  ButtonRadius,
  ButtonSize,
  ButtonType,
  roundedBtnSize,
} from "../shared/buttonTheme";
import { ReactNode } from "react";

export interface ButtonProps extends ButtonHeadlessProps {
  uiType?: ButtonType;
  size?: ButtonSize;
  label: string | ReactNode;
  fullWidth?: boolean;
  borderRadius?: ButtonRadius;
  rounded?: boolean;
  flat?: boolean;
}

const Button = ({
  uiType = "default",
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

  return (
    <ButtonHeadless
      className={cx(
        { "cursor-pointer": !disabled },
        bSize,
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
