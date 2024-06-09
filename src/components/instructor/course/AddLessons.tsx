import React, { useState } from "react";
import { Formik, Form, FieldArray, ErrorMessage } from "formik";
import CourseInputField from "@/components/common/skeleton/CourseInputField";
import { CustomVideoFileInput } from "@/components/fileInputs/videoInput";
import TagInputField from "@/components/common/skeleton/TagInputField";
import { addCourseValidationSchema2 } from "@/validationSchemas/addCourseSchema2";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { Toaster, toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";


// Define the lesson type
type Lesson = {
	lessonNumber: number;
	title: string;
	description: string;
	objectives: string[];
	video: File | null;
};

export const AddLessons: React.FC = () => {
	// Set initial state with correct type
	const [lessons, setLessons] = useState<Lesson[]>([
		{ lessonNumber: 1, title: "", description: "", objectives: [], video: null },
	]);
	const [individualUploadedLessons, setIndividualUploadedLessons] = useState<Lesson[]>([]);
	const [allUploadedLessons, setAllUploadedLessons] = useState<Lesson[]>([]);
	const [uploadedLessonIds, setUploadedLessonIds] = useState<number[]>([]);
    const navigate = useNavigate()
    const location = useLocation()

    console.log(location.state,"first form course");
    

	const initialValues = {
		lessons: lessons,
	};

	const handleSubmit = (values: any) => {
		// Handle form submission
        if (values.length == 0) {
            toast.error("Please add lessons")
        }
		setAllUploadedLessons(values.lessons);
		console.log("All Lessons Uploaded:", values.lessons);

        const allData = {
            ...location.state.allData,
            ...values
        }
        console.log(allData,"form data second form");
        

        navigate('/instructor/add-others',{state: {allData}})
	};

	const addLesson = (push: any) => {
		const newLessonNumber = lessons.length + 1;
		const newLesson = {
			lessonNumber: newLessonNumber,
			title: "",
			description: "",
			objectives: [],
			video: null,
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
        toast.success(`Lesson ${lesson.lessonNumber} added successfully`)
	};

	return (
		<>
			<div className="max-w-full mx-auto py-10 px-10 text-white space-y-5">
                <Toaster richColors position="top-center" /> 
				<div className="mb-10 flex justify-between p-4">
					<h1 className="text-3xl font-bold">Add Lessons</h1>
				</div>
				<Formik
					initialValues={initialValues}
					validationSchema={addCourseValidationSchema2}
					onSubmit={handleSubmit}
				>
					{({ values, setFieldValue, errors, touched }) => (
						<Form>
							<FieldArray name="lessons">
								{({ push, remove }) => (
									<>
										{values.lessons.map((lesson, index) => {
											const lessonErrors = errors.lessons?.[index] || {};
											const lessonTouched = touched.lessons?.[index] || {};
											const isLessonValid =
												!Object.keys(lessonErrors).length &&
												Object.keys(lessonTouched).length;

											return (
												<div
													key={lesson.lessonNumber}
													className="collapse collapse-plus bg-gray-900 mb-5"
												>
													<input
														type="radio"
														name="my-accordion-3"
														defaultChecked={index === 0}
													/>
													<div className="collapse-title text-xl font-medium flex items-center justify-between">
														Lesson {lesson.lessonNumber}
														{uploadedLessonIds.includes(lesson.lessonNumber) && (
															<DoneOutlineIcon color="success" />
														)}
													</div>
													<div className="flex collapse-content">
														<div className="w-[50%] p-5">
															<CustomVideoFileInput
																onChange={(file) =>
																	setFieldValue(`lessons[${index}].video`, file)
																}
																theme="dark"
															/>
															<ErrorMessage
																name={`lessons[${index}].video`}
																component="div"
																className="text-red-500 text-xs"
															/>
														</div>
														<div className="w-[50%] p-5 space-y-7">
															<div className="w-full">
																<CourseInputField
																	name={`lessons[${index}].title`}
																	type="text"
																	placeholder="Title"
																/>
															</div>
															<div className="w-full">
																<CourseInputField
																	name={`lessons[${index}].description`}
																	type="text"
																	placeholder="Description"
																/>
															</div>
															<div className="w-full">
																<TagInputField
																	tags={lesson.objectives}
																	setTags={(tags) =>
																		setFieldValue(`lessons[${index}].objectives`, tags)
																	}
																/>
																<ErrorMessage
																	name={`lessons[${index}].objectives`}
																	component="div"
																	className="text-red-500 text-xs"
																/>
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
											<button
												className="btn btn-warning btn-outline"
												type="button"
												onClick={() => addLesson(push)}
											>
												<AddIcon />  Add Lesson
											</button>
											<button
												className="btn btn-error btn-outline"
												type="button"
												onClick={() => removeLesson(remove)}
											>
												 <ClearIcon /> Remove Lesson
											</button>
										</div>
									</>
								)}
							</FieldArray>
							<div className="flex justify-start mt-5">
								<button className="btn btn-primary" type="submit">
									Upload All Lessons
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</>
	);
};
