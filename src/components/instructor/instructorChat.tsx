import React from "react";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

export const InstructorChat: React.FC = () => {
	return (
		<div className="flex h-full">
			<section className="w-full lg:w-1/3 bg-gray-950 p-1">
				<div className="flex flex-col h-full bg-gray-900 p-2 rounded-xl">
					<header className="h-24 flex items-center">
						<input
							type="text"
							placeholder="Search..."
							className="p-3 rounded-xl flex-grow mx-3"
						/>
					</header>
					<section className="flex flex-col overflow-y-auto p-3">
						{["demo user1", "demo user2", "demo user3"].map((user, index) => (
							<div
								key={index}
								className="h-20 flex items-center gap-4 p-2 border-b"
							>
								<div className="avatar">
									<div className="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
										<img
											src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
											alt="User Avatar"
										/>
									</div>
								</div>
								<div>{user}</div>
							</div>
						))}
					</section>
				</div>
			</section>
			<section className="bg-gray-950 w-full lg:w-2/3 p-1">
				<div className="flex flex-col h-full bg-gray-900 p-2 rounded-xl">
					<header className="h-24 bg-base-300 flex items-center gap-4 p-4">
						<div className="avatar">
							<div className="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
								<img
									src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
									alt="User Avatar"
								/>
							</div>
						</div>
						<div>
							<div className="font-bold">Demo User1</div>
							<div className="text-sm text-gray-500">Typing...</div>
						</div>
					</header>
					<section className="flex flex-col justify-between bg-gray-900 h-full">
						<div className="flex flex-col space-y-4 overflow-y-auto p-4">
							<div className="chat chat-start">
								<div className="chat-image avatar">
									<div className="w-10 rounded-full">
										<img
											src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
											alt="User Avatar"
										/>
									</div>
								</div>
								<div className="chat-header">
									<span className="text-xs opacity-50">12:45</span>
								</div>
								<div className="chat-bubble">You were the Chosen One!</div>
								<div className="chat-footer text-xs opacity-50">Delivered</div>
							</div>
							<div className="chat chat-end">
								<div className="chat-image avatar">
									<div className="w-10 rounded-full">
										<img
											src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
											alt="User Avatar"
										/>
									</div>
								</div>
								<div className="chat-header">
									<span className="text-xs opacity-50">12:46</span>
								</div>
								<div className="chat-bubble">I hate you!</div>
								<div className="chat-footer text-xs opacity-50">
									Seen at 12:46
								</div>
							</div>
							<div className="flex items-center gap-3 mt-4 bg-base-300 p-6 -mx-4">
								<EmojiEmotionsIcon color="primary" />
								<AttachFileIcon color="primary" />
								<input
									type="text"
									className="flex-grow p-2 bg-gray-700 rounded-full border border-gray-300"
									placeholder="Type a message"
								/>
								<KeyboardVoiceIcon color="primary" />
							</div>
						</div>
					</section>
				</div>
			</section>
		</div>
	);
};
