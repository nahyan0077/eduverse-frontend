import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../ui/theme-provider";
import { useAppDispatch } from "@/hooks/hooks";
import { verifyOtpAction } from "@/redux/store/actions/auth/verifyOtpAction";
import Alert from "@mui/material/Alert";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendVerificationMail } from "@/redux/store/actions/auth/sendVerificaitionMail";
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from "react-router-dom";
import { SignupFormData } from "@/types/IForms";
import { signupAction } from "@/redux/store/actions/auth";

interface OtpInputProps {
    length?: number;
    onOtpSubmit?: (otp: string) => void;
    onResendOtp?: () => void;
}

export const OtpSection: React.FC<OtpInputProps> = ({
    length = 6,
    onOtpSubmit = () => {},
    onResendOtp = () => {},
}) => {
    const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
    const [isComplete, setIsComplete] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const [otpError, setOtpError] = useState(false);
    const location = useLocation()
    const navigate = useNavigate()
    const [isLoading,setLoading] = useState(false)

    useEffect(() => {
        inputRefs.current[0]?.focus();
        startTimer();
    }, []);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [timeLeft]);

    const startTimer = () => {
        setTimeLeft(6);
        setCanResend(false);
    };

    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!isNaN(Number(value))) {
            const newOtp = [...otp];
            newOtp[index] = value.slice(-1);
            setOtp(newOtp);

            setIsComplete(newOtp.every((digit) => digit !== ""));
            if (newOtp.every((digit) => digit !== "")) {
                onOtpSubmit(newOtp.join(""));
            }
            if (value && index < length - 1) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };
    
    const handleSubmit = async () => {
        setLoading(true)
        if (isComplete) {
            const submittedOtp = otp.join("");
            console.log(submittedOtp, "otp --- ottt");

            const response = await dispatch(verifyOtpAction({ otp: submittedOtp, email: location.state.email }));

            console.log("otp submit response", response);

            if (!response.payload.success) {
                setLoading(false)
                setOtpError(true);
                setTimeout(() => {
                    setOtpError(false);
                }, 4000);
            } else {


                const allData: SignupFormData = location.state

                const response: any = await dispatch(signupAction(allData ))
                console.log("signup final ress",response);
                
                setLoading(false)

                if(!response.error && response.payload.success){

                    console.log("otp verified",location.state);
        
                        
                    if (location.state.role == 'student') {
                        navigate('/')
                    }else{
                        navigate('/verification-page')
                    }
             
                }else{
                    toast.error('error occurred', {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
                

            }

            onOtpSubmit(submittedOtp);
            setOtp(new Array(length).fill(""));
            setIsComplete(false);
            inputRefs.current[0]?.focus();
        }
    };
    

    const handleResend = async () => {
        startTimer();
        onResendOtp();
        console.log("resend");
        toast.success('OTP resend to your Email', {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });

        const response = await dispatch(sendVerificationMail(location.state.email));

        console.log("resend otp response", response);
    };

    return (
        <>
            <ToastContainer />
            <motion.div 
                className={`w-full md:w-1/2 flex flex-col items-center px-4 py-16  rounded-2xl shadow-lg ${theme == 'light' ?  'bg-white' : 'bg-gray-900'} bg-gray-900 `}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                {otpError &&
                    <Alert className="mb-3" variant="outlined" severity="error">
                        OTP doesn't match. Try again.
                    </Alert>
                }

                <div
                    className={`text-3xl font-extrabold pb-10 ${
                        theme === "light" ? "text-violet-700" : "text-white"
                    }`}
                >
                    OTP
                </div>
                <div className="flex gap-2 justify-center">
                    {otp.map((value, index) => (
                        <motion.input
                            key={index}
                            type="text"
                            ref={(input) => (inputRefs.current[index] = input)}
                            value={value}
                            onChange={(e) => handleChange(index, e)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className={`w-12 h-12 text-center text-xl border ${
                                theme === "light"
                                    ? "text-gray-900 bg-gray-300"
                                    : "text-white bg-gray-600"
                            } font-medium border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            maxLength={1}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                    ))}
                </div>
                <div className="mt-5">
                    {canResend ? (
                        <p
                            onClick={handleResend}
                            className="text-red-600 font-semibold cursor-pointer rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Resend OTP
                        </p>
                    ) : (
                        <div
                            className={`text-sm font-semibold ${
                                theme === "light" ? "text-violet-700" : "text-white"
                            }`}
                        >
                            Resend OTP in {timeLeft} seconds
                        </div>
                    )}
                </div>
                <motion.button
                    onClick={handleSubmit}
                    disabled={!isComplete}
                    className={`px-4 py-2 mt-5 text-white rounded-md focus:outline-none focus:ring-2 ${
                        isComplete
                            ? "bg-violet-700 focus:ring-violet-500"
                            : "bg-gray-500 cursor-not-allowed"
                    }`}
                    whileHover={{ scale: isComplete ? 1.05 : 1 }}
                    whileTap={{ scale: isComplete ? 0.95 : 1 }}
                >
                    Submit
                </motion.button>
            </motion.div>
        </>
    );
};
