import React from "react";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

export const InstructorChat: React.FC = () => {
	return (
		<div className="flex h-full">
			<section className="w-full lg:w-1/3 bg-gray-950 pl-2 py-2">
				<div className="flex flex-col h-full bg-gray-900 p-2 rounded-xl">
					<header className="h-24 flex items-center">
						<input
							type="text"
							placeholder="Search..."
							className="p-3 rounded-xl flex-grow mx-3 bg-gray-900 outline outline-blue-950"
						/>
					</header>
					<section className="flex flex-col overflow-y-auto p-3 space-y-1">
						{["demo user1", "demo user2", "demo user3"].map((user, index) => (
							<div
								key={index}
								className="h-20 flex items-center gap-4 p-4 border-b border-blue-950 rounded-xl hover:bg-blue-950"
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
			<section className="bg-gray-950 w-full lg:w-2/3 p-2">
				<div className="flex flex-col h-full bg-gray-900 p-2 rounded-xl">
					<header className="h-24 bg-gradient-to-b from-slate-900 to-slate-800 flex items-center gap-4 px-6 py-4 rounded-xl">
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
					<section className="flex flex-col justify-between h-full">
						<div className="flex flex-col flex-grow space-y-4 overflow-y-auto p-4">
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
								<div className="chat-bubble bg-gradient-to-r from-slate-700 to-slate-800">
									You were the Chosen One!
								</div>
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
									<span className="text-xs opacity-50 ">12:46</span>
								</div>
								<div className="chat-bubble bg-blue-700">I hate you!</div>
								<div className="chat-footer text-xs opacity-50 ">
									Seen at 12:46
								</div>
							</div>
						</div>
						<div className="flex items-center gap-3 bg-base-300 p-6">
							<EmojiEmotionsIcon color="primary" />
							<AttachFileIcon color="primary" />
							<input
								type="text"
								className="flex-grow p-2 bg-gray-800 rounded-xl border border-blue-900 focus:outline-none"
								placeholder="Type a message"
							/>
							<KeyboardVoiceIcon color="primary" />
						</div>
					</section>
				</div>
			</section>
		</div>
	);
};
