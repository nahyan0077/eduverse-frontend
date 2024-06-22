import React from "react";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	const handlePrevious = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	return (
		<div className="flex items-center justify-center space-x-2 p-2">
			<button
				className="btn btn-outline btn-sm"
				onClick={handlePrevious}
				disabled={currentPage === 1}
			>
				Previous
			</button>
			{Array.from({ length: totalPages }, (_, index) => (
				<button
					key={index + 1}
					className={`btn btn-sm ${
						currentPage === index + 1 ? "btn-primary" : "btn-outline"
					}`}
					onClick={() => onPageChange(index + 1)}
				>
					{index + 1}
				</button>
			))}
			<button
				className="btn btn-outline btn-sm"
				onClick={handleNext}
				disabled={currentPage === totalPages}
			>
				Next
			</button>
		</div>
	);
};

export default Pagination;
