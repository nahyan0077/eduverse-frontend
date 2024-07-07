import * as Yup from "yup";

// Custom regex to disallow spaces and numbers
const noSpacesAndNumbers = /^[^\s\d]+$/;

const teacherFormSchema1 = Yup.object().shape({
    firstName: Yup.string()
        .matches(noSpacesAndNumbers, "Firstname cannot contain spaces or numbers")
        .required("Firstname is required"),
    lastName: Yup.string()
        .matches(noSpacesAndNumbers, "Lastname cannot contain spaces or numbers")
        .required("Lastname is required"),
    phone: Yup.string()
        .matches(/^[^\s]+$/, "Phone number cannot contain spaces")
        .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
        .matches(/^[0-9]+$/, "Phone number must be numeric")
        .required("Phone number is required"),
    gender: Yup.string()
        .oneOf(["male", "female"], "Please select a valid gender")
        .required("Gender is required"),
});

export default teacherFormSchema1;
