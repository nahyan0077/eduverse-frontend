import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaRegCopyright,
} from "react-icons/fa";
import { TbBulb } from "react-icons/tb";
import { useTheme } from "../../ui/theme-provider";

const Footer: React.FC = () => {
  const { theme } = useTheme();
  return (
    <footer
      className={`border-gray-200 py-12 ${
        theme === "light" ? "bg-violet-50" : "bg-gray-900"
      } max-w-full mx-auto `}>
      <div className="flex flex-wrap pl-10 md:pl-0 justify-between mx-auto max-w-7xl mb-14">
        <div className="w-full lg:w-1/5 mb-8 lg:mb-0 px-4">
          <div className="flex text-purple-700 items-center mb-4">
            <span className="font-extrabold text-xl">EDU</span>
            <TbBulb className="text-xl mx-1" />
            <span className="font-extrabold text-xl">VERSE</span>
          </div>
          <div className="flex space-x-3 text-purple-700 text-xl mb-4">
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
            <FaLinkedin />
          </div>
          <div className="text-sm text-gray-400">
            <div className="flex items-center mb-1">
              <FaRegCopyright className="mr-1" />
              <span
                className={`${
                  theme === "light" ? "text-gray-500" : "text-gray-400"
                }`}>
                2024 eduverse.in
              </span>
            </div>
            <div
              className={`${
                theme === "light" ? "text-gray-500" : "text-gray-400"
              }`}>
              <div>Eduverse is a registered trademark of eduverse.co</div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/5 mb-8 lg:mb-0 px-4">
          <ul className="text-gray-400 text-sm">
            <li
              className={`text-xl font-normal mb-2 ${
                theme === "light" ? "text-black" : "text-gray-300"
              }`}>
              Courses
            </li>
            {[
              "Classroom courses",
              "Virtual classroom courses",
              "E-learning courses",
              "Video Courses",
            ].map((course, index) => (
              <li
                key={index}
                className={`mb-1 ${
                  theme === "light" ? "text-gray-500" : "text-gray-400"
                } font-normal`}>
                {course}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full lg:w-1/5 mb-8 lg:mb-0 px-4">
          <ul className="text-gray-400 text-sm">
            <li
              className={`text-xl font-normal mb-2 ${
                theme === "light" ? "text-black" : "text-gray-300"
              }`}>
              Community
            </li>
            {[
              "Learners",
              "Partners",
              "Developers",
              "Transaction",
              "Blog",
              "Teaching center",
            ].map((community, index) => (
              <li
                key={index}
                className={`mb-1 ${
                  theme === "light" ? "text-gray-500" : "text-gray-400"
                } font-normal`}>
                {community}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full lg:w-1/5 mb-8 lg:mb-0 px-4 hidden md:block">
          <ul className="text-gray-400 text-sm">
            <li
              className={`text-xl font-normal mb-2 ${
                theme === "light" ? "text-black" : "text-gray-300"
              }`}>
              Quick Links
            </li>
            {[
              "Home",
              "Professional Education",
              "Courses",
              "Admission",
              "Testimonial",
              "Programs",
            ].map((link, index) => (
              <li
                key={index}
                className={`mb-1 ${
                  theme === "light" ? "text-gray-500" : "text-gray-400"
                } font-normal`}>
                {link}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full lg:w-1/5 mb-8 lg:mb-0 px-4 hidden md:block">
          <ul className="text-gray-400 text-sm">
            <li
              className={`text-xl font-normal mb-2 ${
                theme === "light" ? "text-black" : "text-gray-300"
              }`}>
              More
            </li>
            {["Press", "Investors", "Terms", "Privacy", "Help", "Contact"].map(
              (more, index) => (
                <li
                  key={index}
                  className={`mb-1 ${
                    theme === "light" ? "text-gray-500" : "text-gray-400"
                  } font-normal`}>
                  {more}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
      <div
        className={`max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-gray-700 ${
          theme === "light" ? "bg-violet-200" : "bg-gray-800"
        } p-4 rounded mt-2`}>
        <div className="mb-2 md:mb-0">
          <h2>Privacy policy | terms & conditions</h2>
        </div>
        <div>
          <h2>All copyright (c) 2024 reserved</h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
