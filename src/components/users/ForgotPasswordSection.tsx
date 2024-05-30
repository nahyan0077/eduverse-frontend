import React from 'react';
import ForgotPass from '@/assets/auth/Forgot password.png';
import InputField from "@/components/common/skeleton/InputField";
import { Formik, Form } from 'formik';
import { motion } from 'framer-motion';
import forgotPasswordSchema from '@/validationSchemas/forgotPasswordSchema';
import PasswordField from '../auth/PasswordField';

export const ForgotPasswordSection: React.FC = () => {
    const initialValues = {
        password: "",
        confirmPassword: "",
    };

    const handleSubmit = (values: any) => {
        // Handle form submission
        console.log(values);
    };

    return (
        <div className="flex flex-col items-center min-h-screen -mt-20 max-w-7xl mx-auto md:flex-row">
            <motion.div
                className="w-full md:w-1/2 p-8"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <img src={ForgotPass} alt="Forgot Password" className="mx-auto" />
            </motion.div>
            <motion.div
                className="w-full md:w-1/2 p-8 flex items-center"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={forgotPasswordSchema}>
                    <Form className="flex flex-col gap-4 w-full max-w-md mx-auto">
                        <PasswordField name="password" placeholder="New Password"  />
                        <PasswordField name="confirmPassword" placeholder="Confirm Password" />
                        <motion.button
                        			className="bg-violet-700 text-white font-bold p-2 text-sm rounded-md mt-3"
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
    );
};