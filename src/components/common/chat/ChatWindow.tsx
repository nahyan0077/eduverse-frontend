import React, { useState, useEffect, useRef, useContext } from "react";
import { IoIosSend } from "react-icons/io";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CollectionsIcon from "@mui/icons-material/Collections";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import CloseIcon from "@mui/icons-material/Close";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import { ChatMessage } from "./ChatMessage";
import { SocketContext } from "@/context/SocketProvider";
import { useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/redux/store";
import SyncLoader from "react-spinners/SyncLoader";
import EmojiPicker, { EmojiClickData, Theme, EmojiStyle } from "emoji-picker-react";
import { Player } from "@lottiefiles/react-lottie-player";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { ImageUpload } from "@/utils/cloudinary/uploadImage";
import LoadingPopUp from "../skeleton/LoadingPopUp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ReactMic } from "react-mic";

interface Message {
    senderId: string;
    content: string;
    createdAt: string;
    recieverSeen: boolean;
    contentType: string;
}

interface ChatWindowProps {
    messages: Message[];
    currentUser: any;
    onSendMessage: (message: { content: string; contentType?: string }) => void;
    currentChat: any;
    typingData: { isTyping: boolean; senderId: string } | null;
    onBack: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
    messages,
    currentUser,
    onSendMessage,
    currentChat,
    typingData,
    onBack,
}) => {
    const [inputMessage, setInputMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showAttachMenu, setShowAttachMenu] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState<any | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const emojiPickerRef = useRef<HTMLDivElement>(null);
    const attachMenuRef = useRef<HTMLDivElement>(null);
    const { socket } = useContext(SocketContext) || {};
    const { data } = useAppSelector((state: RootState) => state.user);
    const [cloudURL, setCloudURL] = useState("");
    const [loading, setLoading] = useState(false);
    const [fileType, setFileType] = useState("");

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        socket?.emit("typing", {
            roomId: currentChat.roomId,
            senderId: data?._id,
        });
        setInputMessage(e.target.value);
    };

    const handleSendMessage = async () => {
        if (inputMessage.trim() || selectedFile || audioBlob) {
            if (selectedFile) {
                if (selectedFile?.type.startsWith("image/")) {
                    setFileType("image");
                } else if (selectedFile?.type.startsWith("video/")) {
                    setFileType("video");
                } else if (selectedFile?.type.startsWith("application/")) {
                    setFileType("application");
                }
            }

            let messageContent = selectedFile ? cloudURL : inputMessage;
            let messageType = selectedFile ? fileType : "text";

			console.log(messageType,"typeee");
			
			console.log(inputMessage,"alldatatss");
			console.log( selectedFile, "alldatatss--1");
			console.log(audioBlob,"alldatatss--2");
			

            if (audioBlob) {
                setLoading(true);
                try {
                    messageContent = await uploadAudio(audioBlob);
                    messageType = "audio";
                } catch (error) {
                    console.error("Error uploading audio:", error);
                    toast.error("Error uploading audio");
                    setLoading(false);
                    return;
                }
                setLoading(false);
            }

            onSendMessage({ content: messageContent, contentType: messageType });
            setInputMessage("");
            setSelectedFile(null);
            setCloudURL("");
            setAudioBlob(null);
        }
    };

    const handleEmojiClick = (emojiData: EmojiClickData) => {
        setInputMessage(inputMessage + emojiData.emoji);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
            setShowEmojiPicker(false);
        }
        if (attachMenuRef.current && !attachMenuRef.current.contains(event.target as Node)) {
            setShowAttachMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleAttachMenu = () => {
        setShowAttachMenu(!showAttachMenu);
    };

    const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            if (e.target.files[0].size > 15 * 1024 * 1024) {
                toast.error("File size exceeds 15MB limit");
                return;
            }
            setSelectedFile(e.target.files[0]);
            setLoading(true);
            let cloudURL = await ImageUpload(e.target.files[0]);
            setLoading(false);
            setCloudURL(cloudURL);
            setShowAttachMenu(false);
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
    };

    const startRecording = async () => {
        setIsRecording(true);
    };

    const stopRecording = () => {
        setIsRecording(false);
    };

    const onStop = (recordedBlob: { blob: Blob }) => {
        setAudioBlob(recordedBlob.blob);
    };

    const uploadAudio = async (audioBlob: any): Promise<string> => {
        const audioURL = await ImageUpload(audioBlob);
        return audioURL;
    };

    return (
        <section className="flex flex-col w-full bg-gray-200 dark:bg-gray-950">
            <LoadingPopUp isLoading={loading} />
            {currentChat ? (
                <>
                    <header className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
                        <ArrowBackIcon className="cursor-pointer xl:hidden" onClick={onBack} />
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                            <img
                                src={currentChat?.profile?.avatar}
                                alt="User Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex">
                            <div className="">
                                <div className="font-bold text-gray-900 dark:text-white">
                                    {currentChat.userName}
                                </div>
                                <div
                                    className={`text-xs text-gray-500 dark:text-gray-400 mt-1`}
                                >
                                    {currentChat.isOnline
                                        ? "Online"
                                        : `Last seen ${formatDistanceToNow(
                                                new Date(currentChat.lastSeen),
                                                { addSuffix: true }
                                          )}`}
                                </div>
                            </div>
                            <div className={`text-sm text-gray-500 dark:text-gray-400`}>
                                {typingData && typingData.isTyping ? (
                                    <SyncLoader className="ml-3" size={5} color="#ffffff" />
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </header>
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                            {messages.map((message, index) => (
                                <ChatMessage
                                    key={index}
                                    message={message}
                                    currentUser={currentUser}
                                />
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        {selectedFile && (
                            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex items-center mb-2 relative">
                                    <button
                                        className="absolute top-0 right-0 m-1 text-gray-600 dark:text-gray-300"
                                        onClick={removeFile}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </button>
                                    {selectedFile.type.startsWith("image/") && (
                                        <img
                                            src={URL.createObjectURL(selectedFile)}
                                            alt={selectedFile.name}
                                            className="w-16 h-16 object-cover mr-2"
                                        />
                                    )}
                                    {selectedFile.type.startsWith("video/") && (
                                        <video
                                            src={URL.createObjectURL(selectedFile)}
                                            className="w-16 h-16 object-cover mr-2"
                                            controls
                                        />
                                    )}
                                    {!selectedFile.type.startsWith("image/") &&
                                        !selectedFile.type.startsWith("video/") && (
                                            <div className="w-16 h-16 flex items-center justify-center bg-gray-200 dark:bg-gray-700 mr-2">
                                                <FileCopyIcon />
                                            </div>
                                        )}
                                    <div className="text-sm text-gray-700 dark:text-gray-300">
                                        {selectedFile.name}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                            {audioBlob && (
                                <div className="mb-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center">
                                    <audio
                                        src={URL.createObjectURL(audioBlob)}
                                        controls
                                        className="w-full"
                                    />
                                    <button
                                        className="ml-2 text-red-500 hover:text-red-700"
                                        onClick={() => setAudioBlob(null)}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </button>
                                </div>
                            )}
                            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg relative">
                                <button
                                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-500"
                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                >
                                    <EmojiEmotionsIcon fontSize="medium" />
                                </button>
                                {showEmojiPicker && (
                                    <div
                                        className="absolute bottom-12 left-0"
                                        ref={emojiPickerRef}
                                    >
                                        <EmojiPicker
                                            onEmojiClick={handleEmojiClick}
                                            theme={Theme.AUTO}
                                            emojiStyle={EmojiStyle.GOOGLE}
                                        />
                                    </div>
                                )}
                                <button
                                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-500"
                                    onClick={toggleAttachMenu}
                                >
                                    <AttachFileIcon fontSize="medium" />
                                </button>
                                {showAttachMenu && (
                                    <div
                                        className="absolute bottom-12 left-10 bg-white dark:bg-gray-700 rounded-lg shadow-lg p-2"
                                        ref={attachMenuRef}
                                    >
                                        <ul>
                                            <li className="p-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-md">
                                                <label className="cursor-pointer">
                                                    <CollectionsIcon fontSize="small" /> Photo
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleFileInput}
                                                    />
                                                </label>
                                            </li>
                                            <li className="p-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-md">
                                                <label className="cursor-pointer">
                                                    <VideoCameraBackIcon /> Video
                                                    <input
                                                        type="file"
                                                        accept="video/*"
                                                        className="hidden"
                                                        onChange={handleFileInput}
                                                    />
                                                </label>
                                            </li>
                                            <li className="p-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-md">
                                                <label className="cursor-pointer">
                                                    <FileCopyIcon /> Document
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        onChange={handleFileInput}
                                                    />
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                                <input
                                    type="text"
                                    className="flex-grow p-2 bg-transparent text-gray-900 dark:text-white focus:outline-none"
                                    placeholder="Type a message"
                                    value={inputMessage}
                                    onChange={handleInputChange}
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") handleSendMessage();
                                    }}
                                />
                                <button
                                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-500"
                                    onClick={handleSendMessage}
                                >
                                    <IoIosSend size={30} />
                                </button>
                                <button
                                    className={`p-2 ${isRecording ? "text-red-500" : "text-gray-500 dark:text-gray-400"} hover:text-blue-500`}
                                >
                                    {isRecording ? (
                                        <div onClick={stopRecording}>
                                            <StopIcon fontSize="medium" />
                                        </div>
                                    ) : (
                                        <div onClick={startRecording}>
                                            <MicIcon fontSize="medium" />
                                        </div>
                                    )}
                                </button>
                                <ReactMic
                                    record={isRecording}
                                    className="hidden"
                                    onStop={onStop}
                                    mimeType="audio/webm"
                                />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                    <div>
                        <Player
                            autoplay
                            loop
                            src="https://lottie.host/62d503b1-5d31-417c-8503-63f54f011b2c/orFIpLf5MZ.json"
                            style={{ height: "30%", width: "30%" }}
                        />
                    </div>
                    <div>
                        Select a chat to start messaging <span className="animate-ping">......</span>
                    </div>
                </div>
            )}
        </section>
    );
};
