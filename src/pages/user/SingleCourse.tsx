import Footer from "@/components/common/users/Footer";
import Header from "@/components/common/users/Header";
import { SingleCoursePage } from "@/components/course/SingleCoursePage";

export const SingleCourse: React.FC = () => {
  return (
    <>
      <Header />
      <SingleCoursePage />
      <Footer />
    </>
  );
};
