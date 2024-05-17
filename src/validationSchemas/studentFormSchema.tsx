import * as Yup from "yup";

// Custom regex to disallow spaces and numbers
const noSpacesAndNumbers = /^[^\s\d]+$/;

const studentFormSchema = Yup.object().shape({
    firstname: Yup.string()
        .matches(noSpacesAndNumbers, "Firstname cannot contain spaces or numbers")
        .required("Firstname is required"),
    lastname: Yup.string()
        .matches(noSpacesAndNumbers, "Lastname cannot contain spaces or numbers")
        .required("Lastname is required"),
    username: Yup.string()
        .matches(/^[^\s]+$/, "Username cannot contain spaces")
        .required("Username is required"),
    email: Yup.string()
        .email("Invalid email address")
        .matches(/^[^\s]+$/, "Email cannot contain spaces")
        .required("Email is required"),
    phone: Yup.string()
        .matches(/^[^\s]+$/, "Phone number cannot contain spaces")
        .matches(/^[0-9]+$/, "Phone number must be numeric")
        .required("Phone number is required"),
    gender: Yup.string()
        .oneOf(["male", "female"], "Please select a valid gender")
        .required("Gender is required"),
});

export default studentFormSchema;
