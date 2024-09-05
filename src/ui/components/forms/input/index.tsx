import {
  Description as DescriptionHeadless,
  Field as FieldHeadless,
  Input as InputHeadless,
  Label as LabelHeadless,
} from "@headlessui/react";
import type { InputProps as InputHeadlessProps } from "@headlessui/react";
import cx from "classnames";
import InputWrapper from "../inputWrapper";
import { ReactNode } from "react";

type FormSizes = "md" | "lg";
type FormTheme = "light" | "dark" | "nude";
type InputFieldParts = "wrapper" | "input" | "label" | "helpText";

interface InputProps extends InputHeadlessProps {
  label?: string;
  fieldDescription?: string;
  theme?: FormTheme;
  themeSize?: FormSizes;
  iconButton?: ReactNode;
}

const Input = ({
  label,
  fieldDescription,
  theme = "light",
  themeSize = "md",
  iconButton,
  ...otherProps
}: InputProps) => {
  const baseInputStyle = "block w-full border-none bg-transparent";

  const iSizes: { [key in FormSizes]: string } = {
    md: "py-1.5 px-3 rounded-lg",
    lg: "py-2 px-4 rounded-lg",
  };

  const formTheme: {
    [key in FormTheme]: { [key in InputFieldParts]: string };
  } = {
    light: {
      wrapper: "border border-1 border-brand-gray-700 bg-white bg-opacity-80",
      input: "text-brand-gray-700 text-sm",
      label: "text-sm font-bold text-brand-gray-700",
      helpText: "text-xs text-brand-gray-700",
    },
    dark: {
      wrapper:
        "border border-1 border-brand-primary-700 bg-brand-gray-800 bg-opacity-80",
      input: "text-white text-sm",
      label: "text-sm font-bold text-white",
      helpText: "text-xs text-white",
    },
    nude: {
      wrapper: "border-none bg-white bg-opacity-80",
      input: "text-brand-gray-700 text-sm",
      label: "text-sm font-bold text-brand-gray-700",
      helpText: "text-xs text-brand-gray-700",
    },
  };

  return (
    <FieldHeadless className="flex flex-col gap-3 w-full">
      {(label || fieldDescription) && (
        <span>
          {label && (
            <LabelHeadless className={cx(formTheme[theme].label)}>
              {label}
            </LabelHeadless>
          )}
          {fieldDescription && (
            <DescriptionHeadless className={cx(formTheme[theme].helpText)}>
              {fieldDescription}
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
        <InputHeadless
          className={cx(
            formTheme[theme].input,
            "bg-transparent focus:outline-none focus:bg-transparent active:bg-transparent w-full"
          )}
          {...otherProps}
        />
        {iconButton && <span className="">{iconButton}</span>}
      </InputWrapper>
    </FieldHeadless>
  );
};

export default Input;
