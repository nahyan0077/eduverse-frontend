import React from 'react';
import ForgotPass from '@/assets/auth/Forgot password.png';
import InputField from "@/components/common/skeleton/InputField";
import { Formik } from 'formik';
import { Form, useSubmit } from 'react-router-dom';

export const ForgotPasswordSection: React.FC = () => {
    const initialValues = {
        phone: "",
    };

    const submit = useSubmit();

    const handleSubmit = (values: any) => {
        submit(values, { method: 'post' });
    };

    return (
        <div className="flex justify-around min-h-screen max-w-7xl mx-auto">
            <div className="w-[50%]">
                <img src={ForgotPass} alt="Forgot Password" />
            </div>
            <div className="w-[50%]">
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    <Form>
                        <InputField name="phone" placeholder="Phone" type="text" />
                        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};
