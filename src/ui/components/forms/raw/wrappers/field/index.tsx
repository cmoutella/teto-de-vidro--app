import {
  Description as DescriptionHeadless,
  Field as FieldHeadless,
  Label as LabelHeadless,
} from "@headlessui/react";
import type { InputProps as InputHeadlessProps } from "@headlessui/react";
import cx from "classnames";
import { ReactNode } from "react";
import { FormSizes, formTheme, FormTheme, iSizes } from "../../../shared/style";
import InputWrapper from "../input";

interface InputProps extends InputHeadlessProps {
  label?: string;
  description?: string;
  theme?: FormTheme;
  themeSize?: FormSizes;
  children: ReactNode;
}

const FieldWrapper = ({
  label,
  description,
  theme = "light",
  themeSize = "md",
  children,
}: InputProps) => {
  return (
    <FieldHeadless className="flex flex-col gap-3 w-full">
      {(label || description) && (
        <span>
          {label && (
            <LabelHeadless
              className={cx(
                formTheme[theme].label,
                "uppercase whitespace-nowrap"
              )}
            >
              {label}
            </LabelHeadless>
          )}
          {description && (
            <DescriptionHeadless className={cx(formTheme[theme].helpText)}>
              {description}
            </DescriptionHeadless>
          )}
        </span>
      )}
      <InputWrapper
        classNames={cx(
          iSizes[themeSize],
          formTheme[theme].wrapper,
          "data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-brand-primary-400"
        )}
      >
        {children}
      </InputWrapper>
    </FieldHeadless>
  );
};

export default FieldWrapper;
