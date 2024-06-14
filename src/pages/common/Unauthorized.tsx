import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

export const Unauthorized: React.FC = () => {
	return (
		<>
	
				<div className="max-h-screen flex py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 items-center">
					<div className="mx-auto max-w-screen-sm text-center">
						<Player
							autoplay
							loop
							src="https://lottie.host/f3ca6c01-bbc2-4e82-8cd0-d92cabe8300d/vo2ejNhW8z.json"
							style={{ height: "80%", width: "80%" }}
						/>
						<p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
							Something's missing.
						</p>
						<p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
							Sorry, we can't find that page. You'll find lots to explore on the
							home page.{" "}
						</p>
						<a
							href="/"
							className="inline-flex btn btn-outline btn-accent text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
						>
							Back to Homepage
						</a>
					</div>
				</div>

		</>
	);
};
