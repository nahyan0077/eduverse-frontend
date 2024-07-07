import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/redux/store";
import { getCoursesByInstructorIdAction } from "@/redux/store/actions/course";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import {
  createAssessmentAction,
  getAssessmentByIdAction,
  getAssessmentsByCourseIdAction,
  updateAssessmentAction,
} from "@/redux/store/actions/assessment";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";

export const AddExam: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state: RootState) => state.user);
  const [allCourses, setAllCourses] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditMode, setIsEditMode] = useState(false);
  const [initialValues, setInitialValues] = useState({
    courseId: "",
    title: "",
    questionScore: 1,
    passingScore: 0,
    questions: Array(5).fill({
      question: "",
      options: { 1: "", 2: "", 3: "", 4: "" },
      answer: "",
    }),
  });

  useEffect(() => {
    fetchCourses();
    const searchParams = new URLSearchParams(location.search);
    const assessmentId = searchParams.get("assessmentId");
    if (assessmentId) {
      setIsEditMode(true);
      fetchExamData(assessmentId);
    }
  }, [data, location]);

  const fetchCourses = async () => {
    if (data?._id) {
      const response = await dispatch(
        getCoursesByInstructorIdAction(data?._id)
      );
      setAllCourses(response.payload.data);
    }
  };

  const fetchExamData = async (assessmentId: string) => {
    const response = await dispatch(getAssessmentByIdAction(assessmentId));
    if (response.payload.data) {
      const examData = response.payload.data;
      console.log("fetch exam data", examData);

      setInitialValues({
        courseId: examData.courseId._id,
        title: examData.title,
        questionScore: examData.questionScore,
        passingScore: examData.passingScore,
        questions: examData.questions,
      });
    }
  };

  const handleSubmit = async (values: any) => {
    const formattedValues = {
      ...values,
      instructorId: data?._id,
      type: "exam",
      totalScore: values.questionScore * values.questions.length,
    };

    if (isEditMode) {
      const searchParams = new URLSearchParams(location.search);
      const assessmentId = searchParams.get("assessmentId");
      const response = await dispatch(
        updateAssessmentAction({ _id: assessmentId, ...formattedValues })
      );

      if (response.payload.success) {
        toast.success("Exam updated successfully!");
        navigate("/instructor/exams");
      } else {
        toast.error("Failed to update exam. Please try again.");
      }
    } else {
      const existingExam = await dispatch(
        getAssessmentsByCourseIdAction(formattedValues.courseId)
      );
      if (existingExam.payload.data.length > 0) {
        toast.error("Exam in this course already exists!");
        return;
      } else {
        const response = await dispatch(
          createAssessmentAction(formattedValues)
        );
        if (response.payload.success) {
          toast.success("Exam added successfully!");
          navigate("/instructor/exams");
        } else {
          toast.error("Failed to add exam. Please try again.");
        }
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6">
        {isEditMode ? "Edit Exam" : "Add Exam"}
      </h2>
      <Formik
        initialValues={initialValues}
        // validationSchema={examValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}>
        {({ values }) => (
          <Form className="space-y-6">
            {!isEditMode && (
              <div>
                <label htmlFor="courseId" className="label">
                  <span className="label-text">Select Course</span>
                </label>
                <Field
                  as="select"
                  name="courseId"
                  className="select select-primary w-full bg-gray-100 dark:bg-gray-900">
                  <option value="">Choose a course</option>
                  {allCourses.map((course: any) => (
                    <option key={course._id} value={course._id}>
                      {course.title}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="courseId"
                  component="div"
                  className="text-red-500 mt-1 text-xs"
                />
              </div>
            )}
            <div>
              <label htmlFor="title" className="label">
                <span className="label-text">Exam Name</span>
              </label>
              <Field
                type="text"
                name="title"
                placeholder="Enter exam name"
                className="input input-bordered input-primary w-full bg-gray-100 dark:bg-gray-900"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 mt-1 text-xs"
              />
            </div>

            <div>
              <label htmlFor="questionScore" className="label">
                <span className="label-text">Question Score</span>
              </label>
              <Field
                type="number"
                name="questionScore"
                className="input input-bordered input-primary w-full bg-gray-100 dark:bg-gray-900"
              />
              <ErrorMessage
                name="questionScore"
                component="div"
                className="text-red-500 mt-1 text-xs"
              />
            </div>

            <div>
              <label htmlFor="passingScore" className="label">
                <span className="label-text">Passing Score</span>
              </label>
              <Field
                type="number"
                name="passingScore"
                className="input input-bordered input-primary w-full bg-gray-100 dark:bg-gray-900"
              />
              <ErrorMessage
                name="passingScore"
                component="div"
                className="text-red-500 mt-1 text-xs"
              />
            </div>

            <FieldArray name="questions">
              {() => (
                <div>
                  <h3 className="text-xl font-semibold mb-4">Questions</h3>
                  {values.questions.map((_, index) => (
                    <div
                      key={index}
                      className="collapse collapse-arrow dark:bg-gray-950 mb-4">
                      <input
                        type="checkbox"
                        name={`question-${index}`}
                        defaultChecked={index === 0}
                      />
                      <div className="collapse-title text-xl font-medium">
                        Question {index + 1}
                      </div>
                      <div className="collapse-content">
                        <Field
                          as="textarea"
                          name={`questions.${index}.question`}
                          className="textarea textarea-primary w-full mb-4 bg-gray-100 dark:bg-gray-900"
                          placeholder="Enter your question here"
                        />
                        <ErrorMessage
                          name={`questions.${index}.question`}
                          component="div"
                          className="text-red-500 mt-1 text-xs"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[1, 2, 3, 4].map((optionNum) => (
                            <div key={optionNum}>
                              <label className="label">
                                <span className="label-text">
                                  Option {optionNum}
                                </span>
                              </label>
                              <Field
                                type="text"
                                name={`questions.${index}.options.${optionNum}`}
                                className="input input-bordered input-primary w-full bg-gray-100 dark:bg-gray-900"
                                placeholder={`Enter option ${optionNum}`}
                              />
                              <ErrorMessage
                                name={`questions.${index}.options.${optionNum}`}
                                component="div"
                                className="text-red-500 mt-1 text-xs"
                              />
                            </div>
                          ))}
                        </div>

                        <div className="mt-4">
                          <label className="label">
                            <span className="label-text">Correct Answer</span>
                          </label>
                          <Field
                            as="select"
                            name={`questions.${index}.answer`}
                            className="select select-primary w-full bg-gray-100 dark:bg-gray-900">
                            <option value="">Select correct answer</option>
                            {[1, 2, 3, 4].map((optionNum) => (
                              <option
                                key={optionNum}
                                value={optionNum.toString()}>
                                Option {optionNum}
                              </option>
                            ))}
                          </Field>
                          <ErrorMessage
                            name={`questions.${index}.answer`}
                            component="div"
                            className="text-red-500 mt-1 text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </FieldArray>

            <div className="mt-8 flex justify-end">
              <button type="submit" className="btn btn-primary btn-outline">
                {isEditMode ? "Update Exam" : "Save Exam"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
