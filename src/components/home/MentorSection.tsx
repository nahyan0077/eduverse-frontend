import React from 'react';
import img1 from '@/assets/mentors/mentor1.jpg';
import img2 from '@/assets/mentors/mentor2.jpg';
import img3 from '@/assets/mentors/mentor3.jpg';
import img4 from '@/assets/mentors/mentor4.jpg';
import { useTheme } from '../ui/theme-provider';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

interface MentorProps {
  name: string;
  role: string;
  imageSrc: string;
}

const Mentor: React.FC<MentorProps> = ({ name, role, imageSrc }) => {
  const { theme } = useTheme();

  return (
    <motion.div
      className={`flex flex-col items-center p-6 rounded-lg transform transition duration-300 hover:-translate-y-2 shadow-lg hover:shadow-2xl ${
        theme === 'light' ? 'bg-white' : 'bg-gray-800'
      }`}
      whileHover={{ scale: 1.05 }}
    >
      <img
        src={imageSrc}
        alt={name}
        className="w-32 h-32 rounded-full object-cover mb-4"
      />
      <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-black' : 'text-white'}`}>{name}</h3>
      <p className={`text-gray-600 ${theme === 'light' ? '' : 'text-gray-400'}`}>{role}</p>
      <div className="flex space-x-4 mt-2">
        <a href="#" className="text-purple-600 hover:text-purple-800" aria-label={`${name} on Facebook`}>
          <FaFacebook />
        </a>
        <a href="#" className="text-purple-600 hover:text-purple-800" aria-label={`${name} on Twitter`}>
          <FaTwitter />
        </a>
        <a href="#" className="text-purple-600 hover:text-purple-800" aria-label={`${name} on LinkedIn`}>
          <FaLinkedin />
        </a>
      </div>
    </motion.div>
  );
};

const MentorsSection: React.FC = () => {
  const { theme } = useTheme();

  const mentors = [
    { name: 'Stan McGyver', role: 'Mentor', imageSrc: img1 },
    { name: 'Gordon Stone', role: 'Mentor', imageSrc: img2 },
    { name: 'Lisa Rosse', role: 'Mentor', imageSrc: img3 },
    { name: 'Mulan Park', role: 'Mentor', imageSrc: img4 },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className={`text-3xl font-bold ${theme === 'light' ? 'text-violet-700' : 'text-violet-700'}`}>
            Meet Our <span className={`${theme === 'light' ? 'text-gray-900' : 'text-white'}`}> Mentors </span>
          </h2>
          <button className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700">
            View More
          </button>
        </div>
        <p className={`text-gray-600 mb-8 ${theme === 'light' ? '' : 'text-gray-400'}`}>
          Discover the driving force behind your learning journey. Our mentors are seasoned professionals and industry experts dedicated to guiding you every step of the way. They bring a wealth of knowledge, personalized advice, and real-world experience to help you achieve your educational goals. Connect, learn, and grow with the best in the field.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {mentors.map((mentor) => (
            <Mentor key={mentor.name} {...mentor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MentorsSection;
