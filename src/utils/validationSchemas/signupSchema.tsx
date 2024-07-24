import * as Yup from "yup";

export const signupSchema = Yup.object({
	userName: Yup.string()
		.required("Username is required")
		.min(3, "Username must be at least 3 characters")
		.max(30, "Username must not exceed 30 characters")
		.matches(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and hyphens")
		.matches(/^\S*$/, "Username must not contain spaces"),
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
		.required('Password is required'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password")], "Password not matched")
		.required("Confirm password")
		.matches(/^\S*$/, "Confirm password must not contain spaces"),
});