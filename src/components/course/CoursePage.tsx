import { useAppDispatch } from "@/hooks/hooks";
import { getActiveCoursesAction } from "@/redux/store/actions/course";
import { Lesson } from "@/types/ICourse";
import React, { useEffect, useState } from "react";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ui/theme-provider";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { CurrencyRupee as CurrencyRupeeIcon } from '@mui/icons-material';
import SortIcon from '@mui/icons-material/Sort';
import { Menu, MenuItem, Button } from "@mui/material"; // Import MUI components

const formatDuration = (seconds: number): string => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    let result = '';

    if (h > 0) {
        result += `${h}hr${h > 1 ? 's' : ''} `;
    }
    if (m > 0) {
        result += `${m}min${m > 1 ? 's' : ''} `;
    }
    if (s > 0 || (h === 0 && m === 0)) {
        result += `${s}sec${s > 1 ? 's' : ''}`;
    }

    return result.trim();
};

export const CoursePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const [courses, setCourses] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
    const { theme } = useTheme();
    const categoryData = useSelector((state: RootState) => state.category);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
    const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // State for menu anchor

    const levels = ['beginner', 'intermediate', 'expert'];

    useEffect(() => {
        fetchCourse(currentPage);
    }, [dispatch, currentPage]);

    const fetchCourse = async (page: number) => {
        const response = await dispatch(getActiveCoursesAction({ page, limit: 6 }));
        if (getActiveCoursesAction.fulfilled.match(response)) {
            setCourses(response.payload.data);
            setTotalPages(response.payload.totalPages);  // Assuming the backend provides this information
            console.log("Fetched courses:", response);
        } else {
            console.error("Failed to fetch courses:", response.payload);
        }
    };

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategories(prevCategories =>
            prevCategories.includes(categoryId)
                ? prevCategories.filter(id => id !== categoryId)
                : [...prevCategories, categoryId]
        );
    };

    const handleLevelChange = (level: string) => {
        setSelectedLevels(prevLevels =>
            prevLevels.includes(level)
                ? prevLevels.filter(lvl => lvl !== level)
                : [...prevLevels, level]
        );
    };

    const handlePriceChange = (price: string) => {
        setSelectedPrices(prevPrices =>
            prevPrices.includes(price)
                ? prevPrices.filter(prc => prc !== price)
                : [...prevPrices, price]
        );
    };

    const handleSortOrderChange = (order: 'asc' | 'desc') => {
        setSortOrder(order);
        setAnchorEl(null); // Close the menu after selection
    };

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const sortCourses = (courses: any[], order: 'asc' | 'desc') => {
        return courses.sort((a, b) => {
            const priceA = a.pricing?.amount || 0;
            const priceB = b.pricing?.amount || 0;
            return order === 'asc' ? priceA - priceB : priceB - priceA;
        });
    };

    const filterCourses = (courses: any[]) => {
        return courses.filter(course =>
            (!selectedCategories.length || selectedCategories.includes(course.categoryRef._id)) &&
            (!selectedLevels.length || selectedLevels.includes(course.level)) &&
            (!selectedPrices.length || selectedPrices.includes(course.pricing.type))
        );
    };

    const calculateTotalDuration = (lessons: Lesson[]) => {
        return lessons
            .filter(lesson => lesson.duration !== undefined)
            .reduce((total, lesson) => total + parseFloat(lesson.duration!), 0);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const filteredAndSortedCourses = sortCourses(filterCourses(courses), sortOrder);

    return (
        <div className={`max-w-full mx-auto py-10 px-4 lg:px-24 ${theme === 'light' ? ' text-gray-900' : ' text-gray-100'}`}>
            <div className="flex justify-between items-center mb-6">
                {/* Other content if any */}
            </div>
            <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5">
                <div className="w-full md:w-1/4 p-5 rounded-xl shadow-xl py-10 ">
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Search Course"
                            className="input input-bordered w-full "
                        />
                    </div>
                    <div className="collapse collapse-arrow  mb-6">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium">
                            Course Categories
                        </div>
                        <div className="collapse-content">
                            <div className="flex flex-col space-y-2">
                                {categoryData?.data.map((data) => (
                                    <label key={data._id}>
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={selectedCategories.includes(data._id)}
                                            onChange={() => handleCategoryChange(data._id)}
                                        /> {data?.categoryName}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow  mb-6">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium">
                            Level
                        </div>
                        <div className="collapse-content">
                            <div className="flex flex-col space-y-2">
                                {levels.map((lvl) => (
                                    <label key={lvl}>
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={selectedLevels.includes(lvl)}
                                            onChange={() => handleLevelChange(lvl)}
                                        /> {lvl}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow  mb-6">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">
                            Price
                        </div>
                    <div className="collapse-content">
                        <div className="flex flex-col space-y-2">
                            <label>
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={selectedPrices.includes('free')}
                                    onChange={() => handlePriceChange('free')}
                                /> Free
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={selectedPrices.includes('paid')}
                                    onChange={() => handlePriceChange('paid')}
                                /> Paid
                            </label>
                        </div>
                    </div>
                </div>
                </div>

                <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative py-10 px-5">
                    <div className="absolute top-0 right-0 z-10">
                        <Button
                            aria-controls="sort-menu"
                            aria-haspopup="true"
                            onClick={handleMenuClick}
                            startIcon={<SortIcon />}
                        >
                            Sort
                        </Button>
                        <Menu
                            id="sort-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={() => handleSortOrderChange('asc')}>Price: Low to High</MenuItem>
                            <MenuItem onClick={() => handleSortOrderChange('desc')}>Price: High to Low</MenuItem>
                        </Menu>
                    </div>

                    {filteredAndSortedCourses.map((course) => {
                        const totalDurationSeconds = calculateTotalDuration(course.lessons ?? []);
                        const formattedDuration = formatDuration(totalDurationSeconds);

                        return (
                            <motion.div
                                key={course._id}
                                className="card shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden"
                                whileHover={{ scale: 1.02 }}
                                onClick={() => navigate('/single-course', { state: { course: { ...course, duration: formattedDuration } } })}>
                            
                                <figure className="relative">
                                    <motion.img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="w-full h-48 object-cover"
                                        whileHover={{ scale: 1.1 }}
                                    />
                                </figure>
                                <div className="card-body p-4">
                                    <h2 className="card-title text-lg font-semibold mb-2">{course.title}</h2>
                                    <p className="text-sm text-gray-500 flex items-center mb-2">
                                        <div className="avatar mr-2">
                                            <div className="w-6 rounded-full">
                                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Instructor" />
                                            </div>
                                        </div>
                                        Instructor: {course?.instructorRef?.firstName}
                                    </p>
                                    <p className="text-sm text-gray-500 flex items-center mb-2">
                                        <AutoStoriesIcon color="secondary" fontSize="small" className="mr-1" />
                                        Lessons: <span className="font-bold ml-1">{course.lessons?.length}</span>
                                    </p>
                                    <p className="text-sm text-gray-500 flex items-center mb-2">
                                        <AccessTimeIcon color="warning" fontSize="small" className="mr-1" />
                                        Duration: <span className="font-bold ml-1">{formattedDuration}</span>
                                    </p>
                                    <p className="text-lg font-bold text-gray-800 mb-2">
                                        {course.pricing?.type === 'paid' ? (
                                            <>
                                                <span className="line-through mr-2">{course.pricing.discountedAmount}</span>
                                                <span className="text-red-500"><CurrencyRupeeIcon fontSize="small" />  {course.pricing.amount}</span>
                                            </>
                                        ) : (
                                            <span className="text-green-500"> Free </span>
                                        )}
                                    </p>
                                    <div className="flex justify-between items-center mt-1">
                                        <div>
                                            {course.level === 'beginner' && (
                                                <span className="text-sm text-green-500">⭐ {course.level}</span>
                                            )}
                                            {course.level === 'intermediate' && (
                                                <span className="text-sm text-yellow-500">⭐ {course.level}</span>
                                            )}
                                            {course.level === 'expert' && (
                                                <span className="text-sm text-red-500">⭐ {course.level}</span>
                                            )}
                                        </div>
                                        <button className="btn btn-primary btn-outline btn-sm">Enroll Now</button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
            <div className="flex justify-center mt-10">
                <div className="btn-group">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            className={`btn ${index + 1 === currentPage ? '' : 'btn-outline'}`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
