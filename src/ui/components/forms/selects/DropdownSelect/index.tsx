"use client";

import {
  Description,
  Field,
  Label,
  Select as SelectHeadless,
  SelectProps as SelectHeadlessProps,
} from "@headlessui/react";
import cx from "classnames";
import InputWrapper from "../../inputWrapper";
import { ChangeEvent, useState } from "react";

interface Option {
  label: string;
  value: string;
  onClick?: () => void;
}

export interface DropdownSelectProps extends SelectHeadlessProps {
  label?: string;
  description?: string;
  options: Option[];
}

const DropdownSelect = ({
  label,
  description,
  options,
  defaultValue,
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
    <Field>
      {label && (
        <Label className="text-sm/6 font-medium text-white">{label}</Label>
      )}
      {description && (
        <Description className="text-sm/6 text-white/50">
          {description}
        </Description>
      )}
      <InputWrapper>
        <SelectHeadless
          value={selectedValue}
          onChange={handleChange}
          className={cx(
            "mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
            "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
            // Make the text of each option black on Windows
            "*:text-black"
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
      </InputWrapper>
    </Field>
  );
};

export default DropdownSelect;
