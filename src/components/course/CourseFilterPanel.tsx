import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { SearchBar } from "../common/admin/SearchBar";

interface FilterPanelProps {
	onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	selectedCategories: string[];
	handleCategoryChange: (categoryId: string) => void;
	selectedLevels: string[];
	handleLevelChange: (level: string) => void;
	selectedPrices: string[];
	handlePriceChange: (price: string) => void;
}

const CourseFilterPanel: React.FC<FilterPanelProps> = ({
	onSearchChange,
	selectedCategories,
	handleCategoryChange,
	selectedLevels,
	handleLevelChange,
	selectedPrices,
	handlePriceChange,
}) => {
	const categoryData = useSelector((state: RootState) => state.category);
	const levels = ["beginner", "intermediate", "expert"];

	return (
		<div className="w-full md:w-1/4 p-5 rounded-xl shadow-xl py-10 border-2 border-gray-200 dark:border-gray-900 mt-10">
			<div className="mb-6">
				<SearchBar onSearchChange={onSearchChange} />
			</div>
			<div className="collapse collapse-arrow collapse-open border mb-6">
				<input type="checkbox" />
				<div className="collapse-title text-md font-medium">Course Categories</div>
				<div className="collapse-content">
					<div className="flex flex-col space-y-2">
						{categoryData?.data.map((data) => (
							<label key={data._id}>
								<input
									type="checkbox"
									className="mr-2"
									checked={selectedCategories.includes(data._id)}
									onChange={() => handleCategoryChange(data._id)}
								/>{" "}
								{data?.categoryName}
							</label>
						))}
					</div>
				</div>
			</div>
			<div className="collapse collapse-arrow collapse-open border mb-6">
				<input type="checkbox" />
				<div className="collapse-title text-md font-medium">Level</div>
				<div className="collapse-content">
					<div className="flex flex-col space-y-2">
						{levels.map((lvl) => (
							<label key={lvl}>
								<input
									type="checkbox"
									className="mr-2"
									checked={selectedLevels.includes(lvl)}
									onChange={() => handleLevelChange(lvl)}
								/>{" "}
								{lvl}
							</label>
						))}
					</div>
				</div>
			</div>
			<div className="collapse collapse-arrow collapse-open border mb-6">
				<input type="checkbox" />
				<div className="collapse-title text-md font-medium">Price</div>
				<div className="collapse-content">
					<div className="flex flex-col space-y-2">
						<label>
							<input
								type="checkbox"
								className="mr-2"
								checked={selectedPrices.includes("free")}
								onChange={() => handlePriceChange("free")}
							/>{" "}
							Free
						</label>
						<label>
							<input
								type="checkbox"
								className="mr-2"
								checked={selectedPrices.includes("paid")}
								onChange={() => handlePriceChange("paid")}
							/>{" "}
							Paid
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseFilterPanel;
