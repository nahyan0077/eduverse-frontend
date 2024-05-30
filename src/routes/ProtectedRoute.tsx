import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/hooks/hooks";

type ProtectedRouteProps = {
	element: React.ReactElement;
	allowedRoles: string[];
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
	element,
	allowedRoles,
}) => {
	const { data } = useAppSelector((state: RootState) => state.user);
	if (!data) {
		return <Navigate to="/" />;
	}
	const userRole = data.role || "";
	if (allowedRoles.includes(userRole)) {
		return element;
	} else {
		return <Navigate to="/not-authorized" />;
	}
};
