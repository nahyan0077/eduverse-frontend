import React from "react";
import { Route, Navigate } from "react-router-dom";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/hooks/hooks";




interface ProtectedRouteProps {
  path: string;
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  path,
  element,
}: ProtectedRouteProps) => {
  const userData = useAppSelector((state: RootState) => state.user.data);

  // Check if user is authenticated, if not redirect to login
  if (!userData) {
    return <Navigate to="/" />;
  }

  // If user is authenticated, render the protected component
  return <Route path={path} element={element} />;
};

export default ProtectedRoute;
