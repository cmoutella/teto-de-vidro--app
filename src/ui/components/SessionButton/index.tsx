"use client";

import cx from "classnames";
import { useSessionContext } from "@/providers/AuthProvider";
import Link from "next/link";
import Button, { ButtonProps } from "../base/Button";
import { btnBorderRadius, btnSize } from "../base/Button/shared/style";

const SessionButton = ({
  size = "medium",
  fullWidth,
}: Omit<ButtonProps, "borderRadius" | "label" | "uiType">) => {
  const { user, logout } = useSessionContext();

  if (user) {
    return <Button onClick={logout} label="Sair" />;
  } else {
    return (
      <Link
        href={"/login"}
        className={cx(
          btnBorderRadius.md,
          btnSize[size],
          {
            "w-full": fullWidth,
          },
          "border border-1",
          "bg-transparent border-brand-primary-600 hover:bg-brand-primary-600",
          "text-brand-primary-800 hover:text-white",
          "text-center flex justify-center items-center"
        )}
      >
        Entrar
      </Link>
    );
  }
};

export default SessionButton;
