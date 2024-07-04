import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getAssessmentByIdAction } from "@/redux/store/actions/assessment";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import timesup from "@/assets/exam/timesup.svg";
import { useNavigate } from "react-router-dom";
import DownloadIcon from "@mui/icons-material/Download";
import { generateCertificate } from "@/redux/store/actions/course/generateCertificate";
import { RootState } from "@/redux/store";
import { createOrUpdateResultAction } from "@/redux/store/actions/result";
import { toast } from "sonner";
import success from "@/assets/exam/success.svg";
import failed from "@/assets/exam/failed.svg";

export const StudentExam: React.FC = () => {
	const searchParams = new URLSearchParams(location.search);
	const examId = searchParams.get("examId");
	const dispatch = useAppDispatch();

	const [examData, setExamData] = useState<any>(null);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState<{
		[key: string]: string;
	}>({});
	const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
	const [showTimeUpModal, setShowTimeUpModal] = useState(false);
	const [showResultModal, setShowResultModal] = useState(false);
	const [examResult, setExamResult] = useState<{
		score: number;
		passed: boolean;
		correctAnswers: number;
		wrongAnswers: number;
	}>({ score: 0, passed: false, correctAnswers: 0, wrongAnswers: 0 });
	const { data } = useAppSelector((state: RootState) => state.user);
	const navigate = useNavigate();

	useEffect(() => {
		fetchExam();
	}, [examId]);

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeRemaining((prevTime) => {
				if (prevTime <= 1) {
					clearInterval(timer);
					setShowTimeUpModal(true);
					return 0;
				}
				return prevTime - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const fetchExam = async () => {
		if (examId) {
			const response = await dispatch(getAssessmentByIdAction(examId));
			setExamData(response.payload.data);
		}
	};

	const handleOptionSelect = (questionId: string, optionKey: string) => {
		setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
	};

	const handleNext = () => {
		if (currentQuestionIndex < examData.questions.length - 1) {
			setCurrentQuestionIndex((prev) => prev + 1);
		}
	};

	const handlePrevious = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex((prev) => prev - 1);
		}
	};

	const handleSubmit = async () => {
		console.log(selectedAnswers, "selected anse");

		let answerLength = Object.keys(selectedAnswers);

		if (answerLength.length < 5) {
			toast.error("Please answer all the questions..!");
			return;
		}

		let correctAnswers = 0;
		examData.questions.forEach((question: any) => {
			if (selectedAnswers[question._id] === question.answer) {
				correctAnswers++;
			}
		});

		const wrongAnswers = examData.questions.length - correctAnswers;
		const score =
			(correctAnswers / examData.questions.length) * examData.totalScore;
		const passed = score >= examData.passingScore;

		setExamResult({
			score,
			passed,
			correctAnswers,
			wrongAnswers,
		});

		const response = await dispatch(
			createOrUpdateResultAction({
				userRef: data?._id,
				isPassed: passed,
				score,
				assessmentRef: examData?._id,
			})
		);

		console.log(response.payload.data, "exam submistin result");

		setShowResultModal(true);
	};

	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
			.toString()
			.padStart(2, "0")}`;
	};

	const handleCertificateGenerate = async () => {
		const newData = {
			courseId: examData?.courseId?._id,
			userId: data?._id,
		};
		console.log(newData, "certi data");

		const response = await dispatch(generateCertificate(newData));
		console.log(response, "pdf download");
	};

	if (!examData) return <div>Loading...</div>;

	const currentQuestion = examData.questions[currentQuestionIndex];

	return (
		<div className="flex flex-col items-center justify-center mt-20">
			<h1 className="text-2xl font-bold p-2">{examData.title}</h1>
			<div className="text-md font-semibold text-red-600">
				Time Remaining: {formatTime(timeRemaining)}
			</div>
			<h2 className="font-semibold text-sm mb-4">
				Question {currentQuestionIndex + 1} of {examData.questions.length}
			</h2>
			<div className="w-full max-w-3xl rounded-lg shadow-md p-6">
				<div className="mb-6">
					<p className="mb-6 font-semibold">
						<QuestionMarkIcon color="primary" className="mr-2" />{" "}
						{currentQuestion.question}
					</p>

					<div className="space-y-2">
						{Object.entries(currentQuestion.options).map(([key, value]) => (
							<motion.div
								key={key}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<label className="flex items-center text-gray-400 p-3 border rounded-lg cursor-pointer hover:bg-gray-900">
									<input
										type="radio"
										name={`question-${currentQuestion._id}`}
										value={key}
										checked={selectedAnswers[currentQuestion._id] === key}
										onChange={() =>
											handleOptionSelect(currentQuestion._id, key)
										}
										className="mr-2"
									/>
									<span>{value as string}</span>
								</label>
							</motion.div>
						))}
					</div>
				</div>

				<div className="flex justify-between">
					<button
						onClick={handlePrevious}
						disabled={currentQuestionIndex === 0}
						className="btn btn-sm btn-neutral btn-outline"
					>
						<ArrowBackIosNewIcon fontSize="small" /> Previous Question
					</button>
					{currentQuestionIndex === examData.questions.length - 1 ? (
						<button
							onClick={handleSubmit}
							className="btn btn-sm btn-success btn-outline"
						>
							Submit
						</button>
					) : (
						<button onClick={handleNext} className="btn btn-sm btn-primary">
							Next Question <NavigateNextIcon />
						</button>
					)}
				</div>
			</div>

			{showTimeUpModal && (
				<div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
					<div className="bg-gray-900 p-6 rounded-lg shadow-xl w-1/3 flex flex-col items-center justify-center">
						<h2 className="text-2xl font-bold mb-4">Time's Up!</h2>
						<img src={timesup} alt="timesup" className="w-48 h-48 mb-4" />
						<p className="mb-4 text-sm">
							Unfortunately, you didn't complete the exam in time.
						</p>
						<p className="mb-4 text-sm">Please retry the exam again</p>
						<button
							onClick={() => navigate("/student/enrollments")}
							className="btn btn-sm btn-outline btn-error "
						>
							Retry Exam
						</button>
					</div>
				</div>
			)}

			{showResultModal && (
				<div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
					<div className="bg-gray-900 p-8 rounded-lg shadow-xl w-96 max-w-md">
						<h2 className="text-2xl font-bold mb-3 text-center text-white">
							Exam Results
						</h2>
						<div className="flex justify-center mb-4">
							{examResult.passed ? (
								<img src={success} alt="success" className="w-40 h-40" />
							) : (
								<img src={failed} alt="success" className="w-40 h-40" />
							)}
						</div>

						{/* Horizontal display of main results */}
						<div className="grid grid-cols-2 gap-4 mb-6 text-center">
							<div className="bg-gray-800 p-3 rounded-lg">
								<p className="text-sm text-gray-400 mb-1">Score</p>
								<p className="text-xl font-bold text-white">
									{Math.trunc(Number(examResult.score.toFixed(2)))}/
									{examData.totalScore}
								</p>
							</div>
							<div className="bg-gray-800 p-3 rounded-lg">
								<p className="text-sm text-gray-400 mb-1">Status</p>
								{examResult.passed ? (
									<p className="text-xl font-bold text-green-500">Passed</p>
								) : (
									<p className="text-xl font-bold text-red-500">Failed</p>
								)}
							</div>
						</div>

						{/* Detailed results */}
						<div className="space-y-4 mb-6">
							<div className="flex justify-between items-center bg-gray-800 p-3 rounded-lg">
								<p className="text-sm text-gray-400">Correct Answers</p>
								<span className="badge badge-success font-bold">
									{examResult.correctAnswers}
								</span>
							</div>
							<div className="flex justify-between items-center bg-gray-800 p-3 rounded-lg">
								<p className="text-sm text-gray-400">Wrong Answers</p>
								<span className="badge badge-error font-bold">
									{examResult.wrongAnswers}
								</span>
							</div>
						</div>

						{/* Action button */}
						<div className="flex justify-center">
							{examResult.passed ? (
								<div className="flex flex-col justify-center items-center">
									<p className="text-xs italic mb-4">
										{" "}
										get you certificate from below{" "}
									</p>
									<button
										onClick={handleCertificateGenerate}
										className="btn btn-success btn-outline btn-sm"
									>
										<DownloadIcon className="mr-2" /> Download Certificate
									</button>
								</div>
							) : (
								<button
									onClick={() => navigate("/student/enrollments")}
									className="btn btn-error btn-outline btn-sm"
								>
									Retry Exam
								</button>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
