import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ui/theme-provider";
import { useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/redux/store";
import { Player } from "@lottiefiles/react-lottie-player";
import { Puff } from "react-loader-spinner";
import { ReactTyped } from "react-typed"; // Renamed Typed to ReactTyped to avoid conflicts

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { data } = useAppSelector((state: RootState) => state.user);

  const headingClass = useMemo(
    () =>
      `text-3xl md:text-5xl z-10 font-bold leading-tight md:mb-4 ${
        theme === "light" ? "text-violet-700" : "text-white"
      }`,
    [theme]
  );

  const paragraphClass = useMemo(
    () =>
      `text-md md:text-md font-ultrathin mt-1 z-10 ${
        theme === "light" ? "text-violet-700" : "text-gray-300"
      }`,
    [theme]
  );

  return (
    <>
      <div
        className={`
  text-violet-700 
  px-4 sm:px-6 lg:px-8 
  md:py-10 pb-10 
  ${
    theme === "dark"
      ? ' bg-[url("@/assets/home/bg-pattern-dark.svg")]'
      : ' bg-[url("@/assets/home/bg-pattern-light.svg")]'
  }`}>
        <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between bg">
          <div className="flex flex-col lg:w-1/2 lg:pr-10">
            <motion.h1
              className={headingClass}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}>
              <span className="text-yellow-600 mr-3">Studying</span>
              <ReactTyped
                strings={[`Online <br /> is now much easier`]}
                typeSpeed={50}
                backSpeed={30}
                backDelay={1500}
                loop
                showCursor={false}
              />
            </motion.h1>

            <motion.p
              key="paragraph1"
              className={paragraphClass}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.6 }}>
              EDU-VERSE is an interesting platform that
            </motion.p>
            <motion.p
              key="paragraph2"
              className={paragraphClass}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.8 }}>
              will teach you in a more interactive way.
            </motion.p>
            <div className="flex items-center flex-wrap mt-8">
              {!data ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1 }}
                  onClick={() => navigate("/selection")}
                  className="bg-violet-600 text-white text-sm md:text-md hover:bg-violet-500 font-bold py-2 md:py-3 pl-6 pr-3 rounded-xl mr-4 mb-4 shadow-[5px_5px_0px_0px_rgba(109,40,217)] z-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}>
                  <div className="flex items-center space-x-2">
                    <div>Get Started</div>
                    <div>
                      <Puff
                        visible={true}
                        height="20"
                        width="20"
                        color="#4fa94d"
                        ariaLabel="puff-loading"
                      />
                    </div>
                  </div>
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1 }}
                  onClick={() =>
                    data.role === "student" ? navigate("/") : navigate("/")
                  }
                  className="bg-violet-700 text-white font-bold py-3 px-6 rounded-full mr-4 mb-4 shadow-[5px_5px_0px_0px_rgba(109,40,217)]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}>
                  {data.role === "student" ? "Go to Dashboard" : "Explore More"}
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1 }}
                onClick={() => navigate("/about")}
                className={`bg-transparent ${
                  theme === "light" ? "text-violet-700" : "text-white"
                } border border-violet-700 font-bold text-sm md:text:md py-2 md:py-3 px-6 rounded-xl mb-4 shadow-[5px_5px_0px_0px_rgba(109,40,217)] z-10`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}>
                Learn More
              </motion.button>
            </div>
          </div>
          <motion.div
            key="heroImage"
            className="lg:w-1/2 mb-10 lg:mb-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.5 }}>
            <Player
              autoplay
              loop
              src="https://lottie.host/ddd3b99d-b9aa-45f4-9078-b9b2bc917dad/wvJrZHR6mK.json"
              style={{ height: "80%", width: "80%" }}
            />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
