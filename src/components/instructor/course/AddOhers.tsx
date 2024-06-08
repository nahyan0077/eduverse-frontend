import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";
import CourseInputField from "@/components/common/skeleton/CourseInputField";
import { CustomPdfFileInput } from "@/components/fileInputs/pdfInput";
import { CourseEntity } from "@/types/ICourse";

// Define validation schema
const validationSchema = Yup.object().shape({
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
        .required("Price is required")
});

export const AddOthers: React.FC = () => {
    const location = useLocation();

    console.log(location.state, "in third form all other data");

    const initialValues = {
        title: "",
        url: null,
        price: ""
    };

    const handleSubmit = (values: any) => {
        console.log(values, "form data price...");

        const allData: CourseEntity = {
            title: location.state.allData.title,
            description: location.state.allData.description,
            lessons: location.state.allData.lessons,
            thumbnail: location.state.allData.thumbnail,
            language: location.state.allData.language,
            trial: {
                video: location.state.allData.video
            },
            pricing: {
                amount: values.price,
                type: location.state.allData.pricing
            },
            attachments: {
                title: values.title,
                url: values.url
            },
        }

        console.log(allData,"final course data------>");
        
    };

    return (
        <>
            <div className="max-w-full mx-auto py-10 px-10 text-white space-y-5-full ">
                <div className="mb-10 flex justify-between p-4">
                    <h1 className="text-3xl font-bold">Other Datas</h1>
                </div>
                <div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ setFieldValue }) => (
                            <Form>
                                <div className="flex space-x-6">
                                    <div className="w-[50%] space-y-8">
                                        <label htmlFor="pdfField" className="text-md font-bold">
                                            UPLOAD ADDITIONAL ATTACHMENTS
                                        </label>
                                        <CustomPdfFileInput
                                            onChange={(file) => setFieldValue("url", file)}
                                            theme="dark"
                                        />
                                        <ErrorMessage name="url" component="div" className="text-red-500 text-xs" />
                                        <CourseInputField
                                            name="title"
                                            placeholder="title"
                                            type="text"
                                        />
                                        
                                    </div>
                                    <div className="w-[50%] space-y-8">
                                        <label htmlFor="priceField" className="text-md font-bold">
                                            COURSE PRICE DETAILS
                                        </label>
                                        <CourseInputField
                                            name="price"
                                            placeholder="price"
                                            type="text"
                                        />
                                       
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <button className="btn btn-info btn-outline" type="submit">
                                        Submit
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};
