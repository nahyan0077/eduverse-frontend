import * as Yup from 'yup';

export const loginSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required')
        .matches(/^\S*$/, 'Email must not contain spaces'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
        .matches(/^\S*$/, 'Password must not contain spaces')
});
