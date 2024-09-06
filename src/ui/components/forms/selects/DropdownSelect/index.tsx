"use client";

import { SelectProps as SelectHeadlessProps } from "@headlessui/react";
import { ChangeEvent, useState } from "react";
import { FormSizes, FormTheme } from "../../shared/style";
import SelectRaw from "../../raw/select";
import { Option } from "../../raw/select";
import FieldWrapper from "../../raw/wrappers/field";
export interface DropdownSelectProps extends SelectHeadlessProps {
  label?: string;
  description?: string;
  options: Option[];
  theme?: FormTheme;
  themeSize?: FormSizes;
}

const DropdownSelect = ({
  label,
  description,
  options,
  defaultValue,
  theme = "light",
  themeSize = "md",
  ...otherProps
}: DropdownSelectProps) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    (defaultValue as string) ?? options[0].value
  );

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const val = e.target.value;

    setSelectedValue(val);
  };

  return (
    <FieldWrapper
      label={label}
      description={description}
      theme={theme}
      themeSize={themeSize}
    >
      <SelectRaw
        value={selectedValue}
        onChange={handleChange}
        options={options}
        theme={theme}
        themeSize={themeSize}
        {...otherProps}
      />
    </FieldWrapper>
  );
};

export default DropdownSelect;
