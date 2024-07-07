import React from "react";
import pic1 from "@/assets/home/5 SCENE.png";
import pic2 from "@/assets/home/3 SCENE.png";
import pic3 from "@/assets/home/6 SCENE.png";
import pic4 from "@/assets/home/9 SCENE.png";
import { useTheme } from "../ui/theme-provider";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import { SubscriptionCard } from "../common/mentors/SubscriptionCards";

const FeaturesSection: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const motionSettings = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 10 },
    transition: { duration: 0.5, ease: "easeInOut", delay: 0.5 },
    viewport: { once: true },
  };

  return (
    <>
      {/* radial gradient */}
      {theme != "light" && (
        <div>
          <div
            className={`bg-violet-700 h-10 w-full absolute z-1 -top-6 blur-[70px]`}>
            {" "}
          </div>
          <div
            className={`circlePosition w-[200px] h-[200px] bg-violet-700 rounded-[100%] absolute z-1 top-[220%] left-[5%] lg:left-[20%] translate-x-[50%] blur-[180px]`}></div>
          <div
            className={`circlePosition w-[200px] h-[200px] bg-violet-700 rounded-[100%] absolute z-1 top-[270%] left-[5%] lg:left-[55%] translate-x-[50%] blur-[180px]`}></div>
          <div
            className={`circlePosition w-[200px] h-[200px] bg-violet-700 rounded-[100%] absolute z-1 top-[330%] left-[5%] lg:left-[20%] translate-x-[50%] blur-[180px]`}></div>
          <div
            className={`circlePosition w-[200px] h-[200px] bg-violet-700 rounded-[100%] absolute z-1 top-[380%] left-[5%] lg:left-[55%] translate-x-[50%] blur-[180px]`}></div>
        </div>
      )}

      <div className="p-5">
        <div className="flex flex-col items-center justify-center h-full mx-auto mb-12 max-w-7xl">
          <h1
            className={`text-4xl font-bold ${
              theme === "light" ? "text-blue-950" : "text-white"
            }`}>
            Our <span className="text-violet-700"> Features </span>
          </h1>
          <p
            className={`font-base py-4  ${
              theme === "light" ? "text-gray-600" : "text-gray-400"
            }`}>
            Unlock your potential with EDUVERSE, the leading e-learning platform
            for the MENA region. Access expert-led courses, personalized
            learning paths, live sessions, and earn recognized certifications.
            Join a vibrant community and enjoy seamless learning across all
            devices. Start your journey today and transform your future with
            EDUVERSE!
          </p>
        </div>

        <div className="flex mx-auto flex-col-reverse lg:flex-row max-w-7xl justify-center items-center">
          <motion.div
            className="flex items-center w-full lg:w-1/2"
            {...motionSettings}>
            <img src={pic1} alt="Feature 1" />
          </motion.div>
          <motion.div
            className="flex flex-col items-center w-full lg:w-1/2 md:mt-0"
            {...motionSettings}>
            <h1 className="text-violet-700 text-2xl font-bold">
              <span
                className={`${
                  theme === "light" ? "text-blue-950" : "text-white"
                }`}>
                Tools{" "}
              </span>{" "}
              For Teachers And Learners
            </h1>
            <p
              className={`${
                theme === "light" ? "text-gray-600" : "text-gray-400"
              } text-justify font-normal w-96 p-4`}>
              Class has a dynamic set of teaching tools built to be deployed and
              used during class. Teachers can handout assignments in real-time
              for students to complete and submit.
            </p>
          </motion.div>
        </div>

        <div className="flex mx-auto flex-col-reverse lg:flex-row max-w-7xl justify-center items-center">
          <motion.div
            className="flex flex-col items-center w-full lg:w-1/2"
            {...motionSettings}>
            <h1 className="text-violet-700 text-2xl font-bold">
              Assessments,{" "}
              <span
                className={`${
                  theme === "light" ? "text-blue-950" : "text-white"
                }`}>
                Quizzes{" "}
              </span>{" "}
              Tests
            </h1>
            <p
              className={`${
                theme === "light" ? "text-gray-600" : "text-gray-400"
              } text-justify font-normal w-96 p-4`}>
              Easily launch live assignments, quizzes, and tests. Student
              results are automatically entered in the online gradebook.
            </p>
          </motion.div>
          <motion.div
            className="flex items-center w-full lg:w-1/2"
            {...motionSettings}>
            <img src={pic2} alt="Feature 2" />
          </motion.div>
        </div>

        <div className="flex mx-auto flex-col-reverse lg:flex-row max-w-7xl justify-center items-center">
          <motion.div
            className="flex items-center w-full lg:w-1/2"
            {...motionSettings}>
            <img src={pic3} alt="Feature 3" />
          </motion.div>
          <motion.div
            className="flex flex-col w-full text-center items-center lg:w-1/2  "
            {...motionSettings}>
            <h1 className="text-violet-700  text-2xl font-bold">
              Class Management{" "}
              <span
                className={`${
                  theme === "light" ? "text-blue-950" : "text-white"
                }`}>
                Tools for Educators{" "}
              </span>
            </h1>
            <p
              className={`${
                theme === "light" ? "text-gray-600" : "text-gray-400"
              } text-justify font-normal w-96 p-4`}>
              Class provides tools to help run and manage the class such as
              Class Roster, Attendance, and more. With the Gradebook, teachers
              can review and grade tests and quizzes in real-time.
            </p>
          </motion.div>
        </div>

        <div className="flex mx-auto flex-col-reverse lg:flex-row max-w-7xl justify-center items-center">
          <motion.div
            className="flex flex-col items-center w-full lg:w-1/2 "
            {...motionSettings}>
            <h1 className="text-violet-700 text-2xl font-bold">
              <span
                className={`${
                  theme === "light" ? "text-blue-950" : "text-white"
                }`}>
                One-on-One{" "}
              </span>{" "}
              Discussions
            </h1>
            <p
              className={`${
                theme === "light" ? "text-gray-600" : "text-gray-400"
              } text-justify font-normal w-96 p-4`}>
              Class provides tools to help run and manage the class such as
              Class Roster, Attendance, and more. With the Gradebook, teachers
              can review and grade tests and quizzes in real-time.
            </p>
          </motion.div>
          <motion.div
            className="flex items-center w-full lg:w-1/2"
            {...motionSettings}>
            <img src={pic4} alt="Feature 4" />
          </motion.div>
        </div>

        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 text-center mb-10 mt-20">
          Subscription <span className="text-violet-500">Packages</span>
        </h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 mt-10">
          <SubscriptionCard
            title="Basic"
            price="₹299/mo"
            description1="Unlimitted lifetime access"
            description2="One-to-one chat with mentor"
            description3="Limited access to contents"
            index={0}
          />
          <SubscriptionCard
            title="Pro"
            price="₹699/mo"
            description1="Unlimitted lifetime access"
            description2="One-to-one voice and video mentoring"
            description3="Full access to contents"
            isPopular={true}
            index={1}
          />
          <SubscriptionCard
            title="Enterprise"
            price="₹499/mo"
            description1="Unlimitted lifetime access"
            description2="One-to-one chat and voice mentorship"
            description3="Moderate access to contents"
            index={2}
          />
        </div>

        <div
          className={`flex flex-col max-w-7xl mx-auto lg:flex-row justify-center items-center ${
            theme === "light" ? "bg-gray-100" : "bg-gray-900"
          } rounded-xl p-5`}>
          <div className="w-full lg:w-1/2">
            <Player
              autoplay
              loop
              src="https://lottie.host/645f042e-dfa0-46bf-9f04-41345f0185fa/jqiYhEOdQ1.json"
              style={{ height: "80%", width: "80%" }}
            />
          </div>
          <div className="w-full lg:w-1/2">
            <h1 className="text-2xl font-bold text-violet-700 text-center">
              Join{" "}
              <span
                className={`${
                  theme === "light" ? "text-blue-950" : "text-white"
                }`}>
                World's Largest{" "}
              </span>{" "}
              learning platform today
            </h1>
            <p className="mt-5 text-center">
              Start learning by registering for free
            </p>
            <p className="mt-5 text-gray-500 text-center">
              Join the largest learning platform today for a world of knowledge.
              Explore diverse courses, expert instructors, and interactive
              learning. Elevate your skills, career, and interests with us.
              Unlock endless learning possibilities now!
            </p>
            <div className="flex flex-col items-center">
              <button
                className="bg-gradient-to-r from-violet-400 to-pink-500 rounded-full text-sm p-3 text-white mt-8 hover:from-violet-500 hover:to-pink-400 shadow-lg"
                onClick={() => navigate("/selection")}>
                Sign Up for Free
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturesSection;
