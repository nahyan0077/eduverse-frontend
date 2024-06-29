import React from "react";

interface PaginationControlsProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (pageNumber: number) => void;
}

const CategoryPagination: React.FC<PaginationControlsProps> = ({
  totalPages,
  currentPage,
  handlePageChange,
}) => {
  return (
    <div className="flex justify-center mt-6">
      <div className="join">
        {Array.from({ length: totalPages }, (_, index) => (
          <input
            key={index}
            className="join-item btn btn-square btn-sm "
            type="radio"
            name="options"
            aria-label={`${index + 1}`}
            checked={currentPage === index + 1}
            onChange={() => handlePageChange(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPagination;
