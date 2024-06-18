import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks";
import { RootState } from "@/redux/store";
import { logoutAction } from "@/redux/store/actions/auth/logoutAction";

export const useLogoutIfBlocked = () => {
  const { data } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.isBlocked) {
      dispatch(logoutAction()); // Dispatch the logout action
      navigate("/login"); // Redirect to the login page
    }
  }, [data, dispatch, navigate]);
};
