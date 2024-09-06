import type { InputProps as InputHeadlessProps } from "@headlessui/react";
import { ReactNode } from "react";
import { FormSizes, FormTheme } from "../shared/style";
import InputRaw from "../raw/input";
import FieldWrapper from "../raw/wrappers/field";

interface InputProps extends InputHeadlessProps {
  label?: string;
  description?: string;
  theme?: FormTheme;
  themeSize?: FormSizes;
  iconButton?: ReactNode;
}

const Input = ({
  label,
  description,
  theme = "light",
  themeSize = "md",
  iconButton,
  ...otherProps
}: InputProps) => {
  return (
    <FieldWrapper
      label={label}
      description={description}
      theme={theme}
      themeSize={themeSize}
    >
      <InputRaw theme={theme} themeSize={themeSize} {...otherProps} />
      {iconButton && <span className="">{iconButton}</span>}
    </FieldWrapper>
  );
};

export default Input;
