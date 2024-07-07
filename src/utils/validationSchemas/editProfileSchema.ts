import * as Yup from "yup";

// Regex to disallow more than 3 consecutive spaces
const noMoreThan3ConsecutiveSpaces = /^(?!.*?\s{4})/;

// Regex for valid social media links
const socialMediaRegex =
	/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

const noSpacesAndNumbers = /^[^\s\d]+$/;

export const editProfileValidationSchema = Yup.object().shape({
	firstName: Yup.string()
		.matches(/^[a-zA-Z]+$/,"This field can't have other characters")
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
	address: Yup.string()
		.matches(
			noMoreThan3ConsecutiveSpaces,
			"Cannot have more than 3 consecutive spaces"
		)
		.required("Address is required"),
	dateOfBirth: Yup.date()
		.max(
			new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 5),
			"You must be at least 5 years old"
		)
		.required("Date of birth is required"),
	profession: Yup.string()
		.matches(
			noMoreThan3ConsecutiveSpaces,
			"Cannot have more than 3 consecutive spaces"
		)
		.required("Profession is required"),
	social: Yup.string()
		.matches(socialMediaRegex, "Please enter a valid social media link")
		.matches(
			noMoreThan3ConsecutiveSpaces,
			"Cannot have more than 3 consecutive spaces"
		)
		.required("Social media link is required"),
    avatar: Yup.string().required("Thumbnail is required"),
});


