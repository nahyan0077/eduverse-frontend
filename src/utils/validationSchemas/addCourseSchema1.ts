import * as Yup from "yup";

export const addCourseValidationSchema1 = Yup.object().shape({
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
		),
	thumbnail: Yup.string().required("Thumbnail is required"),
	video: Yup.string().required("Video is required"),
	language: Yup.string().required("Language is required"),
	category: Yup.string().required("Category is required"),
	pricing: Yup.string().required("Pricing is required"),
	certificate: Yup.boolean(),
});