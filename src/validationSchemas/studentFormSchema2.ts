import * as Yup from "yup";



// Regex to disallow more than 3 consecutive spaces
const noMoreThan3ConsecutiveSpaces = /^(?!.*?\s{4})/;

// Regex for valid social media links
const socialMediaRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

const studentFormSchema2 = Yup.object().shape({
  address: Yup.string()
    .matches(noMoreThan3ConsecutiveSpaces, "Cannot have more than 3 consecutive spaces")
    .required("Address is required"),
  dateOfBirth: Yup.date()
    .max(new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 5), "You must be at least 5 years old")
    .required("Date of birth is required"),
  profession: Yup.string()
    .matches(noMoreThan3ConsecutiveSpaces, "Cannot have more than 3 consecutive spaces")
    .required("Profession is required"),
  qualification: Yup.string()
    .matches(noMoreThan3ConsecutiveSpaces, "Cannot have more than 3 consecutive spaces")
    .required("Qualification is required"),
  social: Yup.string()
    .matches(socialMediaRegex, "Please enter a valid social media link")
    .matches(noMoreThan3ConsecutiveSpaces, "Cannot have more than 3 consecutive spaces")
    .required("Social media link is required"),
});

export default studentFormSchema2;