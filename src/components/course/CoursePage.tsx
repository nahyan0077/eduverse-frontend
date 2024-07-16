import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/hooks";
import { getActiveCoursesAction } from "@/redux/store/actions/course";
import { useTheme } from "../ui/theme-provider";
import FilterPanel from "./CourseFilterPanel";
import CourseList from "./CourseList";
import Pagination from "../common/admin/Pagination";

export const CoursePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [courses, setCourses] = useState<any[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { theme } = useTheme();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 1000); // 1000ms delay

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  useEffect(() => {
    setLoading(true);
    fetchCourse(currentPage);
  }, [dispatch, currentPage, debouncedSearchQuery]);

  const fetchCourse = async (page: number) => {
    const response = await dispatch(
      getActiveCoursesAction({ page, limit: 6, search: debouncedSearchQuery })
    );
    if (getActiveCoursesAction.fulfilled.match(response)) {
      setLoading(false);
      setCourses(response.payload.data.courses);
      setTotalPages(response.payload.data.totalPages);
    } else {
      setLoading(false);
      console.error("Failed to fetch courses:", response.payload);
    }
  };

  useEffect(() => {
    filterCourses();
  }, [courses, selectedCategories, selectedLevels, selectedPrices]);

  const filterCourses = () => {
    let filtered = courses;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(course =>
        selectedCategories.includes(course.categoryRef._id)
      );
    }

    if (selectedLevels.length > 0) {
      filtered = filtered.filter(course =>
        selectedLevels.includes(course.level)
      );
    }

    if (selectedPrices.length > 0) {
      filtered = filtered.filter(course =>
        selectedPrices.includes(course.pricing.type)
      );
    }

    setFilteredCourses(filtered);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId]
    );
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevels((prevLevels) =>
      prevLevels.includes(level)
        ? prevLevels.filter((lvl) => lvl !== level)
        : [...prevLevels, level]
    );
  };

  const handlePriceChange = (price: string) => {
    setSelectedPrices((prevPrices) =>
      prevPrices.includes(price)
        ? prevPrices.filter((prc) => prc !== price)
        : [...prevPrices, price]
    );
  };

  const handleSortOrderChange = (order: "asc" | "desc") => {
    setSortOrder(order);
    setAnchorEl(null);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div
      className={`max-w-7xl mx-auto ${
        theme === "light" ? " text-gray-900" : " text-gray-100"
      }`}
    >
      <div className="flex justify-between items-center mb-6 rounded-2xl"></div>
      <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5">
        <FilterPanel
          onSearchChange={handleSearchChange}
          selectedCategories={selectedCategories}
          handleCategoryChange={handleCategoryChange}
          selectedLevels={selectedLevels}
          handleLevelChange={handleLevelChange}
          selectedPrices={selectedPrices}
          handlePriceChange={handlePriceChange}
        />
        <CourseList
          courses={filteredCourses}
          loading={loading}
          sortOrder={sortOrder}
          handleMenuClick={handleMenuClick}
          anchorEl={anchorEl}
          handleMenuClose={handleMenuClose}
          handleSortOrderChange={handleSortOrderChange}
        />
      </div>
      <div className="flex justify-center my-10">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default CoursePage;
