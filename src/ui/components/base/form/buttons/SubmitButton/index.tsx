import cx from "classnames";
import Button from "@ui/base/Button";

interface SubmitButtonProps {
  isDisabled: boolean;
}

function SubmitButton({ isDisabled }: SubmitButtonProps) {
  return (
    <Button
      label="Criar"
      className={cx("min-w-36 w-1/6  text-white", {
        "hover:bg-brand-primary-800 bg-brand-primary-700": !isDisabled,
        "bg-brand-gray-500 disabled:bg-brand-gray-500": isDisabled,
      })}
      type="submit"
      disabled={isDisabled}
    />
  );
}

export default SubmitButton;
