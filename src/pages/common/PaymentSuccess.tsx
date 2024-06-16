import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

export const PaymentSuccess: React.FC = () => {
	return (
		<>
			<div className="flex min-h-screen items-center justify-center">
				<div className="flex flex-col justify-center items-center border-2 py-12 px-6 md:px-12 bg-gray-900 rounded-2xl">
					<div className="mb-6">
						<Player
							autoplay
							loop
							src="https://lottie.host/1822c18f-de1d-4ea5-ade2-f1d42129b692/9hvHoSKmTX.json"
							style={{ height: "200px", width: "200px" }}
						/>
					</div>
					<div className="mb-6">
						<h2 className="text-3xl font-extrabold text-green-600 text-center">
							Payment Successful
						</h2>
					</div>
					<div>
						<button className="btn btn-success btn-outline rounded-full">
							Home
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
