import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "@/hooks/hooks";
import { UpdateLessonProgressAction, getEnrollmentByIdAction } from "@/redux/store/actions/enrollment";
import { EnrollmentEntity } from "@/types/IEnrollment";
import { unwrapResult } from "@reduxjs/toolkit";
import BeenhereIcon from '@mui/icons-material/Beenhere';
import PendingIcon from '@mui/icons-material/Pending';
import DownloadIcon from '@mui/icons-material/Download';

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
            console.log(progress,"test");
            
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

            await dispatch(UpdateLessonProgressAction({
                enrollmentId,
                lessonId,
                totalLessons
            }));
        }
    };

    const allLessonsCompleted = courseData.lessons.every((lesson: any) => completed[lesson._id]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 py-8">
            <div className="container mx-auto px-4">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold">{courseData?.title}</h1>
                        {enrollment?.completionStatus === "completed" ? 
                            <span className="text-green-500 font-semibold flex items-center">
                                <BeenhereIcon className="mr-2" />COMPLETED
                            </span> : 
                            <span className="text-orange-500 font-semibold flex items-center">
                                <PendingIcon className="mr-2" />IN-PROGRESS
                            </span>
                        }
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <ReactPlayer
                                url={previewVideo}
                                width="100%"
                                height="480px"
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
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-6">Lessons</h2>
                        <div className="space-y-4">
                            {courseData?.lessons.map((lesson: any) => (
                                <div
                                    key={lesson.lessonNumber}
                                    className="collapse collapse-arrow bg-gray-100 dark:bg-gray-700 rounded-lg"
                                >
                                    <input type="radio" name="my-accordion-2" />
                                    <div 
                                        className="collapse-title text-lg font-medium flex items-center justify-between cursor-pointer"
                                        onClick={() => setPreviewVideo(lesson.video)}
                                    >
                                        <span>{lesson.lessonNumber}. {lesson.title}</span>
                                        {completed[lesson._id] && <BeenhereIcon className="text-green-500" />}
                                    </div>
                                    <div className="collapse-content text-sm">
                                        <p className="p-2">{lesson.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {allLessonsCompleted && (
                            <button className="btn btn-primary w-full mt-8 flex items-center justify-center">
                                <DownloadIcon className="mr-2" /> Download Certificate
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};