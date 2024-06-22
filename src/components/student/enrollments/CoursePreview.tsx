import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "@/hooks/hooks";
import { UpdateLessonProgressAction, getEnrollmentByIdAction } from "@/redux/store/actions/enrollment";
import { EnrollmentEntity } from "@/types/IEnrollment";
import { unwrapResult } from "@reduxjs/toolkit";
import BeenhereIcon from '@mui/icons-material/Beenhere';
import PendingIcon from '@mui/icons-material/Pending';


export const CoursePreview: React.FC = () => {
    const location = useLocation();
    const courseData = location.state.courseData;
    const enrollmentId: string = location.state.enrollmentId;
    const [previewVideo, setPreviewVideo] = useState(courseData?.trial?.video);
    const [progress, setProgress] = useState<{ [key: string]: number }>({});
    const [completed, setCompleted] = useState<{ [key: string]: boolean }>({});
    const [enrollment, setEnrollment] = useState<EnrollmentEntity | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        fetchEnrollment();
    }, []);

    const totalLessons: number = courseData.lessons.length;

    const fetchEnrollment = async () => {
        try {
            const result = await dispatch(getEnrollmentByIdAction(enrollmentId));
            const enrollmentData = unwrapResult(result);
            setEnrollment(enrollmentData.data);
            initializeProgress(enrollmentData.data);
			console.log(enrollmentData,"enrol data");
			
        } catch (error) {
            console.error("Failed to fetch enrollment:", error);
        }
    };

    const initializeProgress = (enrollmentData: EnrollmentEntity) => {
        if (enrollmentData.progress?.completedLessons) {
            const completedLessons = enrollmentData.progress.completedLessons.reduce((acc, lessonId) => {
                acc[lessonId] = true;
                return acc;
            }, {} as { [key: string]: boolean });

            setCompleted(completedLessons);
        }
    };

    const handleProgress = async (played: number, lessonId: string) => {
        setProgress((prev) => ({ ...prev, [lessonId]: played }));

        if (played >= 0.7 && !completed[lessonId]) {
            setCompleted((prev) => ({ ...prev, [lessonId]: true }));

            const response = await dispatch(UpdateLessonProgressAction({
                enrollmentId,
                lessonId,
                totalLessons
            }));

            console.log("Updated lesson progress:", response);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="max-w-full w-full px-5 py-2">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                    <div className="col-span-3 flex justify-between items-center skeleton bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-4">{courseData?.title}</h2>
						{enrollment?.completionStatus == "completed" ? 
						<span className="text-green-400 font-bold mr-2" ><BeenhereIcon color="success" className="mr-2" />COMPLETED</span>: 
						<span className="text-orange-500-400 font-bold mr-2" ><PendingIcon color="warning" className="mr-2" />IN-PROGRESS</span> }
                    </div>
                    <div className="col-span-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                        <ReactPlayer
                            url={previewVideo}
                            width="100%"
                            height="100%"
                            controls={true}
                            className="rounded-lg overflow-hidden"
                            onProgress={({ played }) => {
                                const currentLesson = courseData.lessons.find((lesson: any) => lesson.video === previewVideo);
                                if (currentLesson) {
                                    handleProgress(played, currentLesson._id);
                                }
                            }}
                        />
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold mb-4">Lessons</h2>
                        <div className="flex flex-col space-y-2">
                            {courseData?.lessons.map((lesson: any) => (
                                <div
                                    key={lesson.lessonNumber}
                                    className="collapse collapse-arrow bg-base-200"
                                    onClick={() => setPreviewVideo(lesson.video)}
                                >
                                    <input type="radio" name="my-accordion-2" />
                                    <div className="collapse-title text-md font-medium">
                                        {lesson.lessonNumber}. {lesson.title} {completed[lesson._id] ? "✅" : ""}
                                    </div>
                                    <div className="text-sm collapse-content">
                                        <p className="p-2">{lesson.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
