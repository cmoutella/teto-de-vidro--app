import { Features } from "@/types/features";

export interface MenuItem {
  title: string;
  path: string;
}

const PATHS: Record<Features, MenuItem> = {
  LOGIN: {
    title: "Login",
    path: "/login",
  },
  LOGOUT: {
    title: "Logout",
    path: "/logout",
  },
  PUBLIC_HOME: {
    title: "Início",
    path: "/",
  },
  PRIVATE_HOME: {
    title: "Meu painel",
    path: "/",
  },
  HUNTS: {
    title: "Minhas buscas por imóvel",
    path: "/hunts",
  },
};

export default PATHS;
