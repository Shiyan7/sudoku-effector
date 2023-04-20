import { routes } from "@/shared/lib";
import { Link } from "atomic-router-react";

export const HomePage = () => {
  return <Link to={routes.game}>to game page</Link>;
};
