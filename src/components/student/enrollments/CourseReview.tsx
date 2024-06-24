import React, { FormEvent, useState } from "react";
import { toast } from "sonner";


interface CourseReviewProps {
	handleSubmit: (reviewText: string, rating: number) => void;
}

export const CourseReview: React.FC<CourseReviewProps> = ({ handleSubmit }) => {
	const [reviewText, setReviewText] = useState<string>("");
	const [rating, setRating] = useState<number>(0);

	const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (reviewText.trim() === "" || rating === 0) {
			toast.error("Both review text and rating are required!");
			return;
		}
		handleSubmit(reviewText, rating);
		setReviewText("");
		setRating(0); 
	};

	const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setReviewText(event.target.value);
	};

	const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRating(Number(event.target.value));
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
				<div className="flex items-center my-4">
					<span className="mr-2">Rating:</span>
					<div className="rating">
						<input
							type="radio"
							name="rating-2"
							className="mask mask-star-2 bg-orange-400 hidden"
							value={0}
							checked={rating === 0}
							onChange={handleRatingChange}
						/>
						<input
							type="radio"
							name="rating-2"
							className="mask mask-star-2 bg-orange-400"
							value={1}
							checked={rating === 1}
							onChange={handleRatingChange}
						/>
						<input
							type="radio"
							name="rating-2"
							className="mask mask-star-2 bg-orange-400"
							value={2}
							checked={rating === 2}
							onChange={handleRatingChange}
						/>
						<input
							type="radio"
							name="rating-2"
							className="mask mask-star-2 bg-orange-400"
							value={3}
							checked={rating === 3}
							onChange={handleRatingChange}
						/>
						<input
							type="radio"
							name="rating-2"
							className="mask mask-star-2 bg-orange-400"
							value={4}
							checked={rating === 4}
							onChange={handleRatingChange}
						/>
						<input
							type="radio"
							name="rating-2"
							className="mask mask-star-2 bg-orange-400"
							value={5}
							checked={rating === 5}
							onChange={handleRatingChange}
						/>
					</div>
				</div>
				<div>
					<button type="submit" className="btn btn-primary btn-outline btn-sm mt-2">
						Submit Review
					</button>
				</div>
			</form>
		</div>
	);
};


export const ReviewsSection = ({ reviews }: any) => {
    return (
      <div>
        {reviews.map((review: any) => (
          <div key={review._id} className="p-4 mb-4 border-b border-gray-700">
            <div className="flex items-center mb-2">
              <img
                src={review.userId.profile.avatar}
                alt="User Avatar"
                className="object-cover w-8 h-8 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500 mr-3 ml-1"
              />
              <div>
                <h4 className="font-semibold">{review.userId.firstName}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{review.comment}</p>
              </div>
            </div>
            <div className="flex items-center text-yellow-500">
              {"★".repeat(review.rating)}{" "}
              {"☆".repeat(5 - review.rating)}
            </div>
          </div>
        ))}
      </div>
    );
  };
