import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";

export const CoursePreview: React.FC = () => {
	const location = useLocation();
	const courseData = location.state.courseData;
	const enrollmentId = location.state.enrollmentId;
    const [previewVideo, setPreviewVideo] = useState(courseData?.trial?.video);
    const [progress, setProgress] = useState<{ [key: number]: number }>({});
    const [completed, setCompleted] = useState<{ [key: number]: boolean }>({});

    
    
	console.log(courseData, "course preview page data");

	const handleProgress = (played: number, index: number) => {
		setProgress(prev => ({ ...prev, [index]: played }));

		if (played >= 0.7 && !completed[index]) {
			setCompleted(prev => ({ ...prev, [index]: true }));
		}
	};
    
    console.log(progress,"check progrss");
    console.log(completed,"check completed lessons");
	return (
		<>
			<div className="min-h-screen flex flex-col items-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
				<div className="max-w-full w-full px-5 py-2">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
						{/* Left Section: Video Preview */}
						<div className="col-span-3 skeleton bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
							<h2 className="text-2xl font-bold mb-4">{courseData?.title}</h2>
						</div>
						<div className="col-span-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
							<ReactPlayer
								url={previewVideo}
								width="100%"
								height="100%"
								controls={true}
								className="rounded-lg overflow-hidden"
								onProgress={({ played }) => handleProgress(played, courseData.lessons.findIndex((lesson: any) => lesson.video === previewVideo))}
							/>
						</div>

						{/* Right Section: Lessons */}
						<div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
							<h2 className="text-xl font-bold mb-4">Lessons</h2>
							<div className="flex flex-col space-y-2">
								{courseData?.lessons.map((lesson: any, index: number) => (
									<div key={index} className="collapse collapse-arrow bg-base-200" onClick={() => setPreviewVideo(lesson.video)}>
										<input type="radio" name="my-accordion-2" />
										<div className="collapse-title text-md font-medium">
											{index + 1}. {lesson.title} {completed[index] ? "✅" : ""}
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
		</>
	);
};
