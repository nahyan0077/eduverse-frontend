import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { logoutAction } from "@/redux/store/actions/auth/logoutAction";

interface ProtectedRouteProps {
	element: React.ReactElement;
	allowedRoles: string[];
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ element, allowedRoles }) => {
	const { data } = useAppSelector((state: RootState) => state.user);
	const dispatch = useAppDispatch()

	if (!data) {
		return <Navigate to="/home" />;
	}

	if (data.isBlocked) {
		dispatch(logoutAction());
		return <Navigate to="/login" />;
	}

	const userRole = data.role || "";

	if (allowedRoles.includes(userRole)) {
		return element;
	} else {
		return <Navigate to="/unauthorized" />;
	}
};
