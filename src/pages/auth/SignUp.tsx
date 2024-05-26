import login from "@/assets/auth/signups.png";
import { GoogleLogin } from "@react-oauth/google";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/common/users/Header";
import { Form, Formik } from "formik";
import InputField from "@/components/auth/InputField";
import { signupSchema } from "@/validationSchemas/signupSchema";
import PasswordField from "@/components/auth/PasswordField";
import { findEmailAction, findUsernameAction, googleAuthAction } from "@/redux/store/actions/auth";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { useTheme } from "@/components/ui/theme-provider";
import { SignupFormData } from "@/types/IForms";
import { useAppDispatch } from "@/hooks/hooks";
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const initialValues = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    };
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const [isEmailTaken, setTakenEmail] = useState(false);
    const [isUsernameTaken, setTakenUsername] = useState(false);

    const handleSubmit = async (data: any) => {
        setTakenEmail(false);
        setTakenUsername(false);

        try {
            const result1: any = await dispatch(findUsernameAction(data.username));
            if (!result1?.payload?.success) {
                setTakenUsername(true);
                setTimeout(() => {
                    setTakenUsername(false);
                }, 4000);
                return;
            }

            const result: any = await dispatch(findEmailAction(data.email));
            if (!result.payload || !result.payload.success) {
                setTakenEmail(true);
                setTimeout(() => {
                    setTakenEmail(false);
                }, 4000);
                return;
            }

            let allData: SignupFormData = {
                ...data,
                role: location.state.role,
                isGAuth: false
            };

            if (location.state.role === "student") {
                navigate("/student-form", { state: allData });
            } else {
                navigate("/teacher-form", { state: allData });
            }
        } catch (error: any) {
            throw new Error(error?.message);
        }
    };

    const loginWithGoogle = async (credentialResponse: any) => {
        try {
            const response = await dispatch(googleAuthAction(credentialResponse));
            console.log("google auth res: ",response);
            
            if(response.payload.existingUser){
                navigate('/')
                return
            }


            const allData: SignupFormData = {
                role: location.state.role,
                email: response.payload.data.email,
                password: response.payload.data.password,
                username: (response.payload.data.email.split("@")[0]).toLowerCase(),
                isGAuth: true
            };

            if (location.state.role === "student") {
                navigate("/student-form", { state: allData });
            } else {
                navigate("/teacher-form", { state: allData });
            }
        } catch (error: any) {
            console.log("Login Failed", error);
            toast.error("Something is wrong! Please try later");
        }
    }

    return (
        <>
            <ToastContainer />
            <Header />
            <div className="min-h-screen">
                <div className="flex flex-col md:flex-row max-w-7xl mx-auto items-center">
                    <motion.div
                        className="w-full md:w-1/2"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <img src={login} alt="Signup" className="w-full" />
                    </motion.div>
                    <motion.div
                        className="w-full md:w-1/2 p-5"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-violet-700 text-3xl font-bold p-4">
                            <span className={` ${theme === "light" ? "text-blue-950" : "text-white"} `}>
                                {location.state.role === "student" ? "Student" : "Instructor"}
                            </span> Signup
                        </h1>
                        {isEmailTaken && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Alert variant="outlined" severity="error">
                                    Email already exists, please login.
                                </Alert>
                            </motion.div>
                        )}
                        {isUsernameTaken && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Alert variant="outlined" severity="error">
                                    Username is already taken.
                                </Alert>
                            </motion.div>
                        )}
                        <div className="flex flex-col gap-3 m-2">
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                                validationSchema={signupSchema}
                            >
                                {({ isSubmitting }) => (
                                    <Form className="flex flex-col gap-3 m-2">
                                        <InputField name="username" type="text" placeholder="Username" />
                                        <InputField name="email" type="email" placeholder="Email" />
                                        <PasswordField name="password" placeholder="Password" />
                                        <PasswordField name="confirmPassword" placeholder="Confirm Password" />
                                        <motion.button
                                            className="bg-violet-700 text-white font-bold p-2 text-sm rounded-md mt-3"
                                            type="submit"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 1 }}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                            disabled={isSubmitting}
                                        >
                                            Sign Up
                                        </motion.button>
                                    </Form>
                                )}
                            </Formik>
                            <div className="flex justify-center">
                                <p
                                    className="text-center text-sm hover:cursor-pointer ml-2"
                                    onClick={() => navigate("/login", { state: { location } })}
                                >
                                    Already have an account?{" "}
                                    <span className="text-violet-700 font-bold">Login</span>
                                </p>
                            </div>
                            <div className="flex justify-center mt-2">

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
        </>
    );
};

export default SignUp;
