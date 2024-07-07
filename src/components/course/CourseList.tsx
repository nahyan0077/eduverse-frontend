import React from "react";
import CourseCard from "./CourseCard";
import CourseSectionCardLoading from "../common/loadingSkeleton/CourseCard";
import { Menu, MenuItem, Button } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";

interface CourseListProps {
  courses: any[];
  loading: boolean;
  sortOrder: "asc" | "desc";
  handleMenuClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  anchorEl: null | HTMLElement;
  handleMenuClose: () => void;
  handleSortOrderChange: (order: "asc" | "desc") => void;
}

const sortCourses = (courses: any[], order: "asc" | "desc") => {
  return courses.sort((a, b) => {
    const priceA = a.pricing?.amount || 0;
    const priceB = b.pricing?.amount || 0;
    return order === "asc" ? priceA - priceB : priceB - priceA;
  });
};

const CourseList: React.FC<CourseListProps> = ({
  courses,
  loading,
  sortOrder,
  handleMenuClick,
  anchorEl,
  handleMenuClose,
  handleSortOrderChange,
}) => {
  const filteredAndSortedCourses = sortCourses(courses, sortOrder);

  return (
    <div
      className={`w-full ${
        !loading
          ? "md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative py-10 px-5"
          : "py-10 px-5"
      }`}>
      <div className=" lg:absolute top-0 right-0 z-10 ">
        <Button
          color="inherit"
          aria-controls="sort-menu"
          aria-haspopup="true"
          onClick={handleMenuClick}
          startIcon={<SortIcon />}>
          Sort
        </Button>
        <Menu
          id="sort-menu"
          color="inherit"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}>
          <MenuItem onClick={() => handleSortOrderChange("asc")}>
            Price: Low to High
          </MenuItem>
          <MenuItem onClick={() => handleSortOrderChange("desc")}>
            Price: High to Low
          </MenuItem>
        </Menu>
      </div>
      {loading ? (
        <div className="flex flex-wrap -mx-4">
          {[...Array(9)].map((_, index) => (
            <CourseSectionCardLoading key={index} />
          ))}
        </div>
      ) : (
        filteredAndSortedCourses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))
      )}
    </div>
  );
};

export default CourseList;
