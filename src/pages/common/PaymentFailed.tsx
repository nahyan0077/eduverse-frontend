import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

export const PaymentFailed: React.FC = () => {
	return (
		<>
			<div className="flex min-h-screen items-center justify-center">
				<div className="flex flex-col justify-center items-center border-2 py-12 px-6 md:px-12 bg-gray-900 rounded-2xl ">
					<div className="mb-6 px-20">
						<Player
							autoplay
							loop
							src="https://lottie.host/fd3720ca-a44f-4597-906b-ca8903d49233/UPolevx1qN.json"
							style={{ height: "200px", width: "200px" }}
						/>
					</div>
					<div className="mb-6">
						<h2 className="text-3xl font-extrabold text-orange-400 text-center">
							Payment Failed
						</h2>
					</div>
					<div>
						<button className="btn btn-warning btn-outline rounded-full">
							Home
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
