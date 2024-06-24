import React from "react";
import CodeIcon from "@mui/icons-material/Code";
import ArticleIcon from "@mui/icons-material/Article";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PhonelinkIcon from "@mui/icons-material/Phonelink";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import VideocamIcon from "@mui/icons-material/Videocam";

export const CourseIncludesSection : React.FC = () => {
    return (
        <div className="rounded-lg shadow-md p-10 mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            This course includes:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
                <VideocamIcon className="mr-2" />
                <span>Content on-demand video</span>
            </div>
            <div className="flex items-center">
                <CodeIcon className="mr-2" />
                <span>Coding exercises</span>
            </div>
            <div className="flex items-center">
                <ArticleIcon className="mr-2" />
                <span>Quality articles</span>
            </div>
            <div className="flex items-center">
                <CloudDownloadIcon className="mr-2" />
                <span>Downloadable resources</span>
            </div>
            <div className="flex items-center">
                <PhonelinkIcon className="mr-2" />
                <span>Access on mobile and TV</span>
            </div>
            <div className="flex items-center">
                <EmojiEventsIcon className="mr-2" />
                <span>Certificate of completion</span>
            </div>
        </div>
    </div>
    )
}