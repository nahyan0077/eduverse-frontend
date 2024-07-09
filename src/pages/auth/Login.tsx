import React, { useState } from "react";
import login from "@/assets/auth/loginss.png";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/common/users/Header";
import InputField from "@/components/common/skeleton/InputField";
import { Form, Formik } from "formik";
import { loginSchema } from "@/utils/validationSchemas/loginSchema";
import PasswordField from "@/components/auth/PasswordField";
import { useTheme } from "@/components/ui/theme-provider";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { loginAction } from "@/redux/store/actions/auth/loginAction";
import { toast } from "sonner";
import { storeUserData } from "@/redux/store/slices/user";
import { RootState } from "@/redux/store";
import { GoogleLogin } from "@react-oauth/google";
import { SignupFormData } from "@/types/IForms";
import { googleAuthAction } from "@/redux/store/actions/auth";
import Footer from "@/components/common/users/Footer";
import LoadingPopUp from "@/components/common/skeleton/LoadingPopUp";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };
  const location = useLocation();
  const dispatch = useAppDispatch();

  const userData = useAppSelector((state: RootState) => state.user);

  const handleSubmit = async (value: any) => {
    setLoading(true);
    const result = await dispatch(loginAction(value));

    if (!result.payload || !result.payload.success) {
      setLoading(false);
      toast.error(result?.payload?.message || userData?.error);
    } else {
      dispatch(storeUserData(result.payload.data));

      if (
        result.payload.data.role == "instructor" &&
        result.payload.data.isVerified
      ) {
        setLoading(false);
        navigate("/");
      } else if (
        result.payload.data.role == "instructor" &&
        !result.payload.data.isVerified
      ) {
        setLoading(false);
        navigate("/");
      } else if (result.payload.data.role == "student") {
        setLoading(false);
        navigate("/");
      } else {
        setLoading(false);
        navigate("/admin");
      }
    }
  };

  const loginWithGoogle = async (credentialResponse: any) => {
    try {
      setLoading(true);
      const response = await dispatch(googleAuthAction(credentialResponse));

      if (
        response.payload.existingUser &&
        response.payload.data.isGAuth &&
        !response.payload.data.isBlocked
      ) {
        dispatch(storeUserData(response.payload.data));
        setLoading(false);
        navigate("/");
        return;
      } else if (
        response.payload.existingUser &&
        !response.payload.data.isGAuth
      ) {
        setLoading(false);
        toast.error("Account already exist", {
          description:
            "Account created using email and password can't login using Google !!",
          duration: 6000,
        });
        return;
      } else if (
        !response.payload.existingUser &&
        !response.payload.data.isGAuth
      ) {
        setLoading(false);
        navigate("/selection");
        return;
      } else if (
        response.payload.existingUser &&
        response.payload.data.isBlocked
      ) {
        setLoading(false);
        toast.error("This account blocked..!", {
          description: "Your account has been blocked by the Eduverse Team !!",
          duration: 6000,
        });
        return;
      }

      const allData: SignupFormData = {
        role: location.state.role || null,
        email: response.payload.data.email,
        password: response.payload.data.password,
        userName: "." + response.payload.data.email.split("@")[0].toLowerCase(),
        isGAuth: true,
        isVerified: location.state.role == "instructor" ? false : true,
      };

      if (location.state.role === "student") {
        navigate("/student-form", { state: allData });
      } else {
        navigate("/teacher-form", { state: allData });
      }
    } catch (error: any) {
      setLoading(false)
      console.log("Login Failed", error);
      toast.error("Something is wrong! Please try later");
    }
  };

  const role = location.state?.role ?? "";

  return (
    <>
      <Header />
      <div className={`min-h-screen   `}>
        <LoadingPopUp isLoading={loading} />
        <div className="flex flex-col lg:flex-row max-w-7xl mx-auto items-center pt-20">
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}>
            <img src={login} alt="Login" className="lg:w-[80%]" />

            {/* ------------Login demo datas------*/}

            <label htmlFor="my_modal_6" className="btn btn-ghost text-gray-700">
              Don't Click Me
            </label>

            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
              <div className="modal-box bg-white dark:bg-gray-900 text-gray-400">
                <h3 className="text-lg font-bold">Demo datas!</h3>
                <p className="mt-2 font-semibold" >ADMIN</p>
                <h3 className="px-4">admin@eduverse.in</h3>
                <h3 className="px-4 ">Admin@123</h3>
                <p className="mt-2 font-semibold" >STUDENT</p>
                <h3 className="px-4 mt-2">jishnu123@gmail.com</h3>
                <h3 className="px-4">Jishnu@123</h3>
                <p className="mt-2 font-semibold" >INSTRUCTOR</p>
                <h3 className="px-4 mt-2">vagodeja@citmo.net</h3>
                <h3 className="px-4">Thakku@123</h3>

                <div className="modal-action">
                  <label htmlFor="my_modal_6" className="btn">
                    Close!
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className="w-full lg:w-1/2 p-5"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}>
            <h1 className="text-violet-700 text-3xl font-bold p-4">
              <span
                className={`${
                  theme === "light" ? "text-blue-950" : "text-white"
                }`}>
                {role ? role.charAt(0).toUpperCase() + role.slice(1) : ""}
              </span>{" "}
              Login
            </h1>
            <div className="flex flex-col gap-3 m-2">
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={loginSchema}>
                {({ isSubmitting }) => (
                  <Form className="flex flex-col gap-3 m-2">
                    <InputField name="email" type="text" placeholder="Email" />
                    <PasswordField name="password" placeholder="Password" />
                    <motion.button
                      className="bg-violet-700 text-white font-bold p-2 text-sm rounded-md mt-3"
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 1 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      disabled={isSubmitting}>
                      Login
                    </motion.button>
                  </Form>
                )}
              </Formik>

              <div className="flex justify-between">
                {role == "" ? (
                  <p
                    className="text-center text-sm hover:cursor-pointer ml-2"
                    onClick={() =>
                      navigate("/selection", {
                        state: location.state,
                      })
                    }>
                    Don't have an account?{" "}
                    <span className="text-violet-700 font-bold">
                      Get Started
                    </span>
                  </p>
                ) : (
                  <p
                    className="text-center text-sm hover:cursor-pointer ml-2"
                    onClick={() =>
                      navigate("/signup", {
                        state: location.state,
                      })
                    }>
                    Don't have an account?{" "}
                    <span className="text-violet-700 font-bold">Signup</span>
                  </p>
                )}
                <div
                  className="text-violet-500 text-sm font-bold hover:cursor-pointer"
                  onClick={() => navigate("/confirm-email")}>
                  Forgot Password?
                </div>
              </div>

              <div className="flex justify-center mt-2 ">
                <GoogleLogin
                  onSuccess={loginWithGoogle}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  width="250"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
