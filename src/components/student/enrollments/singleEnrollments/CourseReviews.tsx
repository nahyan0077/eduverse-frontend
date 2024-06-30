import React from "react";
import { CourseReview, ReviewsSection } from "./CourseReview";


const CourseReviews: React.FC<{ reviews: any[]; handleReviewSubmit: any; overallRating: number }> = ({ reviews, handleReviewSubmit, overallRating }) => {
  return (
    <div className="lg:w-ful">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl mb-6 shadow-md">
        <h2 className="text-xl font-bold mb-4">Course Reviews</h2>
        <CourseReview handleSubmit={handleReviewSubmit} />
        <div className="flex justify-end">
          <span className="text-md badge badge-ghost badge-lg font-bold p-2">Average rating: {overallRating}</span>
        </div>
        <ReviewsSection reviews={reviews} />
      </div>
    </div>
  );
};

export default CourseReviews;
