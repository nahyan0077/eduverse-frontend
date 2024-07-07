import React from "react";
import Footer from "../users/Footer";
import Header from "../users/Header";
import about from "@/assets/home/about.png";
import mission from "@/assets/home/7 SCENE.png";
import vision from "@/assets/home/10 SCENE.png";

export const About: React.FC = () => {
  return (
    <>
      <Header />

      <div className="bg-gradient-to-r from-indigo-100 to-violet-100 dark:from-gray-900 dark:to-slate-900 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Transforming Lives{" "}
            <span className="text-violet-700">Through Learning</span>
          </h1>

          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
            We envision a world where anyone, anywhere has the power to
            transform their lives through learning.
          </p>
          <img
            src={about}
            className="w-full max-w-lg mx-auto rounded-lg "
            alt="About Us"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
          About <span className="text-violet-700">Us</span>
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
          Welcome to our innovative E-Learning platform, designed to
          revolutionize the way you learn programming and technology-related
          content. Our mission is to provide accessible, high-quality education
          that empowers individuals to reach their full potential in the
          ever-evolving tech landscape.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-violet-100 dark:bg-gray-900 p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              Our Approach
            </h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              {/* Add icons to list items */}
              <li className="flex items-center">
                <span className="mr-2">🎯</span>Personalized learning
                experiences
              </li>
              <li className="flex items-center">
                <span className="mr-2">👨‍🏫</span>Expert-led instruction
              </li>
              <li className="flex items-center">
                <span className="mr-2">🛠️</span>Hands-on, project-based
                curriculum
              </li>
              <li className="flex items-center">
                <span className="mr-2">💻</span>Cutting-edge technology
                integration
              </li>
              <li className="flex items-center">
                <span className="mr-2">📈</span>Continuous improvement and
                adaptation
              </li>
            </ul>
          </div>
          <div className="bg-violet-100 dark:bg-gray-900 p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              Key Features
            </h3>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              {/* Add icons to list items */}
              <li className="flex items-center">
                <span className="mr-2">💬</span>One-on-one communication with
                instructors
              </li>
              <li className="flex items-center">
                <span className="mr-2">📊</span>Robust student progress tracking
              </li>
              <li className="flex items-center">
                <span className="mr-2">🔥</span>Daily streaks for consistent
                learning
              </li>
              <li className="flex items-center">
                <span className="mr-2">📚</span>Extensive content library
              </li>
              <li className="flex items-center">
                <span className="mr-2">⌨️</span>Interactive coding environments
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col justify-center items-center bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
              <img src={mission} className="w-24 h-24 mb-6" alt="Our Mission" />
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Our Mission
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                To provide accessible, high-quality technology education that
                empowers individuals to achieve their career goals and
                contribute to the global tech community.
              </p>
            </div>
            <div className="flex flex-col justify-center items-center bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
              <img src={vision} className="w-24 h-24 mb-6" alt="Our Vision" />
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Our Vision
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                To be the leading online platform for technology education,
                fostering a world where continuous learning and innovation drive
                personal and societal growth.
              </p>
            </div>
          </div>
        </div>

        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mt-16">
          Join us today and embark on a path to mastering programming and
          technology with the guidance of expert instructors and a supportive
          community of passionate learners. Together, we'll shape the future of
          technology education.
        </p>
      </div>

      <Footer />
    </>
  );
};
