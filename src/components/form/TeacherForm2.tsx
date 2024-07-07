import React, { useState } from "react";
import InputField from "@/components/common/skeleton/InputField";
import { Field, Form, Formik } from "formik";
import teacher_form_image from "@/assets/form/teacher_form.png";
import { useTheme } from "../ui/theme-provider";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/hooks";
import { sendVerificationMail } from "@/redux/store/actions/auth/sendVerificaitionMail";
import { SignupFormData } from "@/types/IForms";
import LoadingPopUp from "../common/skeleton/LoadingPopUp";
import { CustomPdfFileInput } from "../common/fileInputs/pdfInput";
import { signupAction } from "@/redux/store/actions/auth";

const TeacherForm2: React.FC = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(false);

  const initialValues = {
    address: "",
    dateOfBirth: "",
    profession: "",
    qualification: "",
    social: "",
    cv: "",
  };

  const handleSubmit = async (value: any) => {
    setLoading(true);

    const allData: SignupFormData = {
      ...location.state,
      contact: {
        ...location.state.contact,
        address: value.address,
        social: value.social,
      },
      qualification: value.qualification,
      profession: value.profession,
      profile: {
        ...location.state.profile,
        dateOfBirth: value.dateOfBirth,
      },
      cv: value.cv,
    };

    if (!allData.isGAuth) {
      setLoading(true);
      await dispatch(sendVerificationMail(location.state.email));

      setLoading(false);
      navigate("/otp", { state: allData });
    } else {
      await dispatch(signupAction(allData));

      setLoading(false);
      navigate("/");
    }
  };

  return (
    <>
      <LoadingPopUp isLoading={isLoading} />
      <div className="max-w-7xl mx-auto p-5">
        <label
          htmlFor="student form"
          className="text-violet-700 text-xl md:text-3xl font-extrabold px-3">
          <span
            className={`${
              theme === "dark" ? "text-white" : "text-violet-700"
            }`}>
            Teacher
          </span>{" "}
          Enrollment Form
        </label>
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <img className="w-full h-auto" src={teacher_form_image} alt="" />
          </div>
          <div className="w-full md:w-1/2">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({ setFieldValue }) => (
                <Form>
                  <div className="flex flex-col md:flex-row gap-5 px-5 py-2">
                    <div className="w-full">
                      <InputField
                        name="address"
                        placeholder="Address"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-5 px-5 py-2">
                    <div className="w-full">
                      <InputField
                        name="dateOfBirth"
                        placeholder="Date of Birth"
                        type="date"
                      />
                    </div>
                    <div className="w-full ">
                      <label
                        htmlFor="date of birth"
                        className="block text-xs font-semibold mb-2">
                        PROFESSION
                      </label>
                      <Field
                        as="select"
                        className={`select w-full font-semibold ${
                          theme === "light"
                            ? "bg-gray-200 text-gray-400"
                            : "bg-gray-900 text-gray-400 "
                        }`}
                        name="profession">
                        <option value="">Select profession</option>
                        <option value="student">Student</option>
                        <option value="working">Working</option>
                      </Field>
                    </div>
                  </div>
                  <div className={`flex flex-col md:flex-row gap-5 px-5 py-2`}>
                    <div className="w-full md:w-1/2">
                      <InputField
                        name="qualification"
                        placeholder="Qualification"
                        type="text"
                      />
                    </div>
                    <div className="w-full md:w-1/2">
                      <InputField
                        name="social"
                        placeholder="Social"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col w-full gap-4 px-5 py-2">
                    <label
                      htmlFor="uploadcv"
                      className="block text-xs font-semibold ">
                      UPLOAD CV
                    </label>
                    <CustomPdfFileInput
                      onChange={(file) => setFieldValue("cv", file)}
                      theme={theme}
                    />
                  </div>
                  <div className="flex justify-end p-5 mt-5 items-center">
                    <button
                      type="submit"
                      className={`border bg-transparent border-violet-700 text-violet-200 text-sm hover:bg-violet-700 px-2 py-2 rounded-md flex items-center ${
                        theme === "light" ? "bg-violet-700" : "bg-gray-900"
                      }`}>
                      SUBMIT
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherForm2;
