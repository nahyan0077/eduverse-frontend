import InstructorHeader from "@/components/instructor/InstructorHeader";
import { useTheme } from "@/components/ui/theme-provider";
import { useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/redux/store";
import React, { useState, useEffect } from "react";
import { Watch } from "react-loader-spinner";
import { Player } from "@lottiefiles/react-lottie-player";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";

const VerificationPage: React.FC = () => {
	const { theme } = useTheme();
	const data = useAppSelector((state: RootState) => state.user);
	const navigate = useNavigate()
	const [isRejected, setIsRejected] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		if (data.data?.isRejected !== undefined) {
			setIsRejected(data.data.isRejected);
		}
	}, [data]);

	const handleApplyAgain = () => {
		setIsModalOpen(true);
	};

	const initialValues = {
		cv: "",
	};

	const inputStyle = `w-full px-5 py-3 rounded-lg font-medium border-2 ${
		theme === "light"
			? "bg-gray-200 text-gray-600"
			: "bg-gray-950 text-gray-300"
	} border-transparent text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100`;

	return (
		<>
			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-950 bg-opacity-80">
					<div className="bg-gray-300 dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-2xl">
						<h2 className="text-xl font-bold mb-8">New Request</h2>

						<Formik initialValues={initialValues} onSubmit={handleApplyAgain}>
							{({ isSubmitting }) => (
								<Form>
									<div className="flex flex-col gap-8">
									<label htmlFor="CV" className="block text-xs font-semibold mb-2">UPLOAD CV</label>
										<div className="w-full">
											<Field
											className={inputStyle}
											name="cv" placeholder="upload CV" type="text" />
										</div>
									</div>
									<div className="flex space-x-3 justify-end mt-4">
										<button
											type="submit"
											className="btn btn-success btn-outline btn-md"
											disabled={isSubmitting}
										>
											Upload
										</button>
										<button
											type="button"
											className="btn btn-error btn-outline btn-md"
											onClick={() => setIsModalOpen(false)}
											disabled={isSubmitting}
										>
											Cancel
										</button>
									</div>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			)}
			<InstructorHeader />
			<div className="min-h-screen flex justify-center mt-16">
				<div className="rounded-xl shadow-lg max-w-7xl w-full">
					{isRejected ? (
						<div
							className={`flex flex-col items-center justify-center text-center ${
								theme === "light" ? "bg-gray-100" : "bg-gray-900"
							} py-20 rounded-xl shadow-md`}
						>
							{!isModalOpen && (
								<Player
									autoplay
									loop
									src="https://lottie.host/5d237da8-65c0-4daf-907f-855384ec5898/Ed8TxCClT7.json"
									style={{ height: "50%", width: "50%" }}
								/>
							)}
							<span className="font-semibold text-lg mt-6">
								Sorry to inform you that your account verification was
								unsuccessful.
							</span>
							<p className="text-gray-600 text-sm mt-2">
								Please click on the button below to go to the apply again
							</p>
							<button
								className="btn btn-outline btn-accent mt-10"
								// onClick={handleApplyAgain}
								onClick={()=>navigate('/instructor-form-1')}
							>
								{" "}
								Apply Again{" "}
							</button>
						</div>
					) : (
						<div
							className={`flex flex-col items-center justify-center text-center ${
								theme === "light" ? "bg-gray-100" : "bg-gray-900"
							} py-40 rounded-xl shadow-md`}
						>
							<Watch
								visible={true}
								height="80"
								width="80"
								radius="48"
								color="#4fa94d"
								ariaLabel="watch-loading"
							/>
							<span className="font-semibold text-lg mt-6">
								Instructor account verification in progress...
							</span>
							<p className="text-gray-600 text-sm mt-2">
								Please wait while we verify your account. You will receive an
								email after successful verification.
							</p>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default VerificationPage;
