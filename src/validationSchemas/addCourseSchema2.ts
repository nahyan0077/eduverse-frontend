import * as Yup from "yup";

export const addCourseValidationSchema2 = Yup.object().shape({
    lessons: Yup.array().of(
        Yup.object().shape({
            title: Yup.string()
                .required("Course title is required")
                .test(
                    "no-consecutive-spaces",
                    "Course title cannot have more than two consecutive spaces",
                    (value) => !/\s{3,}/.test(value || "")
                ),
            description: Yup.string()
                .required("Description is required")
                .test(
                    "no-consecutive-spaces",
                    "Description cannot have more than two consecutive spaces",
                    (value) => !/\s{3,}/.test(value || "")
                )
                .min(20, "Description must be at least 20 characters"),
            tags: Yup.array()
                .min(2, "At least 2 objectives are required")
                .max(5, "No more than 5 objectives are allowed")
                .of(Yup.string().required("Objective is required")),
            video: Yup.mixed().required("Video is required"),
        })
    ),
});