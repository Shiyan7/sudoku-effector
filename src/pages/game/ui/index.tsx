import { routes } from "@/shared/lib";
import { Link } from "atomic-router-react";

export const GamePage = () => {
  return <Link to={routes.home}>to home page</Link>;
};
