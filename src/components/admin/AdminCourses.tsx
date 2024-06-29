import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useAppDispatch } from "@/hooks/hooks";
import {
  getAllCourseAction,
  updateCourseAction,
} from "@/redux/store/actions/course";
import ConfirmModal from "../common/modal/ConfirmModal";
import { SearchBar } from "../common/admin/SearchBar";
import Pagination from "../common/admin/Pagination";
import CourseTable from "./course/CourseTable";

export interface Course {
  _id: string;
  title: string;
  instructorRef: { firstName: string };
  categoryRef: { categoryName: string };
  pricing: { amount: number; type: string };
  isRequested?: boolean;
  isPublished?: boolean;
  isBlocked?: boolean;
  isRejected?: boolean;
}

const AdminCourses: React.FC = () => {
  const dispatch = useAppDispatch();
  const [courses, setCourses] = useState<Course[]>([]);
  const [requests, setRequests] = useState<Course[]>([]);
  const [publishedCourses, setPublishedCourses] = useState<Course[]>([]);
  const [value, setValue] = useState("1");
  const [isModalVisible, setModalVisible] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
	console.log(event,"test event");
	
    setValue(newValue);
  };

  const fetchCourses = async () => {
    const result = await dispatch(
      getAllCourseAction({ page: currentPage, limit: 5, search: searchQuery })
    );
    if (getAllCourseAction.fulfilled.match(result)) {
      const coursesData: Course[] = result.payload.data.courses;
      setCurrentPage(result.payload.data.currentPage);
      setCourses(coursesData);
      setTotalPages(result.payload.data.totalPages);
      const reqCourses = coursesData.filter(course => course.isRequested);
      setRequests(reqCourses);
      const pubCourses = coursesData.filter(course => course.isPublished);
      setPublishedCourses(pubCourses);
    } else {
      console.error("Failed to fetch courses:", result.payload);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [dispatch, searchQuery, currentPage]);

  const handleDelete = async () => {
    if (currentCourse) {
      const data = { ...currentCourse, isBlocked: !currentCourse.isBlocked };
      await dispatch(updateCourseAction(data));
      setModalVisible(false);
      fetchCourses();
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleModalOpen = (course: Course) => {
    setCurrentCourse(course);
    setModalVisible(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-full mx-auto py-10 px-10">
      {isModalVisible && (
        <ConfirmModal
          message="block or unblock this course"
          onConfirm={handleDelete}
          onCancel={handleCancel}
        />
      )}
      <div className="flex justify-between p-6 mb-5">
        <h2 className="text-4xl font-bold">Courses</h2>
      </div>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              textColor="inherit"
            >
              <Tab label="All Courses" value="1" />
              <Tab label="Requested" value="2" />
              <Tab label="Published" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <div className="flex justify-end items-center">
              <SearchBar onSearchChange={handleSearchChange} />
            </div>
            <CourseTable courses={courses} handleModalOpen={handleModalOpen} />
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </TabPanel>
          <TabPanel value="2">
            <CourseTable courses={requests} handleModalOpen={handleModalOpen} />
          </TabPanel>
          <TabPanel value="3">
            <CourseTable courses={publishedCourses} handleModalOpen={handleModalOpen} />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default AdminCourses;
