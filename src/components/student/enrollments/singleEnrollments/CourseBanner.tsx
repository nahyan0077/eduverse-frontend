// CourseBanner.tsx
import React from "react";
import banner from "@/assets/course/banner1.jpg";

const CourseBanner: React.FC = () => {
  return (
    <div className="relative w-full h-[15vh] md:h-[30vh]">
      <img src={banner} alt="Course Banner" />
    </div>
  );
};

export default CourseBanner;
