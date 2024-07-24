import * as Yup from 'yup';

export const loginSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required')
        .matches(/^\S*$/, 'Email must not contain spaces')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .max(50, 'Password must not exceed 50 characters')
        .matches(/^(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
        .matches(/^(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
        .matches(/^(?=.*\d)/, 'Password must contain at least one number')
        .matches(/^(?=.*[!@#$%^&*])/, 'Password must contain at least one special character (!@#$%^&*)')
        .matches(/^\S*$/, 'Password must not contain spaces')
        .required('Password is required')
});
