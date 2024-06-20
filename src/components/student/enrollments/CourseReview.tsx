import React from "react";

export const CourseReview: React.FC = () => {
    return (
        <div className="flex flex-col max-w-4xl mx-auto p-8 ">
            <h2 className="font-bold text-xl mb-2">Post a Review :</h2>
            <textarea
                className="textarea textarea-primary bg-white dark:bg-gray-800 w-full h-40 p-4 border border-violet-700 rounded-md focus:outline-none  resize-none"
                placeholder="Write your review here..."
            ></textarea>
            <div>
            <button className="btn btn-primary btn-outline btn-sm mt-2 ">Submit Review</button>

            </div>
        </div>
    );
};
