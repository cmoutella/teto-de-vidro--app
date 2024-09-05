"use client";

import cx from "classnames";
import { useSessionContext } from "@/providers/AuthProvider";
import Link from "next/link";
import Button, { ButtonProps } from "../button";
import {
  btnBorderRadius,
  btnSize,
  btnThemeOutline,
} from "../button/shared/style";

const SessionButton = ({
  size = "medium",
  theme = "default",
  fullWidth,
}: Omit<ButtonProps, "borderRadius" | "label" | "uiType">) => {
  const { user, logout } = useSessionContext();

  if (user) {
    return <Button onClick={logout} label="Sair" theme={theme} />;
  } else {
    return (
      <Link
        href={"/login"}
        className={cx(
          btnThemeOutline[theme],
          btnBorderRadius.md,
          btnSize[size],
          { "w-full": fullWidth }
        )}
      >
        Entrar
      </Link>
    );
  }
};

export default SessionButton;
