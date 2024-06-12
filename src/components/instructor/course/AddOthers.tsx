import React from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import CourseInputField from "@/components/common/skeleton/CourseInputField";
import { CustomPdfFileInput } from "@/components/fileInputs/pdfInput";
import { CourseEntity } from "@/types/ICourse";
import { useAppDispatch } from "@/hooks/hooks";
import { createCourseAction } from "@/redux/store/actions/course";
import { addCourseValidationSchema1 } from "@/validationSchemas/addCourseSchema1";
import { addCourseValidationSchema33 } from "@/validationSchemas/addCourseSchema3";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";



export const AddOthers: React.FC = () => {
    const location = useLocation();
    const dispatch = useAppDispatch()
    const {data} = useSelector((state: RootState) => state.user)
    const navigate = useNavigate()


    if (!location.state || !location.state.allData) {
        console.error("Location state is missing or malformed");
        return <div>Error: Location state is missing or malformed</div>;
    }

    console.log(location.state, "in third form all other data");

    const initialValues = {
        title: "",
        url: null,
        price: "",
        level: ""
    };

    const handleSubmit = async (values: any) => {
        console.log(values, "form data price...");

        const allData: CourseEntity = {
            title: location.state.allData.title,
            categoryRef: location.state.allData.category,
            instructorRef: data?._id,
            description: location.state.allData.description,
            lessons: location.state.allData.lessons,
            thumbnail: location.state.allData.thumbnail,
            language: location.state.allData.language,
            trial: {
                video: location.state.allData.video,
            },
            pricing: {
                amount: values.price,
                type: location.state.allData.pricing,
            },
            attachments: {
                title: values.title,
                url: values.url,
            },
            level: values.level 
        };

        console.log(allData, "final course data------>");

        const response = await dispatch(createCourseAction(allData))

        console.log(response,"course creat response");

        navigate('/instructor/courses')
    };

    return (
        <>
            <div className="max-w-full mx-auto py-10 px-10 text-white space-y-5-full">
                <div className="mb-10 flex justify-between p-4">
                    <h1 className="text-3xl font-bold">Other Data</h1>
                </div>
                <div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={ location.state.allData.price == 'paid' ? addCourseValidationSchema1 :  addCourseValidationSchema33 }
                        onSubmit={handleSubmit}
                    >
                        {({ setFieldValue, values, errors }) => (
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
                                        <ErrorMessage
                                            name="url"
                                            component="div"
                                            className="text-red-500 text-xs"
                                        />
                                        <CourseInputField
                                            name="title"
                                            placeholder="Title"
                                            type="text"
                                        />
                                        <ErrorMessage
                                            name="title"
                                            component="div"
                                            className="text-red-500 text-xs"
                                        />
                                    </div>
                                    <div className="w-[50%] space-y-8">
                                        {location.state.allData.pricing === "paid" ? (
                                            <>
                                                <label htmlFor="priceField" className="text-md font-bold">
                                                    COURSE PRICE DETAILS
                                                </label>
                                                <CourseInputField
                                                    name="price"
                                                    placeholder="Price"
                                                    type="text"
                                                />
                                                <ErrorMessage
                                                    name="price"
                                                    component="div"
                                                    className="text-red-500 text-xs"
                                                />
                                            </>
                                        ) : (
                                            <div className=""></div>
                                        )}
                                        <div className="space-y-2">
                                            <label htmlFor="level" className="text-xs font-semibold">
                                                COURSE LEVEL
                                            </label>
                                            <Field
                                                as="select"
                                                name="level"
                                                className="select select-bordered bg-gray-800 w-full max-w-full"
                                            >
                                                <option value="" label="Select course level" />
                                                <option value="beginner" label="Beginner" />
                                                <option value="intermediate" label="Intermediate" />
                                                <option value="expert" label="Expert" />
                                            </Field>
                                            <ErrorMessage
                                                name="level"
                                                component="div"
                                                className="text-red-500 text-xs"
                                            />
                                        </div>
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
