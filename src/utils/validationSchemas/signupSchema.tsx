import * as Yup from "yup";

export const signupSchema = Yup.object({
	userName: Yup.string()
		.required("Username is required")
		.matches(/^\S*$/, "Username must not contain spaces"),
	email: Yup.string()
        .email('Invalid email format')
        .required('Email is required')
        .matches(/^\S*$/, 'Email must not contain spaces'),
	password: Yup.string()
		.min(6, "Password must be at least 6 characters")
		.required("Password is required")
		.matches(/^\S*$/, "Password must not contain spaces"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password")], "Password not matched")
		.required("Confirm password")
		.matches(/^\S*$/, "Confirm password must not contain spaces"),
});