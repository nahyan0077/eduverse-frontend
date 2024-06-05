import React, { useState } from "react";
import { Formik, Form } from 'formik';
import { motion } from 'framer-motion';
import confirmEmail from '@/assets/auth/confirm-email-forgot-pass.png'
import InputField from "@/components/common/skeleton/InputField";
import { useAppDispatch } from "@/hooks/hooks";
import { findEmailAction, forgotPasswordMailAction } from "@/redux/store/actions/auth";
import { toast, Toaster } from "sonner";
import LoadingPopUp from "../common/skeleton/LoadingPopUp";
import { useTheme } from "../ui/theme-provider";


export const ConfirmEmailForgotPassword: React.FC = () => {
    const initialValues = {
        email: "",
    };

    const dispatch = useAppDispatch()
    const [isLoading,setLoading] = useState(false)
    const { theme } = useTheme()

    const handleSubmit = async (values: any) => {
        // Handle form submission
        console.log(values.email);
        setLoading(true)
        const response = await dispatch(findEmailAction(values.email))

        console.log(response,"comf pass");

        if(!response.payload.success){
            console.log("this user exist");

            const response1 = await dispatch(forgotPasswordMailAction(values.email))
            setLoading(false)
            if(response1.payload.isBlocked){
                toast.error("User is blocked ",{
                    description: "This account is been blocked by the Eduverse Team...!"
                })
                return
            }
            if(response1.payload.isGAuth){
                toast.error("This users password can't be resetted ",{
                    description: "This account is been logged using google credentials...!"
                })
                return
            }
            toast.success('Please check you email to reset password..!!');

            console.log(response1,"email sendd");
            
            
        }else{
            setLoading(false)
            toast.error('User not existt in this email');
        }
        

    };

    return (
        <div className="flex flex-col items-center min-h-screen max-w-7xl mx-auto md:flex-row -mt-20">
            <LoadingPopUp isLoading={isLoading} />
             <Toaster richColors position="top-center" />
            <motion.div
                className="w-full md:w-1/2 p-8"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <img src={confirmEmail} alt="Confirm Email" className="mx-auto lg:w-[80%]" />
            </motion.div>
            <motion.div
                className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <h2 className="text-3xl font-bold text-violet-700 lg:px-16 py-3 w-full">
                    Forgot  <span className={`${theme == 'dark' ? 'text-white' : 'text-gray-900'}  `} > Password ? </span>
                </h2>
                <p className="text-xs -ml-44 mb-6" >Enter your email address to reset your password *</p>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    <Form className="flex flex-col gap-4 w-full max-w-md">
                        <InputField name="email" type="email" placeholder="Email" />
                        <motion.button
                            className="bg-violet-700 text-white font-bold py-2 px-4 rounded-md mt-3"
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 1 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Submit
                        </motion.button>
                    </Form>
                </Formik>
            </motion.div>
        </div>
    )
}
