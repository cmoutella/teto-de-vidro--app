import {
  Select as SelectHeadless,
  SelectProps as SelectHeadlessProps,
} from "@headlessui/react";
import cx from "classnames";
import {
  baseInputStyle,
  FormSizes,
  formTheme,
  FormTheme,
} from "../../shared/formTheme";

export interface Option {
  label: string;
  value: string;
  onClick?: () => void;
}

export interface DropdownSelectProps extends SelectHeadlessProps {
  options: Option[];
  theme?: FormTheme;
  themeSize?: FormSizes;
  selected?: string;
}

const SelectRaw = ({
  options,
  selected,
  defaultValue,
  theme = "light",
  themeSize = "md",
  ...otherProps
}: DropdownSelectProps) => {
  return (
    <SelectHeadless
      value={selected}
      className={cx(
        formTheme[theme].input,
        baseInputStyle,
        "focus:outline-none focus:bg-transparent active:bg-transparent w-full"
      )}
      {...otherProps}
    >
      {options.map((opt) => {
        return (
          <option value={opt.value} key={opt.value}>
            {opt.label}
          </option>
        );
      })}
    </SelectHeadless>
  );
};

export default SelectRaw;
