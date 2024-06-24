import React, { FormEvent, useState } from "react";

interface CourseReviewProps {
    handleSubmit: (reviewText: string) => void;
}

export const CourseReview: React.FC<CourseReviewProps> = ({ handleSubmit }) => {
    const [reviewText, setReviewText] = useState<string>("");

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSubmit(reviewText); 
        setReviewText("");
    };

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReviewText(event.target.value);
    };

    return (
        <div className="flex flex-col max-w-4xl mx-auto p-8 ">
            <h2 className="font-bold text-xl mb-2">Post a Review:</h2>
            <form onSubmit={handleFormSubmit}>
                <textarea
                    className="textarea textarea-primary bg-white dark:bg-gray-800 w-full h-40 p-4 border border-violet-700 rounded-md focus:outline-none resize-none"
                    placeholder="Write your review here..."
                    value={reviewText}
                    onChange={handleTextareaChange}
                ></textarea>
                <div>
                    <button type="submit" className="btn btn-primary btn-outline btn-sm mt-2">
                        Submit Review
                    </button>
                </div>
            </form>
        </div>
    );
};
