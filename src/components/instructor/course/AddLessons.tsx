import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import CourseInputField from "@/components/common/skeleton/CourseInputField";
import { CustomVideoFileInputDuration } from "@/components/common/fileInputs/videoInputDuration";
import TagInputField from "@/components/common/skeleton/TagInputField";
import { addCourseValidationSchema2 } from "@/validationSchemas/addCourseSchema2";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { Toaster, toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";

type Lesson = {
  lessonNumber: number;
  title: string;
  description: string;
  objectives: string[];
  video: string;
  duration: string;
};

export const AddLessons: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [individualUploadedLessons, setIndividualUploadedLessons] = useState<Lesson[]>([]);
  const [uploadedLessonIds, setUploadedLessonIds] = useState<number[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const isEditMode = location.state.oldData;
  console.log(isEditMode, "isi edit mode onn");

  useEffect(() => {
    if (isEditMode) {
      setLessons(location.state.oldData.lessons);
      console.log(location.state.oldData.lessons, "check lessons reached");
    } else {
      setLessons([{ lessonNumber: 1, title: "", description: "", objectives: [], video: "", duration: "" }]);
    }
  }, [isEditMode, location.state]);

  const initialValues = {
    lessons: lessons,
  };

  const handleSubmit = (values: any) => {
    if (values.lessons.length === 0) {
      toast.error("Please add lessons");
      return;
    }

    const allData = {
      ...location.state.allData,
      lessons: values.lessons,
    };

    console.log(allData, "form data second form");
    !isEditMode ?
    navigate('/instructor/add-others', { state: { allData } })
    :
    navigate('/instructor/add-others', { state: { allData, oldData: location.state.oldData  } })
  };

  const addLesson = (push: any) => {
    const newLessonNumber = lessons.length + 1;
    const newLesson = {
      lessonNumber: newLessonNumber,
      title: "",
      description: "",
      objectives: [],
      video: "",
      duration: ""
    };
    setLessons([...lessons, newLesson]);
    push(newLesson);
  };

  const removeLesson = (remove: any) => {
    if (lessons.length > 1) {
      setLessons(lessons.slice(0, -1));
      remove(lessons.length - 1);
    }
  };

  const uploadIndividualLesson = (lesson: Lesson) => {
    setIndividualUploadedLessons([...individualUploadedLessons, lesson]);
    setUploadedLessonIds([...uploadedLessonIds, lesson.lessonNumber]);
    console.log("Individual Lesson Uploaded:", lesson);
    toast.success(`Lesson ${lesson.lessonNumber} added successfully`);
  };

  return (
    <>
      <div className="max-w-full mx-auto py-10 px-10 text-white space-y-5">
        <Toaster richColors position="top-center" />
        <div className="mb-10 flex justify-between p-4">
          <h1 className="text-3xl font-bold">{isEditMode ? "Edit Lessons" : "Add Lessons"}</h1>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={addCourseValidationSchema2}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form>
              <FieldArray name="lessons">
                {({ push, remove }) => (
                  <>
                    {values.lessons.map((lesson, index) => {
                      const lessonErrors = errors.lessons?.[index] || {};
                      const lessonTouched = touched.lessons?.[index] || {};
                      const isLessonValid = !Object.keys(lessonErrors).length && Object.keys(lessonTouched).length;

                      return (
                        <div key={lesson.lessonNumber} className="collapse collapse-plus bg-gray-900 mb-5">
                          <input type="checkbox" name={`my-accordion-${index}`} defaultChecked={index === 0} />
                          <div className="collapse-title text-xl font-medium flex items-center justify-between">
                            Lesson {lesson.lessonNumber}
                            {uploadedLessonIds.includes(lesson.lessonNumber) && <DoneOutlineIcon color="success" />}
                          </div>
                          <div className="flex collapse-content">
                            <div className="w-[50%] p-5">
                              <CustomVideoFileInputDuration
                                onChange={(file) => {
                                  if (file) {
                                    setFieldValue(`lessons[${index}].video`, file.url);
                                    setFieldValue(`lessons[${index}].duration`, file.duration.toString());
                                  }
                                }}
                                theme="dark"
                                initialValue={{ url: lesson.video, duration: parseInt(lesson.duration, 10) }}
                              />
                              <ErrorMessage name={`lessons[${index}].video`} component="div" className="text-red-500 text-xs" />
                              <ErrorMessage name={`lessons[${index}].duration`} component="div" className="text-red-500 text-xs" />
                            </div>
                            <div className="w-[50%] p-5 space-y-7">
                              <div className="w-full">
                                <Field name={`lessons[${index}].title`} type="text" placeholder="Title" className="w-full p-3 bg-gray-800 border border-gray-700 rounded" />
                                <ErrorMessage name={`lessons[${index}].title`} component="div" className="text-red-500 text-xs" />
                              </div>
                              <div className="w-full">
                                <Field name={`lessons[${index}].description`} type="text" placeholder="Description" className="w-full p-3 bg-gray-800 border border-gray-700 rounded" />
                                <ErrorMessage name={`lessons[${index}].description`} component="div" className="text-red-500 text-xs" />
                              </div>
                              <div className="w-full">
                                <TagInputField
                                  tags={lesson.objectives}
                                  setTags={(tags) => setFieldValue(`lessons[${index}].objectives`, tags)}
                                />
                                <ErrorMessage name={`lessons[${index}].objectives`} component="div" className="text-red-500 text-xs" />
                              </div>
                              <button
                                className="btn btn-info"
                                type="button"
                                disabled={!isLessonValid}
                                onClick={() => uploadIndividualLesson(lesson)}
                              >
                                Upload Lesson
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="flex justify-end space-x-4">
                      <button className="btn btn-warning btn-outline" type="button" onClick={() => addLesson(push)}>
                        <AddIcon /> Add Lesson
                      </button>
                      <button className="btn btn-error btn-outline" type="button" onClick={() => removeLesson(remove)}>
                        <ClearIcon /> Remove Lesson
                      </button>
                    </div>
                  </>
                )}
              </FieldArray>
              <div className="flex justify-start mt-5">
                <button className="btn btn-primary" type="submit">
                  {isEditMode ? "Update Lessons" : "Upload All Lessons"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
