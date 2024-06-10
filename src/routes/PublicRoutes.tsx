import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import { RootState } from "../redux/store";

interface PublicRouteProps {
  element: JSX.Element;
  allowedRoles: string[];
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element, allowedRoles }) => {
  const { data } = useAppSelector((state: RootState) => state.user);
  const role = data?.role;

  if ((role && allowedRoles.includes(role)) || !role) {
    return element;
  }

  return <Navigate to="/" />;
};

export default PublicRoute;
