import type { InputProps as InputHeadlessProps } from "@headlessui/react";
import { ReactNode } from "react";
import { FormSizes, formTheme, FormTheme } from "../shared/style";
import InputRaw from "../raw/input";
import FieldWrapper from "../raw/wrappers/field";

interface InputProps extends InputHeadlessProps {
  label?: string;
  description?: string;
  theme?: FormTheme;
  themeSize?: FormSizes;
  iconButton?: ReactNode;
  fieldSymbol?: string | ReactNode;
}

const Input = ({
  label,
  description,
  theme = "light",
  themeSize = "md",
  iconButton,
  fieldSymbol,
  ...otherProps
}: InputProps) => {
  return (
    <FieldWrapper
      label={label}
      description={description}
      theme={theme}
      themeSize={themeSize}
    >
      {fieldSymbol && (
        <span className={formTheme[theme].input}>{fieldSymbol}</span>
      )}
      <InputRaw theme={theme} themeSize={themeSize} {...otherProps} />
      {iconButton && <span>{iconButton}</span>}
    </FieldWrapper>
  );
};

export default Input;
