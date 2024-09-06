import { ReactNode } from "react";
import cx from "classnames";

type InputWrapperProps = {
  children: ReactNode;
  classNames?: string;
};

const InputWrapper = ({ children, classNames }: InputWrapperProps) => {
  const wrapperBaseStyle =
    "block w-full flex flex-row justify-between gap-2 relative";

  return <div className={cx(wrapperBaseStyle, classNames)}>{children}</div>;
};

export default InputWrapper;
