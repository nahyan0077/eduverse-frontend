import Header from "@/components/common/users/Header"
import { CourseHeader } from "@/components/course/CourseHeader"
import { CoursePage } from "@/components/course/CoursePage"

export const Course: React.FC = () => {
    return (
        <>
            <Header />
            <CourseHeader/>
            <CoursePage />
        </>
    )
} 