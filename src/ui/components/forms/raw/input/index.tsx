import { Input as InputHeadless } from "@headlessui/react";
import type { InputProps as InputHeadlessProps } from "@headlessui/react";
import cx from "classnames";

import {
  baseInputStyle,
  FormSizes,
  FormTheme,
  formTheme,
} from "../../shared/style";

interface InputProps extends InputHeadlessProps {
  theme?: FormTheme;
  themeSize?: FormSizes;
}

const InputRaw = ({
  theme = "light",
  themeSize = "md",
  ...otherProps
}: InputProps) => {
  return (
    <InputHeadless
      className={cx(
        formTheme[theme].input,
        baseInputStyle,
        "focus:outline-none focus:bg-transparent active:bg-transparent w-full"
      )}
      {...otherProps}
    />
  );
};

export default InputRaw;
