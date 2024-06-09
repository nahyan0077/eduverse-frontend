import * as Yup from 'yup'


// Define validation schema
export const addCourseValidationSchema3 = Yup.object().shape({
    title: Yup.string()
        .required("Course title is required")
        .test(
            "no-consecutive-spaces",
            "Course title cannot have more than two consecutive spaces",
            (value) => !/\s{3,}/.test(value || "")
        ),
    url: Yup.mixed().required("PDF is required"),
    price: Yup.string()
        .matches(/^\d+$/, "Price must be a number")
        .required("Price is required"),
    level: Yup.string().required("Course level is required")
});
export const addCourseValidationSchema33 = Yup.object().shape({
    title: Yup.string()
        .required("Course title is required")
        .test(
            "no-consecutive-spaces",
            "Course title cannot have more than two consecutive spaces",
            (value) => !/\s{3,}/.test(value || "")
        ),
    url: Yup.mixed().required("PDF is required"),
    price: Yup.string()
        .matches(/^\d+$/, "Price must be a number"),
    level: Yup.string().required("Course level is required")
});