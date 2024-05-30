import React from "react";
import { Formik, Form } from 'formik';
import { motion } from 'framer-motion';
import confirmEmail from '@/assets/auth/confirm-email-forgot-pass.png'
import InputField from "@/components/common/skeleton/InputField";
import { useAppDispatch } from "@/hooks/hooks";
import { findEmailAction } from "@/redux/store/actions/auth";
import { toast, ToastContainer } from "react-toastify";

export const ConfirmEmailForgotPassword: React.FC = () => {
    const initialValues = {
        email: "",
    };

    const dispatch = useAppDispatch()

    const handleSubmit = async (values: any) => {
        // Handle form submission
        console.log(values.email);

        const response = await dispatch(findEmailAction(values.email))

        console.log(response,"comf pass");

        if(!response.payload.success){
            console.log("this user not exist");
            
        }else{
            toast.error('User not existt in this email', {
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
        

    };

    return (
        <div className="flex flex-col items-center min-h-screen max-w-7xl mx-auto md:flex-row -mt-20">
             <ToastContainer />
            <motion.div
                className="w-full md:w-1/2 p-8"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <img src={confirmEmail} alt="Confirm Email" className="mx-auto" />
            </motion.div>
            <motion.div
                className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <h2 className="text-3xl font-bold text-violet-700 mb-6 px-10 py-3 w-full">
                    Confirm Email
                </h2>
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
