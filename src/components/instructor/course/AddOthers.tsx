import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import CourseInputField from "@/components/common/skeleton/CourseInputField";
import { CustomPdfFileInput } from "@/components/common/fileInputs/pdfInput";
import { CourseEntity } from "@/types/ICourse";
import { useAppDispatch } from "@/hooks/hooks";
import { createCourseAction } from "@/redux/store/actions/course";
import { addCourseValidationSchema1 } from "@/validationSchemas/addCourseSchema1";
import { addCourseValidationSchema33 } from "@/validationSchemas/addCourseSchema3";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export const AddOthers: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { data } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const editMode = location.state.oldData;

  if (!location.state || !location.state.allData) {
    console.error("Location state is missing or malformed");
    return <div>Error: Location state is missing or malformed</div>;
  }

  const initialValues = {
    title: editMode ? location.state.oldData.attachments?.title || "" : "",
    url: editMode ? location.state.oldData.attachments?.url || null : null,
    price: editMode ? location.state.oldData.pricing?.amount || "" : "",
    level: editMode ? location.state.oldData.level || "" : "",
  };

  const handleSubmit = async (values: any) => {
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
      level: values.level,
    };

    const response = await dispatch(createCourseAction(allData));
    console.log(response, "course create response");

    navigate("/instructor/courses");
  };

  return (
    <div className="max-w-full mx-auto py-10 px-10 text-white space-y-5-full">
      <div className="mb-10 flex justify-between p-4">
        <h1 className="text-3xl font-bold">Other Data</h1>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={
          location.state.allData.pricing === "paid"
            ? addCourseValidationSchema1
            : addCourseValidationSchema33
        }
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className="flex space-x-6">
              <div className="w-[50%] space-y-6">
                <label
                  htmlFor="pdfField"
                  className="text-md font-bold"
                >
                  UPLOAD ADDITIONAL ATTACHMENTS
                </label>
                <CustomPdfFileInput
                  onChange={(file) => setFieldValue("url", file)}
                  theme="dark"
                  initialValue={initialValues.url}
                />
                <ErrorMessage
                  name="url"
                  component="div"
                  className="text-red-500 text-xs"
                />
                <label htmlFor="title" className="block text-xs font-semibold">
                  TITLE
                </label>
                <Field
                  name="title"
                  placeholder="Title"
                  type="text"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>
              <div className="w-[50%] space-y-4">
                {location.state.allData.pricing === "paid" && (
                  <>
                    <label
                      htmlFor="priceField"
                      className="text-md font-bold"
                    >
                      COURSE PRICE DETAILS
                    </label>
                    <Field
                      name="price"
                      placeholder="Price"
                      type="text"
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded focus:outline-none"
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </>
                )}
                <div className="space-y-2">
                  <label
                    htmlFor="level"
                    className="text-xs font-semibold"
                  >
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
              <button
                className="btn btn-info btn-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddOthers;

