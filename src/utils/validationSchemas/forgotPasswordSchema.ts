import * as Yup from 'yup';

const forgotPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Password is required')
    .trim()
    .matches(/^\S+$/, 'Password cannot contain spaces')
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .trim()
    .matches(/^\S+$/, 'Confirm Password cannot contain spaces')
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
});

export default forgotPasswordSchema;